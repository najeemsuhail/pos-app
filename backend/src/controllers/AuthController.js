const AuthService = require('../services/AuthService');

class AuthController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const result = await AuthService.login(username, password);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, role, password } = req.body;

      if (!name || !role || !password) {
        return res.status(400).json({ error: 'Name, role, and password are required' });
      }

      if (!['Admin', 'Staff'].includes(role)) {
        return res.status(400).json({ error: 'Role must be Admin or Staff' });
      }

      const user = await AuthService.createUser(name, role, password);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
