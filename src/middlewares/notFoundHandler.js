import createError from 'http-errors';

function notFoundHandler(req, res, next) {
    next(createError(404, 'Route non found'));
}

export default notFoundHandler;