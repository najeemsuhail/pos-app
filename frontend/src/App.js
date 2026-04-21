import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import POSPage from './pages/POSPage';
import AdminPage from './pages/AdminPage';
import LicenseActivation from './components/LicenseActivation';
import SyncStatusIndicator from './components/SyncStatusIndicator';
import api from './services/api';
import { OrderProvider } from './context/OrderContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/themes.css';
import './styles/index.css';

function ProtectedRoute({ element, requiredRole = null }) {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole) {
    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== requiredRole) {
      return <Navigate to="/pos" />;
    }
  }

  return element;
}

function App() {
  const [licenseStatus, setLicenseStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = process.env.REACT_APP_NAME || 'Chewbiecafe POS';

    const checkLicense = async () => {
      try {
        const response = await api.get('/license/status');
        setLicenseStatus(response.data);
      } catch (err) {
        console.error('License check failed:', err);
        setLicenseStatus({ activated: false, trial: null });
      } finally {
        setLoading(false);
      }
    };
    checkLicense();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        height: '100vh', background: '#111827', color: 'white'
      }}>
        <div className="light-loader" style={{ borderColor: 'rgba(255, 255, 255, 0.1)', borderLeftColor: '#ffffff' }}></div>
        <div>Initializing...</div>
      </div>
    );
  }

  const isActivated = Boolean(licenseStatus?.activated);
  const isTrialActive = Boolean(licenseStatus?.trial && !licenseStatus.trial.expired);
  const canUseApp = isActivated || isTrialActive;

  if (!canUseApp) {
    return <LicenseActivation onActivated={() => setLicenseStatus((current) => ({ ...(current || {}), activated: true, trial: null }))} licenseStatus={licenseStatus} />;
  }

  return (
    <ThemeProvider>
      <Router>
        <OrderProvider>
          {!isActivated && isTrialActive ? (
            <div style={{
              background: '#f59e0b',
              color: '#111827',
              padding: '10px 16px',
              textAlign: 'center',
              fontWeight: 700,
            }}>
              Trial version: {licenseStatus.trial.daysLeft} day{licenseStatus.trial.daysLeft === 1 ? '' : 's'} left
            </div>
          ) : null}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/pos" element={<ProtectedRoute element={<POSPage />} />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
            <Route path="/" element={<Navigate to="/pos" />} />
          </Routes>
          <footer className="app-footer">
            <span style={{ pointerEvents: 'auto' }}>
              <SyncStatusIndicator />
            </span>
            <span style={{ margin: '0 8px' }}>|</span>
            <span>&copy; {new Date().getFullYear()} Kani Enterprise. All rights reserved.</span>
          </footer>
        </OrderProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
