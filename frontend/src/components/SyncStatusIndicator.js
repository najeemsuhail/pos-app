import React, { useEffect, useState } from 'react';
import { syncService } from '../services/api';

function formatSyncTime(value) {
  if (!value) {
    return 'Never';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Never';
  }

  return date.toLocaleString();
}

const SyncStatusIndicator = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        if (mounted) {
          setStatus(null);
        }
        return;
      }

      try {
        const response = await syncService.getStatus();
        if (mounted) {
          setStatus(response.data);
        }
      } catch (error) {
        if (mounted) {
          setStatus(null);
        }
      }
    };

    loadStatus();
    const interval = setInterval(loadStatus, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!status || !status.syncEnabled) {
    return <span>Cloud sync off</span>;
  }

  const label = status.isSyncing
    ? 'Syncing'
    : status.lastError
      ? 'Sync error'
      : 'Cloud sync on';

  return (
    <span>
      {label} | Pending: {status.pendingCount} | Last sync: {formatSyncTime(status.lastSuccessAt)}
    </span>
  );
};

export default SyncStatusIndicator;
