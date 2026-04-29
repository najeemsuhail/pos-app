const express = require('express');
const SyncService = require('../services/SyncService');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/status', authenticate, async (req, res, next) => {
  try {
    res.json(await SyncService.getStatus());
  } catch (error) {
    next(error);
  }
});

router.get('/config', authenticate, authorize('Admin'), (req, res) => {
  res.json(SyncService.getConfig());
});

router.put('/config', authenticate, authorize('Admin'), async (req, res, next) => {
  try {
    const config = SyncService.saveConfig(req.body || {});

    if (config.syncEnabled && config.syncServerUrl) {
      await SyncService.queueFullResync();
    }

    res.json({
      config,
      status: await SyncService.getStatus(),
    });
  } catch (error) {
    console.error('[Sync] Failed to save sync settings:', error);
    res.status(500).json({ error: error.message || 'Failed to save sync settings' });
  }
});

router.post('/run', authenticate, authorize('Admin'), async (req, res, next) => {
  try {
    const status = await SyncService.runSyncNow({
      fullResync: Boolean(req.body?.fullResync),
    });
    res.json(status);
  } catch (error) {
    console.error('[Sync] Failed to run sync:', error);
    res.status(500).json({ error: error.message || 'Failed to run sync' });
  }
});

router.post('/push', async (req, res, next) => {
  try {
    if (!SyncService.validateSyncKey(req)) {
      return res.status(401).json({ error: 'Invalid sync key' });
    }

    const deviceId = req.body?.deviceId || null;
    const changes = Array.isArray(req.body?.changes) ? req.body.changes : [];

    for (const change of changes) {
      await SyncService.applyIncomingChange({
        entityType: change.entityType,
        entityId: change.entityId,
        action: change.action,
        payload: change.payload,
      }, {
        recordEvent: true,
        sourceDeviceId: deviceId,
      });
    }

    return res.json({
      success: true,
      accepted: changes.length,
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Sync] Push failed:', error);
    return res.status(500).json({ error: error.message || 'Sync push failed' });
  }
});

router.post('/pull', async (req, res, next) => {
  try {
    if (!SyncService.validateSyncKey(req)) {
      return res.status(401).json({ error: 'Invalid sync key' });
    }

    const events = await SyncService.getRemoteEvents(req.body?.since, req.body?.deviceId);
    return res.json({
      events,
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Sync] Pull failed:', error);
    return res.status(500).json({ error: error.message || 'Sync pull failed' });
  }
});

module.exports = router;
