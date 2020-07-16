const bcrypt = require('bcrypt');
const MongoLib = require('../lib/mongo');
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
    const {
      query,
    } = req;

    try {
      const allUsers = query
        ? await connector.pagination('users', parseInt(query.limit, 0), parseInt(query.page, 0))
        : await connector.getAll('users');
        // console.log(req.get('Referer'));

      const links = linksPagination(req.get('Referer'), query.limit, query.page, (await connector.getAll('users')).length);
      resp.set(links);
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
    const {
      email,
      password,
      roles,
    } = req.body;

    try {
      if (!email || !password || password.length < 6) return next(400);

      let currentRol;

      if (roles) {
        currentRol = roles.admin;
      } else {
        currentRol = false;
      }

      const data = {
        email: req.body.email.toLowerCase(),
        password: bcrypt.hashSync(password, 10),
        roles: {
          admin: currentRol,
        },
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
          resp.status(200).send(user);
        }
      }
    } catch (error) {
      next(403);
    }
  },

  updateUser: async (req, resp, next) => {
    const { uid } = req.params;

    try {
      if (isAdmin(req) && isAuthenticated(req)) {
        const oneUser = await getUserIdOrEmail(uid);

        const {
          email,
          password,
        } = req.body;
        if (!email || !password) {
          next(400);
        }
        const data = {
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          roles: req.body.roles,
        };
        const updateUser = await connector.update('users', oneUser._id, data);
        const user = await connector.get('users', updateUser);
        if (!user) {
          next(404);
        }
        resp.send(user);
      } else if (isAuthenticated(req)) {
        const { uid } = req.params;
        const { _id, email } = req.user;
        if (uid !== String(_id) && uid !== email) next(403);

        const oneUser = await getUserIdOrEmail(uid);
        const data = { password: bcrypt.hashSync(req.body.password, 10) };
        const updateUser = await connector.update('users', oneUser._id, data);
        const user = await connector.get('users', updateUser);
        if (!user) next(404);
        resp.send(user);
      } else {
        next(403);
      }
    } catch (error) {
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
