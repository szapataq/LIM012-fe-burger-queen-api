const bcrypt = require('bcrypt');
const MongoLib = require('../lib/mongo');
require('dotenv').config();

const {
  isAdmin,
  isAuthenticated,
} = require('../middleware/auth');
const {
  linksPagination,
  regExpEmail,
} = require('../utils/utils');

const connector = new MongoLib();

const getUserIdOrEmail = async (req) => {
  let oneUser;

  if (regExpEmail.test(req)) {
    oneUser = await connector.getUser('users', req);
  } else {
    oneUser = await connector.get('users', req);
  }
  return oneUser;
};

module.exports = {
  getUsers: async (req, resp, next) => {
    const { page, limit } = req.query;

    try {
      const pageCurrent = parseInt(page, 10) || 1;
      const limitCurrent = parseInt(limit, 10) || 10;
      const url = `${req.protocol}://${req.get('host')}${req.path}`;

      const links = linksPagination(url, pageCurrent, limitCurrent, (await connector.getAll('users')).length);
      resp.set('link', links);

      const allUsers = await connector.pagination('users', parseInt(pageCurrent, 0), parseInt(limitCurrent, 0));
      resp.send(allUsers);
    } catch (error) {
      next(403);
    }
  },

  getOneUser: async (req, resp, next) => {
    const { uid } = req.params;

    try {
      if (isAdmin(req) && isAuthenticated(req)) {
        const oneUser = await getUserIdOrEmail(uid);
        if (!oneUser) {
          next(404);
        }
        resp.send(oneUser);
      } else if (isAuthenticated(req)) {
        const { _id, email } = req.user;
        if (uid !== String(_id) && uid !== email) {
          next(403);
        } else {
          const oneUser = await getUserIdOrEmail(uid);
          resp.send(oneUser);
        }
      }
    } catch (error) {
      next(404);
    }
  },

  createUser: async (req, resp, next) => {
    const { email, password, roles } = req.body;

    try {
      if ((!email || !password) || (password.length <= 3)) return next(400);
      const currentRol = roles ? roles.admin : false;

      // const cod = (num) => {
      //   const x = num < 1 ? 1 : num + 1;
      //   return x;
      // };

      // const agg = await connector.getMaxCod('users');
      // const { maximo: max } = await agg.next();

      const data = {
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, 10),
        roles: {
          admin: currentRol,
        },
        // cod: cod(max),
      };

      if (!regExpEmail.test(data.email)) {
        next(400);
      } else {
        const existUser = await connector.getUser('users', data.email);
        if (existUser) {
          next(403);
        } else {
          const uid = await connector.create('users', data);
          const user = await connector.get('users', uid);
          resp.send({
            _id: user._id.toString(),
            email: user.email,
            roles: user.roles,
          });
        }
      }
    } catch (error) {
      next(404);
    }
  },

  updateUser: async (req, resp, next) => {
    const data = req.body;
    const paramId = req.params.uid;
    const field = Object.keys(data);

    try {
      const oneUser = await getUserIdOrEmail(paramId);
      if (!oneUser) return next(404);

      const currentUser = await connector.get('users', req.user._id);
      delete currentUser._id;

      const noEmailNoPass = !data.email && !data.password;
      const emptyObj = Object.keys(data).length === 0;
      const nothingChanged = JSON.stringify(data) === JSON.stringify(currentUser);

      const noAdmin = !isAdmin(req);
      const notSameUserId = paramId !== String(req.user._id);
      const notSameUserEmail = paramId !== req.user.email;
      const rolesField = field.includes('roles');

      if (emptyObj) return next(400);
      if (noAdmin && (notSameUserId && notSameUserEmail)) return next(403);
      if ((noAdmin && rolesField)) return next(403);
      if (noEmailNoPass || nothingChanged) return next(400);

      if (data.password) {
        data.password = bcrypt.hashSync(data.password, 10);
      }
      if (data.email) {
        data.email = data.email.toLowerCase();
      }

      const updateUser = await connector.update('users', oneUser._id, data);
      const user = await connector.get('users', updateUser);

      if (!user) return next(404);
      resp.send(user);
    } catch (error) {
      // console.log(error);
      next(404);
    }
  },

  deleteUser: async (req, resp, next) => {
    const { uid } = req.params;
    const { _id, email } = req.user;

    try {
      if ((isAdmin(req) && isAuthenticated(req)) || (isAuthenticated(req) && (uid === String(_id)
      || uid === email))) {
        const oneUser = await getUserIdOrEmail(uid);
        await connector.deleteOne('users', oneUser._id);
        if (!oneUser) next(404);
        resp.send(oneUser);
      } else {
        next(403);
      }
    } catch (error) {
      next(404);
    }
  },
};
