import React, { useEffect, useMemo, useState } from 'react';
import { adminService, settingService, syncService } from '../../services/api';

const DEFAULT_TABLE_COUNT = 12;
const MIN_TABLE_COUNT = 1;
const MAX_TABLE_COUNT = 50;

const normalizeTableCount = (value) => {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_TABLE_COUNT;
  }

  return Math.min(Math.max(parsed, MIN_TABLE_COUNT), MAX_TABLE_COUNT);
};

const buildDefaultTableNames = (tableCount = DEFAULT_TABLE_COUNT) =>
  Array.from({ length: normalizeTableCount(tableCount) }, (_, index) => `Table ${index + 1}`);

const SettingsTab = () => {
  const defaultTableNames = useMemo(() => buildDefaultTableNames(), []);
  const [resetConfirm, setResetConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState('browser-default');
  const [storeSettings, setStoreSettings] = useState({
    storeName: '',
    storeAddressLocality: '',
    storePhone: '',
    taxRate: 5,
    tableCount: DEFAULT_TABLE_COUNT,
    tableNames: defaultTableNames,
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [syncConfig, setSyncConfig] = useState({
    syncEnabled: false,
    syncServerUrl: '',
    syncApiKey: '',
  });
  const [syncStatus, setSyncStatus] = useState(null);
  const [isSavingSync, setIsSavingSync] = useState(false);
  const [isRunningSync, setIsRunningSync] = useState(false);

  useEffect(() => {
    if (window.posDesktop && window.posDesktop.getPrinters) {
      window.posDesktop.getPrinters()
        .then((printersList) => {
          setPrinters(printersList || []);
        })
        .catch((err) => console.error('Could not load printers', err));
    }

    const savedPrinter = localStorage.getItem('receiptPrinter');
    if (savedPrinter) {
      setSelectedPrinter(savedPrinter);
    }

    settingService.getAll()
      .then((res) => setStoreSettings({
        ...res.data,
        tableCount: normalizeTableCount(res.data.tableCount),
        tableNames: Array.isArray(res.data.tableNames)
          ? buildDefaultTableNames(res.data.tableCount).map((fallback, index) => res.data.tableNames[index] || fallback)
          : buildDefaultTableNames(res.data.tableCount),
      }))
      .catch((err) => console.error('Failed to load settings:', err));

    syncService.getConfig()
      .then((res) => setSyncConfig(res.data))
      .catch((err) => console.error('Failed to load sync config:', err));

    syncService.getStatus()
      .then((res) => setSyncStatus(res.data))
      .catch((err) => console.error('Failed to load sync status:', err));
  }, [defaultTableNames]);

  const formatSyncTime = (value) => {
    if (!value) {
      return 'Never';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return 'Never';
    }

    return parsed.toLocaleString();
  };

  const handlePrinterChange = (event) => {
    const value = event.target.value;
    setSelectedPrinter(value);
    localStorage.setItem('receiptPrinter', value);
    setSuccess('Printer settings saved successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleTableNameChange = (index, value) => {
    const nextTableNames = [...(storeSettings.tableNames || defaultTableNames)];
    nextTableNames[index] = value;
    setStoreSettings({ ...storeSettings, tableNames: nextTableNames });
  };

  const handleTableCountChange = (value) => {
    const tableCount = normalizeTableCount(value);
    const existingNames = Array.isArray(storeSettings.tableNames) ? storeSettings.tableNames : [];
    const nextTableNames = buildDefaultTableNames(tableCount).map((fallback, index) => existingNames[index] || fallback);

    setStoreSettings({
      ...storeSettings,
      tableCount,
      tableNames: nextTableNames,
    });
  };

  const handleSaveStoreSettings = async () => {
    try {
      setIsSavingSettings(true);
      setError('');
      let response;
      try {
        response = await settingService.update(storeSettings);
      } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 401 || err.response?.status === 403) {
          response = await settingService.updateLegacy(storeSettings);
        } else {
          throw err;
        }
      }
      setStoreSettings({
        ...response.data,
        tableCount: normalizeTableCount(response.data.tableCount),
        tableNames: Array.isArray(response.data.tableNames)
          ? buildDefaultTableNames(response.data.tableCount).map((fallback, index) => response.data.tableNames[index] || fallback)
          : buildDefaultTableNames(response.data.tableCount),
      });
      setSuccess('Store settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save store settings');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleSaveSyncSettings = async () => {
    try {
      setIsSavingSync(true);
      setError('');
      const response = await syncService.updateConfig(syncConfig);
      setSyncConfig(response.data.config);
      setSyncStatus(response.data.status);
      setSuccess('Cloud sync settings saved successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save sync settings');
    } finally {
      setIsSavingSync(false);
    }
  };

  const handleRunSync = async (fullResync = false) => {
    try {
      setIsRunningSync(true);
      setError('');
      const response = await syncService.runNow(fullResync);
      setSyncStatus(response.data);
      setSuccess(fullResync ? 'Full sync completed successfully!' : 'Sync completed successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to run sync');
    } finally {
      setIsRunningSync(false);
    }
  };

  const handleReset = async () => {
    if (resetConfirm !== 'RESET') {
      setError('Please type RESET to confirm');
      return;
    }

    if (!window.confirm('CRITICAL: This will permanently delete all order history, products, and categories. This action is irreversible. Are you absolutely sure?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await adminService.resetDatabase();
      setSuccess(response.data.message);
      setResetConfirm('');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset system');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>System Settings</h2>
      </div>

      <div className="settings-container">
        <div className="settings-section" style={{ marginBottom: '30px' }}>
          <h3>Store Information</h3>
          <p>These details will appear on the receipts.</p>
          <div className="setting-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Store Name</label>
              <input
                type="text"
                className="settings-input"
                value={storeSettings.storeName}
                onChange={(event) => setStoreSettings({ ...storeSettings, storeName: event.target.value })}
                disabled={isSavingSettings}
              />
            </div>
            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Store Address (Locality / City)</label>
              <input
                type="text"
                className="settings-input"
                value={storeSettings.storeAddressLocality}
                onChange={(event) => setStoreSettings({ ...storeSettings, storeAddressLocality: event.target.value })}
                disabled={isSavingSettings}
              />
            </div>
            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Store Phone Number</label>
              <input
                type="text"
                className="settings-input"
                value={storeSettings.storePhone}
                onChange={(event) => setStoreSettings({ ...storeSettings, storePhone: event.target.value })}
                disabled={isSavingSettings}
              />
            </div>
            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Tax Rate (%)</label>
              <input
                type="number"
                className="settings-input"
                value={storeSettings.taxRate}
                min="0"
                step="0.01"
                onChange={(event) => setStoreSettings({ ...storeSettings, taxRate: Number(event.target.value) })}
                disabled={isSavingSettings}
              />
            </div>
            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Number of Tables</label>
              <input
                type="number"
                className="settings-input"
                value={storeSettings.tableCount}
                min={MIN_TABLE_COUNT}
                max={MAX_TABLE_COUNT}
                step="1"
                onChange={(event) => handleTableCountChange(event.target.value)}
                disabled={isSavingSettings}
              />
              <small style={{ display: 'block', marginTop: '6px', color: 'var(--text-secondary)' }}>
                Choose between {MIN_TABLE_COUNT} and {MAX_TABLE_COUNT} tables.
              </small>
            </div>
            <button
              className={`btn-gradient ${isSavingSettings ? 'btn-disabled' : ''}`}
              onClick={handleSaveStoreSettings}
              disabled={isSavingSettings}
            >
              {isSavingSettings ? 'Saving...' : 'Save Store Settings'}
            </button>
          </div>
        </div>

        <div className="settings-section" style={{ marginBottom: '30px' }}>
          <h3>Table Names</h3>
          <p>Rename your tables here. The POS will use the configured table count and keep numeric table ids internally.</p>
          <div className="setting-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="table-settings-grid">
              {(storeSettings.tableNames || defaultTableNames).map((tableName, index) => (
                <div key={index} style={{ width: '100%' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Table {index + 1}</label>
                  <input
                    type="text"
                    className="settings-input"
                    value={tableName}
                    onChange={(event) => handleTableNameChange(index, event.target.value)}
                    placeholder={`Table ${index + 1}`}
                    disabled={isSavingSettings}
                  />
                </div>
              ))}
            </div>
            <button
              className={`btn-gradient ${isSavingSettings ? 'btn-disabled' : ''}`}
              onClick={handleSaveStoreSettings}
              disabled={isSavingSettings}
            >
              {isSavingSettings ? 'Saving...' : 'Save Table Names'}
            </button>
          </div>
        </div>

        {window.posDesktop && (
          <div className="settings-section hardware-zone" style={{ marginBottom: '30px' }}>
            <h3>Hardware and Devices</h3>
            <div className="setting-card">
              <div className="setting-info">
                <h4>Receipt Printer</h4>
                <p>Select the physical printer used for generating receipts. Overrides browser default printing dialog for silent printing.</p>
              </div>
              <div className="setting-action">
                <select
                  className="settings-select"
                  value={selectedPrinter}
                  onChange={handlePrinterChange}
                  style={{ width: '100%', maxWidth: '300px' }}
                >
                  <option value="browser-default">Standard Browser Print Dialog</option>
                  {printers.map((printer) => (
                    <option key={printer.name} value={printer.name}>{printer.displayName || printer.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="settings-section" style={{ marginBottom: '30px' }}>
          <h3>Cloud Sync</h3>
          <p>Keep local POS data in sync with an online server whenever internet is available.</p>
          <div className="setting-card" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  checked={syncConfig.syncEnabled}
                  onChange={(event) => setSyncConfig({ ...syncConfig, syncEnabled: event.target.checked })}
                  style={{ marginRight: '8px' }}
                  disabled={isSavingSync}
                />
                Enable Cloud Sync
              </label>
            </div>
            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Sync Server URL</label>
              <input
                type="text"
                className="settings-input"
                value={syncConfig.syncServerUrl}
                onChange={(event) => setSyncConfig({ ...syncConfig, syncServerUrl: event.target.value })}
                placeholder="https://your-sync-server.com"
                disabled={isSavingSync}
              />
            </div>
            <div style={{ width: '100%', marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Shared Sync Key</label>
              <input
                type="text"
                className="settings-input"
                value={syncConfig.syncApiKey}
                onChange={(event) => setSyncConfig({ ...syncConfig, syncApiKey: event.target.value })}
                placeholder="Optional shared secret"
                disabled={isSavingSync}
              />
            </div>
            <div style={{ width: '100%', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
              <div>Device ID: {syncStatus?.deviceId || 'Loading...'}</div>
              <div>Pending changes: {syncStatus?.pendingCount ?? 0}</div>
              <div>Last sync: {formatSyncTime(syncStatus?.lastSuccessAt)}</div>
              <div>Last error: {syncStatus?.lastError || 'None'}</div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className={`btn-gradient ${isSavingSync ? 'btn-disabled' : ''}`}
                onClick={handleSaveSyncSettings}
                disabled={isSavingSync}
              >
                {isSavingSync ? 'Saving...' : 'Save Sync Settings'}
              </button>
              <button
                className={`btn-gradient ${isRunningSync ? 'btn-disabled' : ''}`}
                onClick={() => handleRunSync(false)}
                disabled={isRunningSync || !syncConfig.syncEnabled}
              >
                {isRunningSync ? 'Syncing...' : 'Sync Now'}
              </button>
              <button
                className={`btn-gradient ${isRunningSync ? 'btn-disabled' : ''}`}
                onClick={() => handleRunSync(true)}
                disabled={isRunningSync || !syncConfig.syncEnabled}
              >
                {isRunningSync ? 'Syncing...' : 'Full Resync'}
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section danger-zone">
          <h3>Danger Zone</h3>
          <p>The following actions are destructive and cannot be undone. Use with extreme caution.</p>

          <div className="setting-card">
            <div className="setting-info">
              <h4>Factory Reset / Clear All Data</h4>
              <p>Permanently delete all transaction history, sales records, product catalogs, and staff accounts. The current Administrator account and software license will be preserved.</p>
            </div>

            <div className="setting-action">
              <div className="reset-confirmation">
                <label>Type <strong>RESET</strong> to confirm:</label>
                <input
                  type="text"
                  value={resetConfirm}
                  onChange={(event) => setResetConfirm(event.target.value)}
                  placeholder="RESET"
                  className="reset-input"
                />
              </div>
              <button
                className={`btn-delete ${loading ? 'btn-disabled' : ''}`}
                onClick={handleReset}
                disabled={loading || resetConfirm !== 'RESET'}
              >
                {loading ? 'Processing Reset...' : 'Execute Factory Reset'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && <div className="error-message" style={{ marginTop: '20px' }}>{error}</div>}
      {success && <div className="success-message" style={{ marginTop: '20px' }}>{success}</div>}

      <style dangerouslySetInnerHTML={{ __html: `
        .settings-container {
          max-width: 900px;
        }
        .danger-zone {
          border: 1px solid #ff4d4d;
          border-radius: 12px;
          padding: 24px;
          background: rgba(255, 77, 77, 0.05);
        }
        .danger-zone h3 {
          color: #ff4d4d;
          margin-top: 0;
        }
        .setting-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 20px;
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .setting-info h4 {
          margin: 0 0 8px 0;
          color: var(--text-primary);
        }
        .setting-info p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.5;
        }
        .setting-action {
          display: flex;
          align-items: flex-end;
          gap: 20px;
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
          flex-wrap: wrap;
        }
        .reset-confirmation {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .reset-confirmation label {
          font-size: 13px;
          color: var(--text-primary);
        }
        .reset-input {
          padding: 10px;
          border: 2px solid #ff4d4d;
          border-radius: 8px;
          background: var(--bg-primary);
          color: var(--text-primary);
          width: 150px;
          font-weight: bold;
          text-align: center;
        }
        .settings-input, .settings-select {
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 14px;
          width: 100%;
        }
        .table-settings-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }
        .btn-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .table-settings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </div>
  );
};

export default SettingsTab;
