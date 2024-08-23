import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/user.js';
import Session from '../models/session.js';

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createError(401, 'No token provided'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    const session = await Session.findOne({ accessToken: token });

    if (!user || !session) {
      return next(createError(401, 'Invalid token'));
    }

    req.user = user;
    next();
  } catch {
    next(createError(401, 'Invalid token'));
  }
};

export default authenticate;
