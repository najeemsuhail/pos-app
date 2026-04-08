const UserRepository = require('../repositories/UserRepository');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

class AuthService {
  async login(username, password) {
    const user = await UserRepository.findByUsername(username);

    if (!user) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const token = generateToken(user);
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  }

  async createUser(name, role, password) {
    const existingUser = await UserRepository.findByUsername(name);
    if (existingUser) {
      throw { status: 400, message: 'User already exists' };
    }

    const hashedPassword = await hashPassword(password);
    const user = await UserRepository.create(name, role, hashedPassword);

    return {
      id: user.id,
      name: user.name,
      role: user.role,
    };
  }
}

module.exports = new AuthService();
