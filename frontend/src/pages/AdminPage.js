import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportsTab from '../components/admin/ReportsTab';
import OrderHistoryTab from '../components/admin/OrderHistoryTab';
import MenuManagementTab from '../components/admin/MenuManagementTab';
import CategoryManagementTab from '../components/admin/CategoryManagementTab';
import ExpenseManagementTab from '../components/admin/ExpenseManagementTab';
import UserManagementTab from '../components/admin/UserManagementTab';
import '../styles/Admin.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'Admin') {
      navigate('/pos');
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Admin Dashboard</h1>
          <p>Restaurant Management System</p>
        </div>
        <div className="admin-user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={() => navigate('/pos')} className="nav-btn">Go to POS</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
          Reports
        </button>
        <button className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
          Order History
        </button>
        <button className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>
          Menu Items
        </button>
        <button className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>
          Categories
        </button>
        <button className={`tab-btn ${activeTab === 'expenses' ? 'active' : ''}`} onClick={() => setActiveTab('expenses')}>
          Expenses
        </button>
        <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
          Users
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'reports' && <ReportsTab />}
        {activeTab === 'orders' && <OrderHistoryTab />}
        {activeTab === 'menu' && <MenuManagementTab />}
        {activeTab === 'categories' && <CategoryManagementTab />}
        {activeTab === 'expenses' && <ExpenseManagementTab />}
        {activeTab === 'users' && <UserManagementTab />}
      </div>
    </div>
  );
};

export default AdminPage;
