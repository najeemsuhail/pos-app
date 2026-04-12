const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');
const licenseRoutes = require('./routes/licenseRoutes');
const backupRoutes = require('./routes/backupRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errorHandler');
const { desktopUploadsDir } = require('./db/paths');

const app = express();
const staticDir = path.resolve(__dirname, '../../public');
const legacyFrontendBuildDir = path.resolve(__dirname, '../../frontend/build');
const frontendBuildPath = fs.existsSync(staticDir) ? staticDir : legacyFrontendBuildDir;
const hasFrontendBuild = fs.existsSync(frontendBuildPath);

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(desktopUploadsDir));

if (hasFrontendBuild) {
  app.use(express.static(frontendBuildPath));
}

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/license', licenseRoutes);
app.use('/api/backups', backupRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (hasFrontendBuild) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }

    return res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

app.use(errorHandler);

module.exports = app;
