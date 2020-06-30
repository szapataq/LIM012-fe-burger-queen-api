const jwt = require('jsonwebtoken');
const config = require('../config');
const MongoLib = require('../lib/mongo');
const { jwtScret } = require('../config');

const { secret } = config;
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
    connector.getUser('test', email)
      .then((doc) => {
        if (!doc) {
          next(400);
        } else if (password !== doc.password) {
          next(400);
        } else {
          const token = jwt.sign({ uid: doc._id }, jwtScret);
          resp.json({
            success: true,
            token,
          });
        }
      });
  });

  return nextMain();
};
