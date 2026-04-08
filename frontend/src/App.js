import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import POSPage from './pages/POSPage';
import AdminPage from './pages/AdminPage';
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
  return (
    <ThemeProvider>
      <Router>
        <OrderProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/pos" element={<ProtectedRoute element={<POSPage />} />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} requiredRole="Admin" />} />
            <Route path="/" element={<Navigate to="/pos" />} />
          </Routes>
        </OrderProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
