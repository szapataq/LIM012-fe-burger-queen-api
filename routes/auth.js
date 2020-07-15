const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret } = require('../config');
const MongoLib = require('../lib/mongo');

const connector = new MongoLib();

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */

  app.post('/auth', (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }
    // TODO: autenticar a la usuarix
    connector.getUser('users', email)
      .then((doc) => {
        if (!doc) {
          next(400);
        } else if (!bcrypt.compareSync(password, doc.password)) {
          next(400);
        } else {
          const token = jwt.sign({ uid: doc._id }, jwtSecret, { expiresIn: 60 * 60 * 24 });
          return resp.status(200).send({ token });
        }
      });
  });

  return nextMain();
};
