import React, { useState } from 'react';
import { adminService } from '../../services/api';

const SettingsTab = () => {
  const [resetConfirm, setResetConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      // Force reload after a short delay to refresh all state
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
        <h2>⚙️ System Settings</h2>
      </div>

      <div className="settings-container">
        <div className="settings-section danger-zone">
          <h3>⚠️ Danger Zone</h3>
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
                  onChange={(e) => setResetConfirm(e.target.value)}
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
          max-width: 800px;
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
        .btn-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}} />
    </div>
  );
};

export default SettingsTab;
