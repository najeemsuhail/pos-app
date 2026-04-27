import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { hasAdminDashboardAccess, normalizeUserFeatureAccessOverrides } from '../utils/featureAccess';
import { getVisibleAdminTabs } from '../config/adminTabs';
import '../styles/Admin.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('');
  const [user, setUser] = useState(null);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    const userFeatureAccessOverrides = normalizeUserFeatureAccessOverrides(
      parsedUser.feature_access_overrides
    );

    if (parsedUser.role !== 'Admin' && !hasAdminDashboardAccess(parsedUser.role, userFeatureAccessOverrides)) {
      navigate('/pos');
      setLoadingPermissions(false);
      return;
    }

    const tabs = getVisibleAdminTabs();
    setUser(parsedUser);
    setActiveTab(tabs[0]?.key || '');
    setLoadingPermissions(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user || loadingPermissions) {
    return <div className="admin-loading">Loading...</div>;
  }

  const availableTabs = getVisibleAdminTabs();

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Admin Dashboard</h1>
          <p>Chewbiecafe Management System</p>
        </div>
        <div className="admin-user-info">
          <span>Welcome, {user.name}</span>
          <ThemeToggle />
          <button onClick={() => navigate('/pos')} className="nav-btn">Go to POS</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        {availableTabs.map((tab) => (
          <button key={tab.key} className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {availableTabs.map((tab) => {
          const TabComponent = tab.Component;
          return activeTab === tab.key ? <TabComponent key={tab.key} /> : null;
        })}
      </div>
    </div>
  );
};

export default AdminPage;
