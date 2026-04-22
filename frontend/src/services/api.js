import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

// 10 second timeout for all requests
const REQUEST_TIMEOUT = 10000;

const api = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
});

// Map to track abort controllers for cancellation
const abortControllers = new Map();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Create abort controller for this request
  const controller = new AbortController();
  const requestKey = `${config.method}:${config.url}`;
  abortControllers.set(requestKey, controller);
  config.signal = controller.signal;
  
  return config;
});

api.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.method}:${response.config.url}`;
    abortControllers.delete(requestKey);
    return response;
  },
  (error) => {
    if (error.config) {
      const requestKey = `${error.config.method}:${error.config.url}`;
      abortControllers.delete(requestKey);
    }
    return Promise.reject(error);
  }
);

// Helper to cancel all pending requests
export const cancelAllRequests = () => {
  abortControllers.forEach(controller => controller.abort());
  abortControllers.clear();
};

// Helper to cancel requests for a specific pattern
export const cancelRequestsByPattern = (pattern) => {
  const keysToDelete = [];
  abortControllers.forEach((controller, key) => {
    if (key.includes(pattern)) {
      controller.abort();
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach(key => abortControllers.delete(key));
};

export const authService = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  register: (name, role, password, featureAccessOverrides = {}) =>
    api.post('/auth/register', { name, role, password, featureAccessOverrides }),
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
  create: (data = {}) => api.post('/orders', data),
  getById: (id) => api.get(`/orders/${id}`),
  getActiveTables: () => api.get('/orders/tables/active'),
  addItem: (orderId, data) => api.post(`/orders/${orderId}/items`, data),
  updateItem: (orderId, itemId, quantity) => api.patch(`/orders/${orderId}/items/${itemId}`, { quantity }),
  removeItem: (orderId, itemId) => api.delete(`/orders/${orderId}/items/${itemId}`),
  getItems: (orderId) => api.get(`/orders/${orderId}/items`),
  syncItems: (orderId, items) => api.put(`/orders/${orderId}/sync-items`, { items }),
  finalize: (orderId, data) => api.post(`/orders/${orderId}/finalize`, data),
  pay: (orderId, payments) => api.post(`/orders/${orderId}/payments`, { payments }),
  settlePayment: (orderId, paymentId, data) => api.post(`/orders/${orderId}/payments/${paymentId}/settle`, data),
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

export const userService = {
  getAll: () => api.get('/users'),
  delete: (id) => api.delete(`/users/${id}`),
  changePassword: (data) => api.post('/users/change-password', data),
  updateFeatureAccess: (id, featureAccessOverrides) =>
    api.patch(`/users/${id}/feature-access`, { featureAccessOverrides }),
};

export const adminService = {
  resetDatabase: () => api.post('/admin/reset-database'),
};

export const settingService = {
  getAll: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
  updateLegacy: (data) => api.post('/settings', data),
};

export const syncService = {
  getStatus: () => api.get('/sync/status'),
  getConfig: () => api.get('/sync/config'),
  updateConfig: (data) => api.put('/sync/config', data),
  runNow: (fullResync = false) => api.post('/sync/run', { fullResync }),
};

export default api;
