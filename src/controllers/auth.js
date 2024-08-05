import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { register, login } from '../services/auth.js';
import User from '../models/user.js';
import Session from '../models/session.js';

// Крок 3: Створення роута POST /auth/register. Контролер для реєстрації користувача.

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw createError(400, 'Missing required fields');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await register({ name, email, password: hashedPassword });

  if (!user) {
    throw createError(409, 'Email in use');
  }

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};

// Крок 4: Створення роута POST /auth/login. Контролер для логіну користувача.

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError(400, 'Missing required fields');
  }

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError(401, 'Invalid email or password');
  }

  const session = await login(user._id);

  res.cookie('refreshToken', session.refreshToken, { httpOnly: true });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

// Крок 5: Створення роута POST /auth/refresh. Контролер для оновлення токену.

export const refreshController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createError(401, 'Refresh token not found');
  }

  const session = await Session.findOne({ refreshToken });

  if (!session || session.refreshTokenValidUntil < new Date()) {
    throw createError(401, 'Invalid or expired refresh token');
  }

  await Session.deleteMany({ userId: session.userId });

  const newSession = await login(session.userId);

  res.cookie('refreshToken', newSession.refreshToken, { httpOnly: true });

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: newSession.accessToken },
  });
};

// Крок 6: Створення роута POST /auth/logout. Контролер для виходу користувача з системи.

export const logoutController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createError(401, 'Refresh token not found');
  }

  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw createError(401, 'Invalid refresh token');
  }

  await Session.deleteMany({ userId: session.userId });

  res.status(204).end();
};
