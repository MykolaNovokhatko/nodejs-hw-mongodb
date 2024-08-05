import User from '../models/user.js';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import Session from '../models/session.js';

// Крок 3: Створення роута POST /auth/register. Створення сервісу.

export const register = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createError(409, 'Email in use');
  }

  const user = new User({ name, email, password });

  await user.save();

  return user;
};

// Крок 4: Створення роута POST /auth/login. Створення сервісу.

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const login = async (userId) => {
  await Session.deleteMany({ userId });

  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  const session = new Session({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  await session.save();

  return session;
};
