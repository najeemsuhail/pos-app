import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportsTab from '../components/admin/ReportsTab';
import OrderHistoryTab from '../components/admin/OrderHistoryTab';
import MenuManagementTab from '../components/admin/MenuManagementTab';
import CategoryManagementTab from '../components/admin/CategoryManagementTab';
import ExpenseManagementTab from '../components/admin/ExpenseManagementTab';
import AttendanceManagementTab from '../components/admin/AttendanceManagementTab';
import PurchaseManagementTab from '../components/admin/PurchaseManagementTab';
import UserManagementTab from '../components/admin/UserManagementTab';
import BackupTab from '../components/admin/BackupTab';
import SettingsTab from '../components/admin/SettingsTab';
import ThemeToggle from '../components/ThemeToggle';
import {
  hasAdminDashboardAccess,
  hasFeatureAccess,
  normalizeUserFeatureAccessOverrides,
} from '../utils/featureAccess';
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

    const tabs = getAvailableTabs(parsedUser.role, userFeatureAccessOverrides);
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

  const availableTabs = getAvailableTabs(
    user.role,
    normalizeUserFeatureAccessOverrides(user.feature_access_overrides)
  );

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
        {activeTab === 'reports' && <ReportsTab />}
        {activeTab === 'orders' && <OrderHistoryTab />}
        {activeTab === 'menu' && <MenuManagementTab />}
        {activeTab === 'categories' && <CategoryManagementTab />}
        {activeTab === 'expenses' && <ExpenseManagementTab />}
        {activeTab === 'attendance' && <AttendanceManagementTab />}
        {activeTab === 'purchases' && <PurchaseManagementTab />}
        {activeTab === 'users' && <UserManagementTab />}
        {activeTab === 'backup' && <BackupTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
};

function getAvailableTabs(role, userFeatureAccessOverrides = {}) {
  const tabs = [
    { key: 'reports', label: 'Reports', featureKey: 'reports' },
    { key: 'orders', label: 'Order History', featureKey: 'orderHistory' },
    { key: 'menu', label: 'Menu Items', featureKey: 'menuManagement' },
    { key: 'categories', label: 'Categories', featureKey: 'categoryManagement' },
    { key: 'expenses', label: 'Operating Expenses', featureKey: 'expenseManagement' },
    { key: 'attendance', label: 'Staff Attendance', featureKey: 'attendanceManagement' },
    { key: 'purchases', label: 'Purchases', featureKey: 'purchaseManagement' },
    { key: 'users', label: 'Users', featureKey: 'userManagement' },
    { key: 'backup', label: 'Backup', featureKey: 'backupManagement' },
  ].filter((tab) => hasFeatureAccess(role, tab.featureKey, userFeatureAccessOverrides));

  if (role === 'Admin') {
    tabs.push({ key: 'settings', label: 'Settings' });
  }

  return tabs;
}

export default AdminPage;
