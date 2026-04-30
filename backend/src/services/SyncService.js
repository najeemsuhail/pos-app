const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const prisma = require('../db/prisma');
const SettingService = require('./SettingService');
const { desktopDataDir } = require('../db/paths');
const {
  mapCategory,
  mapMenuItem,
  mapOrder,
  mapOrderItem,
  mapPayment,
  mapExpense,
} = require('../db/mappers');

const SYNC_CONFIG_PATH = path.join(desktopDataDir, 'sync-config.json');
const SYNC_STATE_PATH = path.join(desktopDataDir, 'sync-state.json');
const SYNC_DEVICE_PATH = path.join(desktopDataDir, 'sync-device.json');
const DEFAULT_INTERVAL_MS = 60 * 1000;
const SYNC_REQUEST_TIMEOUT = 30 * 1000; // 30 second timeout for sync requests
const SYNC_PUSH_BATCH_SIZE = 100;
const SYNC_PULL_BATCH_SIZE = 500;

class SyncService {
  constructor() {
    this.syncInterval = null;
    this.syncInFlight = null;
  }

  /**
   * Helper method to make fetch requests with timeout
   */
  async fetchWithTimeout(url, options = {}, timeoutMs = SYNC_REQUEST_TIMEOUT) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  readJsonFile(filePath, fallbackValue) {
    try {
      if (!fs.existsSync(filePath)) {
        return fallbackValue;
      }

      const raw = fs.readFileSync(filePath, 'utf8').trim();
      if (!raw) {
        return fallbackValue;
      }

      return { ...fallbackValue, ...JSON.parse(raw) };
    } catch (error) {
      return fallbackValue;
    }
  }

  writeJsonFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  getConfig() {
    return this.readJsonFile(SYNC_CONFIG_PATH, {
      syncEnabled: false,
      syncServerUrl: '',
      syncApiKey: '',
    });
  }

  saveConfig(newConfig) {
    const currentConfig = this.getConfig();
    const nextConfig = {
      ...currentConfig,
      syncEnabled: Boolean(newConfig.syncEnabled),
      syncServerUrl: (newConfig.syncServerUrl || '').trim().replace(/\/+$/, ''),
      syncApiKey: (newConfig.syncApiKey || '').trim(),
    };

    this.writeJsonFile(SYNC_CONFIG_PATH, nextConfig);
    return nextConfig;
  }

  getState() {
    return this.readJsonFile(SYNC_STATE_PATH, {
      lastSyncAt: null,
      lastPulledAt: null,
      lastError: '',
      lastSuccessAt: null,
      lastOnlineAt: null,
      lastPulledEventId: 0,
    });
  }

  updateState(patch) {
    const nextState = {
      ...this.getState(),
      ...patch,
    };

    this.writeJsonFile(SYNC_STATE_PATH, nextState);
    return nextState;
  }

  getDeviceId() {
    const stored = this.readJsonFile(SYNC_DEVICE_PATH, null);
    if (stored && stored.deviceId) {
      return stored.deviceId;
    }

    const deviceId = crypto.randomUUID();
    this.writeJsonFile(SYNC_DEVICE_PATH, { deviceId });
    return deviceId;
  }

  async getPendingCount() {
    const rows = await prisma.$queryRawUnsafe(
      "SELECT COUNT(*) AS count FROM sync_queue WHERE status = 'pending'"
    );
    return Number(rows?.[0]?.count || 0);
  }

