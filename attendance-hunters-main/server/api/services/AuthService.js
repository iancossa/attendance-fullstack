const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Staff = require('../models/Staff');
const Student = require('../models/Student');

class AuthService {
  static async login(email, password) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Get role-specific data
    let roleData = null;
    if (user.role === 'admin') {
      roleData = await Admin.findByUserId(user.id);
    } else if (user.role === 'staff') {
      roleData = await Staff.findByUserId(user.id);
    } else if (user.role === 'student') {
      roleData = await Student.findByUserId(user.id);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, roleId: roleData?.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    await User.updateLastLogin(user.id);

    const { password: _, ...userWithoutPassword } = user;
    return { 
      token, 
      user: { ...userWithoutPassword, roleData }
    };
  }

  static async register(userData) {
    const existingUser = await User.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = AuthService;