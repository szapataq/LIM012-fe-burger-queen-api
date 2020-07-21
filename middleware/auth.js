const jwt = require('jsonwebtoken');
const MongoLib = require('../lib/mongo');
const MongoLibMock = require('../mocks/mongoMock');
require('dotenv').config();

const connector = process.env.NODE_ENV.trim() === 'test'
  ? new MongoLibMock()
  : new MongoLib();

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }

    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
    connector.get('users', decodedToken.uid)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch(() => {
        next(403);
      });
  });
};

module.exports.isAuthenticated = (req) => {
  if (req.user) {
    // console.log(req.headers.user);
    return true;
  }
  // TODO: decidir por la informacion del request si la usuaria esta autenticada
  return false;
};

module.exports.isAdmin = (req) => {
  if (req.user.roles.admin) {
    return true;
  }
  // TODO: TODO: decidir por la informacion del request si la usuaria es admin
  return false;
};

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
