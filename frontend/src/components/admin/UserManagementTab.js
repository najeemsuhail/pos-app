import React, { useState, useEffect } from 'react';
import api, { userService, authService } from '../../services/api';

const UserManagementTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [targetUser, setTargetUser] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: 'Staff',
    password: '',
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.role || !formData.password) {
        setError('All fields are required');
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      await authService.register(formData.name, formData.role, formData.password);

      setFormData({ name: '', role: 'Staff', password: '' });
      setShowForm(false);
      setError('');
      setSuccess('User created successfully');
      setTimeout(() => setSuccess(''), 3000);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create user');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const isSelf = currentUser.id === targetUser.id;

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }

      const payload = {
        userId: targetUser.id,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword
      };

      if (isSelf) {
        payload.oldPassword = passwordData.oldPassword;
      }

      await userService.changePassword(payload);

      setSuccess('Password updated successfully');
      setTimeout(() => setSuccess(''), 3000);
      handlePasswordCancel();
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update password');
    }
  };

  const handleDelete = async (userId) => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (currentUser.id === userId) {
      setError('You cannot delete your own account');
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.delete(userId);
        fetchUsers();
        setError('');
        setSuccess('User deleted successfully');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete user');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', role: 'Staff', password: '' });
    setShowForm(false);
  };

  const handlePasswordCancel = () => {
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordModal(false);
    setTargetUser(null);
  };

  const openPasswordModal = (user) => {
    setTargetUser(user);
    setShowPasswordModal(true);
    setShowForm(false);
    setError('');
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>👥 Users Management</h2>
        <button 
          className="btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setShowPasswordModal(false);
          }}
        >
          {showForm ? 'Cancel' : '+ Add New User'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>Create New User</h3>
          
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., John Cashier"
              required
            />
          </div>

          <div className="form-group">
            <label>Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="Staff">Staff (Cashier)</option>
              <option value="Admin">Admin (Manager)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Minimum 6 characters"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-success">
              Create User
            </button>
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {showPasswordModal && targetUser && (
        <form className="admin-form" onSubmit={handlePasswordSubmit}>
          <h3>Change Password for: {targetUser.name}</h3>
          
          {(() => {
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            if (currentUser.id === targetUser.id) {
              return (
                <div className="form-group">
                  <label>Current Password *</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordInputChange}
                    required
                  />
                </div>
              );
            }
            return null;
          })()}

          <div className="form-group">
            <label>New Password *</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordInputChange}
              placeholder="Minimum 6 characters"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordInputChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-success">
              Update Password
            </button>
            <button type="button" className="btn-secondary" onClick={handlePasswordCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading && <div className="loading">Loading users...</div>}

      <div className="users-table">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
              const isCurrentUser = currentUser.id === user.id;
              
              return (
                <tr key={user.id} className={isCurrentUser ? 'current-user' : ''}>
                  <td>{user.name} {isCurrentUser && <span className="badge">You</span>}</td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-edit"
                      onClick={() => openPasswordModal(user)}
                      title="Change Password"
                    >
                      🔑
                    </button>
                    {!isCurrentUser && (
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(user.id)}
                        title="Delete User"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {users.length === 0 && !loading && (
        <div className="empty-state">
          <p>No users found.</p>
        </div>
      )}
    </div>
  );
};

export default UserManagementTab;
