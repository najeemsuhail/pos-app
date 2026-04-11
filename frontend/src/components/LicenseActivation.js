import React, { useState, useEffect } from 'react';
import api from '../services/api';

const LicenseActivation = ({ onActivated }) => {
  const [machineId, setMachineId] = useState('');
  const [productKey, setProductKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch machine ID to display
    const checkStatus = async () => {
      try {
        const response = await api.get('/license/status');
        setMachineId(response.data.machineId);
      } catch (err) {
        setError('Failed to connect to local license service.');
      } finally {
        setLoading(false);
      }
    };
    checkStatus();
  }, []);

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
    return <div className="loading">Initializing System...</div>;
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)'
    }}>
      <div style={{
        background: 'var(--card-bg)', padding: '40px', borderRadius: '12px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)', width: '100%', maxWidth: '500px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '10px', color: 'var(--brand-primary)' }}>Activation Required</h2>
        <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>
          Please provide your Machine ID to the developer to receive an unlock key.
        </p>

        <div style={{
          background: 'var(--surface-muted)', padding: '15px', borderRadius: '8px', 
          marginBottom: '20px', fontFamily: 'monospace', fontSize: '18px',
          wordBreak: 'break-all'
        }}>
          <strong>Machine ID:</strong><br />
          {machineId || 'UNAVAILABLE'}
        </div>

        <form onSubmit={handleActivate}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Product Key</label>
            <input 
              type="text" 
              value={productKey}
              onChange={(e) => setProductKey(e.target.value)}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              style={{
                width: '100%', padding: '12px', borderRadius: '8px', 
                border: '1px solid var(--border-color)', background: 'var(--bg-color)', 
                color: 'var(--text-primary)', fontSize: '16px', letterSpacing: '2px', textAlign: 'center',
                textTransform: 'uppercase'
              }}
            />
          </div>

          {error && <div className="error-message" style={{marginBottom: '20px'}}>{error}</div>}

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', padding: '14px', fontSize: '16px' }}
          >
            Activate POS
          </button>
        </form>
      </div>
    </div>
  );
};

export default LicenseActivation;
