import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import {
  hasAdminDashboardAccess,
  normalizeUserFeatureAccessOverrides,
} from '../utils/featureAccess';
import { APP_NAME } from '../config/appInfo';
import '../styles/Header.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  const canAccessDashboard = Boolean(user?.role) && hasAdminDashboardAccess(
    user.role,
    normalizeUserFeatureAccessOverrides(user?.feature_access_overrides)
  );
  const isAdminPage = location.pathname === '/admin';
  const isPOSPage = location.pathname === '/pos';

  return (
    <header className="header">
      <div className="header-left">
        <h1>{APP_NAME}</h1>
      </div>

      <div className="header-right">
        <div className="user-info">
          <span>{user?.name}</span>
          <span className="role-badge">{user?.role}</span>
        </div>

        {canAccessDashboard && (
          <div className="nav-buttons">
            {isPOSPage && (
              <button
                onClick={() => navigate('/admin')}
                className="admin-btn"
                title="Go to Admin Dashboard"
              >
                Dashboard
              </button>
            )}
            {isAdminPage && (
              <button
                onClick={() => navigate('/pos')}
                className="pos-btn"
                title="Go to POS Cashier"
              >
                POS
              </button>
            )}
          </div>
        )}

        <ThemeToggle />

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