  async getPendingQueue(limit = SYNC_PUSH_BATCH_SIZE) {
    const rows = await prisma.$queryRawUnsafe(
      `SELECT * FROM sync_queue
       WHERE status = 'pending'
       ORDER BY
         CASE entity_type
           WHEN 'settings' THEN 1
           WHEN 'category' THEN 2
           WHEN 'menu_item' THEN 3
           WHEN 'order' THEN 4
           WHEN 'expense' THEN 5
           ELSE 99
         END,
         updated_at ASC,
         id ASC
       LIMIT ?`,
      limit
    );

    return rows.map((row) => ({
      id: row.id,
      entityType: row.entity_type,
      entityId: row.entity_id,
      action: row.action,
      payload: JSON.parse(row.payload),
      retryCount: Number(row.retry_count || 0),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));
  }

  async queueChange(entityType, entityId, action, payload) {
    const serializedPayload = JSON.stringify(payload);
    const existingRows = await prisma.$queryRawUnsafe(
      "SELECT id FROM sync_queue WHERE entity_type = ? AND entity_id = ? AND status = 'pending' ORDER BY id DESC LIMIT 1",
      entityType,
      String(entityId)
    );

    if (existingRows.length > 0) {
      await prisma.$executeRawUnsafe(
        "UPDATE sync_queue SET action = ?, payload = ?, updated_at = CURRENT_TIMESTAMP, retry_count = 0, last_error = NULL WHERE id = ?",
        action,
        serializedPayload,
        existingRows[0].id
      );

      return existingRows[0].id;
    }

    await prisma.$executeRawUnsafe(
      "INSERT INTO sync_queue (entity_type, entity_id, action, payload, status, retry_count, created_at, updated_at) VALUES (?, ?, ?, ?, 'pending', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
      entityType,
      String(entityId),
      action,
      serializedPayload
    );

    const insertedRows = await prisma.$queryRawUnsafe("SELECT last_insert_rowid() AS id");
    return insertedRows[0].id;
  }

  async markQueueItemsSynced(queueIds) {
    if (queueIds.length === 0) return;
    
    const placeholders = queueIds.map(() => '?').join(',');
    await prisma.$executeRawUnsafe(
      `UPDATE sync_queue SET status = 'synced', last_error = NULL, updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`,
      ...queueIds
    );
  }

  async markQueueItemsFailed(queueIds, errorMessage) {
    if (queueIds.length === 0) return;
    
    const placeholders = queueIds.map(() => '?').join(',');
    await prisma.$executeRawUnsafe(
      `UPDATE sync_queue SET retry_count = retry_count + 1, last_error = ?, updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders}) AND status = 'pending'`,
      errorMessage,
      ...queueIds
    );
  }

  async appendSyncEvent(change, sourceDeviceId) {
    await prisma.$executeRawUnsafe(
      'INSERT INTO sync_events (source_device_id, entity_type, entity_id, action, payload, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
      sourceDeviceId || null,
      change.entityType,
      String(change.entityId),
      change.action,
      JSON.stringify(change.payload)
    );
  }

  normalizeSyncTimestamp(value) {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    const normalized = String(value).replace(' ', 'T');
    return /(?:Z|[+-]\d{2}:?\d{2})$/.test(normalized) ? normalized : `${normalized}Z`;
  }

  async getRemoteEvents(since, requestingDeviceId, sinceEventId = 0, limit = SYNC_PULL_BATCH_SIZE) {
    const sinceValue = since || '1970-01-01T00:00:00.000Z';
    const afterId = Number(sinceEventId || 0);
    const requestedLimit = Number(limit || SYNC_PULL_BATCH_SIZE);
    const pageLimit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(Math.floor(requestedLimit), 1), SYNC_PULL_BATCH_SIZE)
      : SYNC_PULL_BATCH_SIZE;
    const rows = await prisma.$queryRawUnsafe(
      `SELECT * FROM sync_events
       WHERE (
         datetime(created_at) > datetime(?)
         OR (datetime(created_at) = datetime(?) AND id > ?)
       )
       AND (source_device_id IS NULL OR source_device_id != ?)
       ORDER BY datetime(created_at) ASC, id ASC
       LIMIT ?`,
      sinceValue,
      sinceValue,
      afterId,
      requestingDeviceId || '',
      pageLimit + 1
    );

    const hasMore = rows.length > pageLimit;
    const pageRows = hasMore ? rows.slice(0, pageLimit) : rows;
    const events = pageRows.map((row) => ({
      id: row.id,
      entityType: row.entity_type,
      entityId: row.entity_id,
      action: row.action,
      payload: JSON.parse(row.payload),
      sourceDeviceId: row.source_device_id,
      createdAt: this.normalizeSyncTimestamp(row.created_at),
    }));

    return { events, hasMore };
  }

