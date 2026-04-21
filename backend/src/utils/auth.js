const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.username,
      role: user.role,
      feature_access_overrides: user.feature_access_overrides || {},
    },
    process.env.JWT_SECRET || 'pos-app-local-secret',
    { expiresIn: process.env.JWT_EXPIRY || '7d' }
  );
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { generateToken, hashPassword, comparePassword };
