import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import '../styles/Header.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, switchTheme, availableThemes, isThemeLocked } = useTheme();

  const themeIcons = {
    neon: 'N',
    sunset: 'S',
    ocean: 'O',
    mint: 'M',
    cyberpunk: 'C',
    light: 'L'
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'Admin';
  const isAdminPage = location.pathname === '/admin';
  const isPOSPage = location.pathname === '/pos';

  return (
    <header className="header">
      <div className="header-left">
        <h1>Chewbiecafe</h1>
      </div>

      <div className="header-right">
        <div className="user-info">
          <span>{user?.name}</span>
          <span className="role-badge">{user?.role}</span>
        </div>

        {isAdmin && (
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
