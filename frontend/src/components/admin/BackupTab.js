import React, { useState, useEffect } from 'react';
import { backupService } from '../../services/api';

const BackupTab = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showRestoreModal, setShowRestoreModal] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      setLoading(true);
      const response = await backupService.getAll();
      setBackups(response.data);
    } catch (err) {
      setError('Failed to load backups');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      await backupService.create();
      setSuccess('Backup snapshot created successfully!');
      fetchBackups();
    } catch (err) {
      setError('Failed to create backup');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await backupService.download(filename);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to download backup');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.name.endsWith('.db')) {
      setError('Please upload a valid .db file');
      return;
    }

    const formData = new FormData();
    formData.append('backup', file);

    try {
      setUploading(true);
      setError('');
      setSuccess('');
      await backupService.upload(formData);
      setSuccess('External backup uploaded successfully!');
      fetchBackups();
    } catch (err) {
      setError('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
      e.target.value = null; // Clear input
    }
  };

  const handleRestore = async (filename) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const response = await backupService.restore(filename);
      setSuccess(response.data.message);
      setShowRestoreModal(null);
    } catch (err) {
      setError('Restoration failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!window.confirm(`Are you sure you want to delete backup: ${filename}?`)) return;
    try {
      await backupService.delete(filename);
      fetchBackups();
    } catch (err) {
      setError('Failed to delete backup');
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredBackups = backups.filter(b => 
    b.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-tab-content">
      <div className="tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Database Maintenance</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="file" 
            id="backup-upload" 
            accept=".db" 
            style={{ display: 'none' }} 
            onChange={handleUpload}
          />
          <button 
            className="btn-primary" 
            onClick={() => document.getElementById('backup-upload').click()}
            disabled={loading || uploading}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {uploading ? 'Uploading...' : 'Upload External Backup'}
          </button>
          <button 
            className="btn-success" 
            onClick={handleCreateBackup}
            disabled={loading || uploading}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {loading ? 'Processing...' : 'Create Manual Backup'}
          </button>
        </div>
      </div>

      {error && <div className="error-message" style={{ margin: '15px 0' }}>{error}</div>}
      {success && <div className="success-message" style={{ margin: '15px 0', background: 'var(--success-muted)', padding: '10px', borderRadius: '4px', border: '1px solid var(--success-color)' }}>{success}</div>}

      <div className="section-container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>Available Backups</h3>
          <input 
            type="text" 
            placeholder="Search backups..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid var(--border-color)',
              background: 'var(--input-bg)',
              color: 'var(--text-primary)',
              width: '250px'
            }}
          />
        </div>

        {loading && backups.length === 0 ? (
          <div className="loading">Checking filesystem...</div>
        ) : filteredBackups.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Backup Filename</th>
                <th>Created Date</th>
                <th>File Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBackups.map((backup) => (
                <tr key={backup.filename}>
                  <td style={{ fontWeight: '500' }}>{backup.filename}</td>
                  <td>{new Date(backup.createdAt).toLocaleString()}</td>
                  <td>{formatSize(backup.size)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn-primary" 
                        onClick={() => handleDownload(backup.filename)}
                        title="Download locally"
                        style={{ padding: '4px 10px', fontSize: '12px' }}
                      >
                        Download
                      </button>
                      <button 
                        className="btn-warning" 
                        onClick={() => setShowRestoreModal(backup.filename)}
                        title="Restore this version"
                        style={{ padding: '4px 10px', fontSize: '12px' }}
                      >
                        Restore
                      </button>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDelete(backup.filename)}
                        title="Delete backup"
                        style={{ padding: '4px 10px', fontSize: '12px' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            <p>No backups found. Create your first snapshot above!</p>
          </div>
        )}
      </div>

      {showRestoreModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 style={{ color: 'var(--danger-color)' }}>⚠️ Critical Restoration Warning</h3>
              <button className="close-btn" onClick={() => setShowRestoreModal(null)}>&times;</button>
            </div>
            <div className="modal-body" style={{ padding: '20px 0' }}>
              <p>You are about to restore: <strong>{showRestoreModal}</strong></p>
              <p style={{ marginTop: '10px', padding: '10px', background: 'rgba(255,0,0,0.1)', borderLeft: '4px solid var(--danger-color)' }}>
                <strong>Warning:</strong> This will overwrite the current live database. Any data added after this backup was created will be lost.
              </p>
              <p style={{ marginTop: '10px' }}>An emergency backup of your current data will be created before restoration starts.</p>
            </div>
            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => setShowRestoreModal(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleRestore(showRestoreModal)}>I Understand, Restore Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupTab;
