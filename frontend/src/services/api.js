import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  register: (name, role, password) => api.post('/auth/register', { name, role, password }),
};

export const categoryService = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (name) => api.post('/categories', { name }),
  update: (id, name) => api.patch(`/categories/${id}`, { name }),
  delete: (id) => api.delete(`/categories/${id}`),
};

export const menuItemService = {
  getAll: () => api.get('/menu-items'),
  getById: (id) => api.get(`/menu-items/${id}`),
  getByCategory: (categoryId) => api.get(`/menu-items/category/${categoryId}`),
  create: (data) => api.post('/menu-items', data),
  update: (id, data) => api.patch(`/menu-items/${id}`, data),
  toggleAvailability: (id, isAvailable) => api.patch(`/menu-items/${id}/availability`, { is_available: isAvailable }),
  delete: (id) => api.delete(`/menu-items/${id}`),
};

export const orderService = {
  create: () => api.post('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  addItem: (orderId, data) => api.post(`/orders/${orderId}/items`, data),
  updateItem: (orderId, itemId, quantity) => api.patch(`/orders/${orderId}/items/${itemId}`, { quantity }),
  removeItem: (orderId, itemId) => api.delete(`/orders/${orderId}/items/${itemId}`),
  getItems: (orderId) => api.get(`/orders/${orderId}/items`),
  finalize: (orderId, data) => api.post(`/orders/${orderId}/finalize`, data),
  pay: (orderId, payments) => api.post(`/orders/${orderId}/payments`, { payments }),
  getReceipt: (orderId) => api.get(`/orders/${orderId}/receipt`),
  cancel: (orderId) => api.post(`/orders/${orderId}/cancel`),
};

export const reportService = {
  getDailySummary: (date) => api.get('/reports/daily', { params: { date } }),
  getDateRangeSummary: (startDate, endDate) =>
    api.get('/reports/range', { params: { startDate, endDate } }),
  getExpenseSummary: (startDate, endDate) =>
    api.get('/reports/expenses', { params: { startDate, endDate } }),
};

export const expenseService = {
  getAll: (startDate, endDate) => api.get('/expenses', { params: { startDate, endDate } }),
  getUniqueNotes: () => api.get('/expenses/notes'),
  create: (data) => api.post('/expenses', data),
  update: (id, data) => api.patch(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
};

export const backupService = {
  getAll: () => api.get('/backups'),
  create: () => api.post('/backups'),
  download: (filename) => api.get(`/backups/download/${filename}`, { responseType: 'blob' }),
  restore: (filename) => api.post(`/backups/restore/${filename}`),
  upload: (formData) => api.post('/backups/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (filename) => api.delete(`/backups/${filename}`),
};

export default api;
