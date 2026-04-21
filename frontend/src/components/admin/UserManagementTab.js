import React, { useEffect, useState } from 'react';
import { authService, userService } from '../../services/api';
import {
  CONFIGURABLE_ADMIN_FEATURES,
  getEffectiveFeatureAccess,
  normalizeUserFeatureAccessOverrides,
} from '../../utils/featureAccess';

const EMPTY_FEATURE_ACCESS = Object.fromEntries(
  CONFIGURABLE_ADMIN_FEATURES.map(({ key }) => [key, false])
);

const UserManagementTab = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
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

  const [featureAccessData, setFeatureAccessData] = useState({ ...EMPTY_FEATURE_ACCESS });

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
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((current) => ({
      ...current,
      [name]: value,
    }));
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

      await authService.register(formData.name, formData.role, formData.password, {});

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
        confirmPassword: passwordData.confirmPassword,
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

  const handleFeatureAccessSubmit = async (e) => {
    e.preventDefault();

    if (!targetUser) {
      return;
    }

    try {
      const featureAccessOverrides = normalizeUserFeatureAccessOverrides(featureAccessData);
      const response = await userService.updateFeatureAccess(targetUser.id, featureAccessOverrides);

      setUsers((currentUsers) =>
        currentUsers.map((user) => (user.id === response.data.id ? response.data : user))
      );

      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (currentUser.id === response.data.id) {
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...currentUser,
            feature_access_overrides: response.data.feature_access_overrides || {},
          })
        );
        window.location.reload();
        return;
      }

      setSuccess('User access updated successfully');
      setTimeout(() => setSuccess(''), 3000);
      handleAccessCancel();
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update user access');
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

  const handleAccessCancel = () => {
    setFeatureAccessData({ ...EMPTY_FEATURE_ACCESS });
    setShowAccessModal(false);
    setTargetUser(null);
  };

  const openPasswordModal = (user) => {
    setTargetUser(user);
    setShowPasswordModal(true);
    setShowAccessModal(false);
    setShowForm(false);
    setError('');
  };

  const openAccessModal = (user) => {
    setTargetUser(user);
    setShowAccessModal(true);
    setShowPasswordModal(false);
    setShowForm(false);
    setError('');
    setFeatureAccessData(
      getEffectiveFeatureAccess(
        user.role,
        normalizeUserFeatureAccessOverrides(user.feature_access_overrides)
      )
    );
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <h2>Users Management</h2>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setShowPasswordModal(false);
            setShowAccessModal(false);
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

      {showAccessModal && targetUser && (
        <form className="admin-form" onSubmit={handleFeatureAccessSubmit}>
          <h3>Feature Access for: {targetUser.name}</h3>
          <p style={{ marginTop: 0, color: 'var(--text-secondary)' }}>
            These settings directly control which admin features this user can open.
          </p>

          {targetUser.role === 'Admin' ? (
            <div className="info-message">Admin users always have full access to all features.</div>
          ) : (
            <div className="feature-access-grid">
              {CONFIGURABLE_ADMIN_FEATURES.map((feature) => (
                <label key={feature.key} className="feature-access-item">
                  <input
                    type="checkbox"
                    checked={Boolean(featureAccessData[feature.key])}
                    onChange={(event) =>
                      setFeatureAccessData((current) => ({
                        ...current,
                        [feature.key]: event.target.checked,
                      }))
                    }
                  />
                  <div>
                    <div className="feature-access-title">{feature.label}</div>
                    <div className="feature-access-description">{feature.description}</div>
                  </div>
                </label>
              ))}
            </div>
          )}

          <div className="form-actions">
            {targetUser.role !== 'Admin' && (
              <button type="submit" className="btn-success">
                Save Access
              </button>
            )}
            <button type="button" className="btn-secondary" onClick={handleAccessCancel}>
              Close
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
            {users.map((user) => {
              const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
              const isCurrentUser = currentUser.id === user.id;

              return (
                <tr key={user.id} className={isCurrentUser ? 'current-user' : ''}>
                  <td>
                    {user.name} {isCurrentUser && <span className="badge">You</span>}
                  </td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="action-buttons user-action-buttons">
                    <button
                      className="btn-edit user-action-btn"
                      onClick={() => openPasswordModal(user)}
                      title="Change Password"
                    >
                      Password
                    </button>
                    <button
                      className="btn-secondary user-action-btn"
                      onClick={() => openAccessModal(user)}
                      title="Manage feature access"
                    >
                      Access
                    </button>
                    {!isCurrentUser && (
                      <button
                        className="btn-delete user-action-btn"
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .feature-access-grid {
              display: grid;
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 14px;
              margin: 18px 0 20px;
            }
            .feature-access-item {
              display: flex;
              gap: 12px;
              align-items: flex-start;
              border: 1px solid var(--border-color);
              border-radius: 10px;
              padding: 14px;
              background: var(--bg-primary);
            }
            .feature-access-item input {
              margin-top: 3px;
            }
            .feature-access-title {
              font-weight: 600;
              color: var(--text-primary);
              margin-bottom: 4px;
            }
            .feature-access-description {
              color: var(--text-secondary);
              font-size: 13px;
              line-height: 1.4;
            }
            .user-action-buttons {
              display: flex;
              align-items: center;
              gap: 8px;
              flex-wrap: wrap;
            }
            .user-action-btn {
              min-width: 0;
              padding: 9px 14px;
              line-height: 1.1;
              white-space: nowrap;
            }
            @media (max-width: 768px) {
              .feature-access-grid {
                grid-template-columns: 1fr;
              }
              .user-action-buttons {
                flex-direction: column;
                align-items: stretch;
              }
              .user-action-btn {
                width: 100%;
              }
            }
          `,
        }}
      />
    </div>
  );
};

export default UserManagementTab;
