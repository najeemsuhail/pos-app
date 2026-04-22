const TRIAL_DURATION_DAYS = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const SECRET_SALT = process.env.LICENSE_ACTIVATION_SALT || 'HOPE_PRIVATE_POS_SALT_123';

function normalizeIsoDate(value) {
  if (typeof value !== 'string' || !value.trim()) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString();
}

function getNowIso() {
  return new Date().toISOString();
}

function buildTrialStatus(startedAt, tampered = false, tamperReason = null) {
  if (tampered) {
    return {
      startedAt: normalizeIsoDate(startedAt),
      expiresAt: null,
      durationDays: TRIAL_DURATION_DAYS,
      expired: true,
      daysLeft: 0,
      tampered: true,
      tamperReason: tamperReason || 'remote_tamper_flag',
    };
  }

  const normalizedStartedAt = normalizeIsoDate(startedAt) || getNowIso();
  const startedAtMs = new Date(normalizedStartedAt).getTime();
  const expiresAtMs = startedAtMs + (TRIAL_DURATION_DAYS * MS_PER_DAY);
  const nowMs = Date.now();
  const remainingMs = expiresAtMs - nowMs;
  const expired = remainingMs <= 0;
  const daysLeft = expired ? 0 : Math.max(1, Math.ceil(remainingMs / MS_PER_DAY));

  return {
    startedAt: normalizedStartedAt,
    expiresAt: new Date(expiresAtMs).toISOString(),
    durationDays: TRIAL_DURATION_DAYS,
    expired,
    daysLeft,
    tampered: false,
    tamperReason: null,
  };
}

class RemoteLicenseLedgerService {
  isConfigured() {
    return Boolean(
      process.env.LICENSE_LEDGER_SUPABASE_URL &&
      process.env.LICENSE_LEDGER_SUPABASE_SERVICE_ROLE_KEY &&
      process.env.LICENSE_LEDGER_SHARED_SECRET
    );
  }

  isAuthorized(req) {
    const providedSecret = req.headers['x-license-ledger-secret'];
    return Boolean(providedSecret) && providedSecret === process.env.LICENSE_LEDGER_SHARED_SECRET;
  }

  getSupabaseBaseUrl() {
    return process.env.LICENSE_LEDGER_SUPABASE_URL.replace(/\/+$/, '');
  }

  getSupabaseHeaders() {
    return {
      apikey: process.env.LICENSE_LEDGER_SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.LICENSE_LEDGER_SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    };
  }

  async fetchLedgerRecord(machineId) {
    const url = new URL(`${this.getSupabaseBaseUrl()}/rest/v1/license_ledger`);
    url.searchParams.set('machine_id', `eq.${machineId}`);
    url.searchParams.set('select', '*');
    url.searchParams.set('limit', '1');

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getSupabaseHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Ledger read failed with ${response.status}`);
    }

    const rows = await response.json();
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  }

  async upsertLedgerRecord(record) {
    const url = new URL(`${this.getSupabaseBaseUrl()}/rest/v1/license_ledger`);
    url.searchParams.set('on_conflict', 'machine_id');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...this.getSupabaseHeaders(),
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error(`Ledger upsert failed with ${response.status}`);
    }

    const rows = await response.json();
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : record;
  }

  generateExpectedProductKey(machineId) {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update(machineId + SECRET_SALT).digest('hex').toUpperCase();
    const key = hash.substring(0, 16);
    return `${key.slice(0, 4)}-${key.slice(4, 8)}-${key.slice(8, 12)}-${key.slice(12, 16)}`;
  }

  async resolveStatus(payload = {}) {
    const machineId = typeof payload.machineId === 'string' ? payload.machineId.trim() : '';
    if (!machineId) {
      throw new Error('machineId is required');
    }

    const now = getNowIso();
    const existing = await this.fetchLedgerRecord(machineId);
    const clientStartedAt = normalizeIsoDate(payload.trialStartedAt);
    const clientTampered = Boolean(payload.tampered);
    const clientTamperReason = typeof payload.tamperReason === 'string' && payload.tamperReason.trim()
      ? payload.tamperReason.trim()
      : null;

    const trialStartedAt = [existing?.trial_started_at, clientStartedAt]
      .map(normalizeIsoDate)
      .filter(Boolean)
      .sort()[0] || now;

    const tampered = Boolean(existing?.tampered) || clientTampered;
    const tamperReason = existing?.tamper_reason || clientTamperReason || (tampered ? 'client_tamper_flag' : null);

    const saved = await this.upsertLedgerRecord({
      machine_id: machineId,
      trial_started_at: trialStartedAt,
      activated: Boolean(existing?.activated),
      activated_at: existing?.activated_at || null,
      tampered,
      tamper_reason: tamperReason,
      last_seen_at: now,
      updated_at: now,
    });

    return {
      activated: Boolean(saved.activated),
      machineId,
      trial: saved.activated ? null : buildTrialStatus(saved.trial_started_at, Boolean(saved.tampered), saved.tamper_reason),
    };
  }

  async activate(payload = {}) {
    const machineId = typeof payload.machineId === 'string' ? payload.machineId.trim() : '';
    const productKey = typeof payload.productKey === 'string' ? payload.productKey.trim() : '';

    if (!machineId || !productKey) {
      throw new Error('machineId and productKey are required');
    }

    const normalizedInput = productKey.replace(/-/g, '').toUpperCase();
    const normalizedExpected = this.generateExpectedProductKey(machineId).replace(/-/g, '');
    if (normalizedInput !== normalizedExpected) {
      return { success: false, message: 'Invalid product key for this machine.' };
    }

    const now = getNowIso();
    const existing = await this.fetchLedgerRecord(machineId);
    const trialStartedAt = normalizeIsoDate(existing?.trial_started_at) || now;

    await this.upsertLedgerRecord({
      machine_id: machineId,
      trial_started_at: trialStartedAt,
      activated: true,
      activated_at: existing?.activated_at || now,
      tampered: Boolean(existing?.tampered),
      tamper_reason: existing?.tamper_reason || null,
      last_seen_at: now,
      updated_at: now,
    });

    return { success: true, message: 'Application activated successfully!' };
  }
}

module.exports = new RemoteLicenseLedgerService();
