import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import { register, login } from '../services/auth.js';
import User from '../models/user.js';
import Session from '../models/session.js';
import { registerSchema, loginSchema } from '../validators/auth.js';

// Крок 3: Створення роута POST /auth/register. Контролер для реєстрації користувача.

export const registerController = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return next(createError(400, error.details[0].message));
  }

  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await register({ name, email, password: hashedPassword });

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
  } catch (error) {
    if (error.status === 409) {
      return next(createError(409, 'Email in use'));
    }
    console.error('Error during user registration:', error);
    next(createError(500, 'Internal Server Error'));
  }
};

// Крок 4: Створення роута POST /auth/login. Контролер для логіну користувача.

export const loginController = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return next(createError(400, error.details[0].message));
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(createError(401, 'Invalid email or password'));
    }

    const session = await login(user._id);

    res.cookie('refreshToken', session.refreshToken, { httpOnly: true });
    res.cookie('sessionId', session._id, { httpOnly: true });

    res.status(200).json({
      status: 200,
      message: 'Successfully logged in a user!',
      data: { accessToken: session.accessToken },
    });
  } catch (error) {
    console.error('Error during user login:', error);
    next(createError(500, 'Internal Server Error'));
  }
};

// Крок 5: Створення роута POST /auth/refresh. Контролер для оновлення токену.

export const refreshController = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(createError(401, 'Refresh token not found'));
  }

  try {
    const session = await Session.findOne({ refreshToken });

    if (!session || session.refreshTokenValidUntil < new Date()) {
      return next(createError(401, 'Invalid or expired refresh token'));
    }

    await Session.deleteMany({ userId: session.userId });

    const newSession = await login(session.userId);

    res.cookie('refreshToken', newSession.refreshToken, { httpOnly: true });
    res.cookie('sessionId', newSession._id, { httpOnly: true });

    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: { accessToken: newSession.accessToken },
    });
  } catch (error) {
    console.error('Error during refresh token process:', error);
    next(createError(500, 'Internal Server Error'));
  }
};

// Крок 6: Створення роута POST /auth/logout. Контролер для виходу користувача з системи.

export const logoutController = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return next(createError(401, 'Refresh token not found'));
  }

  try {
    const session = await Session.findOne({ refreshToken });

    if (!session) {
      return next(createError(401, 'Invalid refresh token'));
    }

    await Session.deleteMany({ userId: session.userId });

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');

    res.status(204).end();
  } catch (error) {
    console.error('Error during user logout:', error);
    next(createError(500, 'Internal Server Error'));
  }
};
