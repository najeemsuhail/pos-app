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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    let requestAbortController = null;

    const loadStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        if (mounted) {
          setStatus(null);
        }
        return;
      }

      // Don't start a new request if one is already in progress
      if (isLoading) {
        return;
      }

      try {
        setIsLoading(true);
        const response = await syncService.getStatus();
        if (mounted) {
          setStatus(response.data);
        }
      } catch (error) {
        if (mounted) {
          // Only set status to null on actual errors, not timeouts
          // so we can show the previous status while waiting for a response
          if (error.code !== 'ECONNABORTED') {
            setStatus(null);
          }
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadStatus();
    const interval = setInterval(loadStatus, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
      // Cancel any in-flight request
      if (requestAbortController) {
        requestAbortController.abort();
      }
    };
  }, [isLoading]);

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
