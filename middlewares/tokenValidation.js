const { verifyToken } = require("../services/jwtService");

// autentificación del token dado
// MIDDLEWARE --> require de req, res, next === routes
const tokenValidation = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.slice(7);
    const { id, email, name, role } = verifyToken(token);
    req.user = { id, email, name, role };
  }
  next();
};

module.exports = tokenValidation;