  async buildOrderSnapshot(orderId) {
    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
      include: {
        items: { orderBy: { id: 'asc' } },
        payments: { orderBy: { id: 'asc' } },
      },
    });

    if (!order) {
      return null;
    }

    return {
      order: mapOrder(order),
      items: order.items.map(mapOrderItem),
      payments: order.payments.map(mapPayment),
    };
  }

  async queueOrderSnapshot(orderId) {
    const payload = await this.buildOrderSnapshot(orderId);
    if (!payload) {
      return null;
    }

    return this.queueChange('order', orderId, 'upsert', payload);
  }

  async queueExpenseSnapshot(expense, action = 'upsert') {
    if (!expense) {
      return null;
    }

    return this.queueChange('expense', expense.id, action, { expense });
  }

  async queueCategorySnapshot(category) {
    if (!category) {
      return null;
    }

    return this.queueChange('category', category.id, 'upsert', { category });
  }

  async queueMenuItemSnapshot(menuItem) {
    if (!menuItem) {
      return null;
    }

    return this.queueChange('menu_item', menuItem.id, 'upsert', { menuItem });
  }

  async queueSettingsSnapshot(settings = null) {
    const payload = settings || SettingService.getSettings();
    return this.queueChange('settings', 'global', 'upsert', { settings: payload });
  }

  async queueFullResync() {
    const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } });
    const menuItems = await prisma.menuItem.findMany({ orderBy: { id: 'asc' } });
    const orders = await prisma.order.findMany({ orderBy: { id: 'asc' } });
    const expenses = await prisma.expense.findMany({ orderBy: { id: 'asc' } });

    await this.queueSettingsSnapshot();

    for (const category of categories) {
      await this.queueCategorySnapshot(mapCategory(category));
    }

    for (const menuItem of menuItems) {
      await this.queueMenuItemSnapshot(mapMenuItem(menuItem));
    }

    for (const order of orders) {
      await this.queueOrderSnapshot(order.id);
    }

    for (const expense of expenses) {
      await this.queueExpenseSnapshot(mapExpense(expense));
    }
  }

  getAuthHeaders() {
    const config = this.getConfig();
    return config.syncApiKey
      ? { 'x-sync-key': config.syncApiKey }
      : {};
  }

  getSyncUrl(pathname) {
    const config = this.getConfig();
    return `${config.syncServerUrl}${pathname}`;
  }

  async pushPendingChanges(deviceId, limit = SYNC_PUSH_BATCH_SIZE) {
    const pendingQueue = await this.getPendingQueue(limit);
    if (pendingQueue.length === 0) {
      return 0;
    }

    const response = await this.fetchWithTimeout(this.getSyncUrl('/api/sync/push'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify({
        deviceId,
        changes: pendingQueue.map((item) => ({
          entityType: item.entityType,
          entityId: item.entityId,
          action: item.action,
          payload: item.payload,
          queuedAt: item.updatedAt,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Push failed with status ${response.status}`);
    }

    await response.json();
    await this.markQueueItemsSynced(pendingQueue.map((item) => item.id));
    return pendingQueue.length;
  }

  async pushAllPendingChanges(deviceId) {
    let pushedCount = 0;

    while (true) {
      const batchCount = await this.pushPendingChanges(deviceId);
      if (batchCount === 0) {
        return pushedCount;
      }

      pushedCount += batchCount;
    }
  }

  async pullRemoteChanges(deviceId) {
    const state = this.getState();
    let cursorTime = state.lastPulledAt;
    let cursorEventId = Number(state.lastPulledEventId || 0);
    let serverTime = null;

    while (true) {
      const response = await this.fetchWithTimeout(this.getSyncUrl('/api/sync/pull'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify({
          deviceId,
          since: cursorTime,
          sinceEventId: cursorEventId,
          limit: SYNC_PULL_BATCH_SIZE,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Pull failed with status ${response.status}`);
      }

      const data = await response.json();
      const events = data.events || [];
      serverTime = data.serverTime || serverTime;

      for (const event of events) {
        await this.applyIncomingChange(event, { recordEvent: false });
      }

      if (events.length > 0) {
        const lastEvent = events[events.length - 1];
        cursorTime = lastEvent.createdAt;
        cursorEventId = Number(lastEvent.id || 0);
      }

      if (!data.hasMore) {
        break;
      }
    }

    this.updateState({
      lastPulledAt: serverTime || new Date().toISOString(),
      lastPulledEventId: 0,
    });
  }

  async applyIncomingChange(change, options = {}) {
    const { recordEvent = true, sourceDeviceId = null } = options;

    if (change.entityType === 'category') {
      const category = change.payload.category;
      await prisma.category.upsert({
        where: { id: Number(category.id) },
        update: {
          name: category.name,
          isDeleted: Boolean(category.is_deleted),
        },
        create: {
          id: Number(category.id),
          name: category.name,
          isDeleted: Boolean(category.is_deleted),
          createdAt: new Date(category.created_at),
        },
      });
    }

    if (change.entityType === 'menu_item') {
      const menuItem = change.payload.menuItem;
      await prisma.menuItem.upsert({
        where: { id: Number(menuItem.id) },
        update: {
          name: menuItem.name,
          price: Number(menuItem.price),
          categoryId: Number(menuItem.category_id),
          isAvailable: Boolean(menuItem.is_available),
          imageUrl: menuItem.image_url || null,
          isDeleted: Boolean(menuItem.is_deleted),
        },
        create: {
          id: Number(menuItem.id),
          name: menuItem.name,
          price: Number(menuItem.price),
          categoryId: Number(menuItem.category_id),
          isAvailable: Boolean(menuItem.is_available),
          imageUrl: menuItem.image_url || null,
          isDeleted: Boolean(menuItem.is_deleted),
          createdAt: new Date(menuItem.created_at),
        },
      });
    }

    if (change.entityType === 'expense') {
      const expense = change.payload.expense;
      if (change.action === 'delete') {
        await prisma.expense.deleteMany({
          where: { id: Number(expense.id) },
        });
      } else {
        await prisma.expense.upsert({
          where: { id: Number(expense.id) },
          update: {
            expenseDate: new Date(expense.expense_date),
            category: expense.category,
            note: expense.note,
            amount: Number(expense.amount),
            paymentMethod: expense.payment_method,
            reference: expense.reference || null,
          },
          create: {
            id: Number(expense.id),
            expenseDate: new Date(expense.expense_date),
            category: expense.category,
            note: expense.note,
            amount: Number(expense.amount),
            paymentMethod: expense.payment_method,
            reference: expense.reference || null,
            createdAt: new Date(expense.created_at),
          },
        });
      }
    }

    if (change.entityType === 'settings') {
      SettingService.updateSettings(change.payload.settings || {});
    }

    if (change.entityType === 'order') {
      const snapshot = change.payload;
      const order = snapshot.order;
      const orderId = Number(order.id);
      const incomingItemIds = (snapshot.items || [])
        .map((item) => Number(item.id))
        .filter((id) => Number.isFinite(id));
      const incomingPaymentIds = (snapshot.payments || [])
        .map((payment) => Number(payment.id))
        .filter((id) => Number.isFinite(id));

      await prisma.$transaction(async (tx) => {
        await tx.order.upsert({
          where: { id: orderId },
          update: {
            billNumber: order.bill_number,
            status: order.status,
            paymentStatus: order.payment_status || 'unpaid',
            tableId: order.table_id,
            orderType: order.order_type || 'dine_in',
            subtotal: Number(order.subtotal),
            discountAmount: Number(order.discount_amount),
            taxAmount: Number(order.tax_amount),
            finalAmount: Number(order.final_amount),
            updatedAt: new Date(order.updated_at),
          },
          create: {
            id: orderId,
            billNumber: order.bill_number,
            status: order.status,
            paymentStatus: order.payment_status || 'unpaid',
            tableId: order.table_id,
            orderType: order.order_type || 'dine_in',
            subtotal: Number(order.subtotal),
            discountAmount: Number(order.discount_amount),
            taxAmount: Number(order.tax_amount),
            finalAmount: Number(order.final_amount),
            createdAt: new Date(order.created_at),
            updatedAt: new Date(order.updated_at),
          },
        });

        if (incomingItemIds.length > 0) {
          await tx.orderItem.deleteMany({
            where: {
              id: { in: incomingItemIds },
            },
          });
        }

        await tx.orderItem.deleteMany({
          where: { orderId },
        });

        if (incomingPaymentIds.length > 0) {
          await tx.payment.deleteMany({
            where: {
              id: { in: incomingPaymentIds },
            },
          });
        }

        await tx.payment.deleteMany({
          where: { orderId },
        });

        for (const item of snapshot.items || []) {
          await tx.orderItem.create({
            data: {
              id: Number(item.id),
              orderId: Number(item.order_id),
              menuItemId: Number(item.menu_item_id),
              name: item.name,
              price: Number(item.price),
              quantity: Number(item.quantity),
              createdAt: new Date(item.created_at),
            },
          });
        }

        for (const payment of snapshot.payments || []) {
          await tx.payment.create({
            data: {
              id: Number(payment.id),
              orderId: Number(payment.order_id),
              method: payment.method,
              source: payment.source || 'Direct',
              status: payment.status || 'pending',
              amount: Number(payment.amount),
              settledAmount: Number(payment.settled_amount || 0),
              referenceId: payment.reference_id || null,
              settledAt: payment.settled_at ? new Date(payment.settled_at) : null,
              createdAt: new Date(payment.created_at),
            },
          });
        }
      });
    }

    if (recordEvent) {
      await this.appendSyncEvent(change, sourceDeviceId);
    }
  }

  validateSyncKey(req) {
    const expectedKey = process.env.SYNC_SERVER_API_KEY || this.getConfig().syncApiKey;
    if (!expectedKey) {
      return true;
    }

    return req.headers['x-sync-key'] === expectedKey;
  }

  async getStatus() {
    const config = this.getConfig();
    const state = this.getState();
    const pendingCount = await this.getPendingCount();

    return {
      syncEnabled: config.syncEnabled,
      syncServerUrl: config.syncServerUrl,
      hasApiKey: Boolean(config.syncApiKey),
      deviceId: this.getDeviceId(),
      pendingCount,
      isSyncing: Boolean(this.syncInFlight),
      lastSyncAt: state.lastSyncAt,
      lastSuccessAt: state.lastSuccessAt,
      lastOnlineAt: state.lastOnlineAt,
      lastError: state.lastError,
    };
  }

  async runSyncNow(options = {}) {
    if (this.syncInFlight) {
      return this.syncInFlight;
    }

    this.syncInFlight = this.runSyncInternal(options)
      .catch((error) => {
        this.updateState({
          lastError: error.message || 'Sync failed',
        });
        throw error;
      })
      .finally(() => {
        this.syncInFlight = null;
      });

    return this.syncInFlight;
  }

  async runSyncInternal(options = {}) {
    const { fullResync = false } = options;
    const config = this.getConfig();

    if (!config.syncEnabled || !config.syncServerUrl) {
      return this.getStatus();
    }

    if (fullResync) {
      await this.queueFullResync();
    }

    const deviceId = this.getDeviceId();
    try {
      await this.pushAllPendingChanges(deviceId);

      await this.pullRemoteChanges(deviceId);

      const now = new Date().toISOString();
      this.updateState({
        lastSyncAt: now,
        lastSuccessAt: now,
        lastOnlineAt: now,
        lastError: '',
      });

      return this.getStatus();
    } catch (error) {
      const message = error.message || 'Sync failed';
      const pendingQueue = await this.getPendingQueue();
      await this.markQueueItemsFailed(pendingQueue.map((item) => item.id), message);
      this.updateState({
        lastError: message,
      });
      throw error;
    }
  }

  startBackgroundSync() {
    if (this.syncInterval) {
      return;
    }

    this.syncInterval = setInterval(() => {
      const config = this.getConfig();
      if (!config.syncEnabled || !config.syncServerUrl) {
        return;
      }

      this.runSyncNow().catch((error) => {
        console.error('[Sync] Background sync failed:', error.message || error);
      });
    }, DEFAULT_INTERVAL_MS);
  }
}

module.exports = new SyncService();
