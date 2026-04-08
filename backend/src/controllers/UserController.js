const UserRepository = require('../repositories/UserRepository');

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await UserRepository.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserRepository.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const currentUser = req.user; // From auth middleware

      if (currentUser.id == id) {
        return res.status(400).json({ error: 'Cannot delete your own account' });
      }

      const user = await UserRepository.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await UserRepository.delete(id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
