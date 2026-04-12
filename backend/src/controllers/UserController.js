const UserRepository = require('../repositories/UserRepository');
const { hashPassword, comparePassword } = require('../utils/auth');

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

  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword, confirmPassword, userId } = req.body;
      const currentUser = req.user;

      // If userId is provided and different from currentUser.id, it's a reset by Admin
      const targetId = userId || currentUser.id;
      const isSelf = targetId == currentUser.id;

      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters' });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      const user = await UserRepository.findById(targetId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Security check: Only require old password if changing OWN password
      // Admins can reset anyone's password without the old one
      if (isSelf) {
        if (!oldPassword) {
          return res.status(400).json({ error: 'Current password is required' });
        }
        
        // Use a separate findUnique to get the HASHED password for comparison
        // mapUser usually removes it
        const userWithPass = await require('../db/prisma').user.findUnique({
          where: { id: Number(targetId) }
        });

        const isValid = await comparePassword(oldPassword, userWithPass.password);
        if (!isValid) {
          return res.status(401).json({ error: 'Incorrect current password' });
        }
      } else {
        // Only Admins can reset other people's passwords
        if (currentUser.role !== 'Admin') {
          return res.status(403).json({ error: 'Only admins can reset other passwords' });
        }
      }

      const hashedPassword = await hashPassword(newPassword);
      await UserRepository.updatePassword(targetId, hashedPassword);

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
