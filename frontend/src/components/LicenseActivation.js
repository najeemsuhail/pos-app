import React, { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/LicenseActivation.css';

const LicenseActivation = ({ onActivated, licenseStatus }) => {
  const [machineId, setMachineId] = useState('');
  const [productKey, setProductKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [trialInfo, setTrialInfo] = useState(null);
  const trialDurationDays = trialInfo?.durationDays ?? 7;

  useEffect(() => {
    if (licenseStatus) {
      setMachineId(licenseStatus.machineId || '');
      setTrialInfo(licenseStatus.trial || null);
      setLoading(false);
      return undefined;
    }

    // Fetch machine ID to display
    const checkStatus = async () => {
      try {
        const response = await api.get('/license/status');
        setMachineId(response.data.machineId);
        setTrialInfo(response.data.trial || null);
      } catch (err) {
        setError('Failed to connect to local license service.');
      } finally {
        setLoading(false);
      }
    };
    checkStatus();
    return undefined;
  }, [licenseStatus]);

  const handleActivate = async (e) => {
    e.preventDefault();
    if (!productKey) return;
    
    setError('');
    const plainKey = productKey.replace(/-/g, '').toUpperCase();
    if (plainKey.length !== 16) {
      setError('Product key must be 16 characters.');
      return;
    }

    try {
      const response = await api.post('/license/activate', { productKey });
      if (response.data.success) {
        onActivated();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid product key.');
    }
  };

  if (loading) {
    return <div className="license-activation-loading">Initializing System...</div>;
  }

  return (
    <div className="license-activation-page">
      <div className="license-activation-card">
        <div className="license-activation-header">
          <h2>
            {trialInfo?.tampered
              ? 'Trial Locked'
              : trialInfo?.expired
                ? 'Trial Expired'
                : 'Activation Required'}
          </h2>
          <p>
            {trialInfo?.tampered
              ? 'Trial tampering was detected on this machine. Please provide your Machine ID to the developer to receive an unlock key.'
              : trialInfo?.expired
                ? `Your ${trialDurationDays}-day trial has ended. Please provide your Machine ID to the developer to receive an unlock key.`
                : 'Please provide your Machine ID to the developer to receive an unlock key.'}
          </p>
        </div>

        <div className="license-machine-card">
          <span className="license-machine-label">Machine ID</span>
          <div className="license-machine-id">{machineId || 'UNAVAILABLE'}</div>
        </div>

        <form onSubmit={handleActivate}>
          <div className="license-field">
            <label htmlFor="productKey">Product Key</label>
            <input 
              id="productKey"
              type="text" 
              value={productKey}
              onChange={(e) => setProductKey(e.target.value)}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="license-input"
            />
          </div>

          {error && <div className="license-error">{error}</div>}

          <button 
            type="submit" 
            className="license-activate-btn"
          >
            Activate POS
          </button>
        </form>
      </div>
    </div>
  );
};

export default LicenseActivation;
