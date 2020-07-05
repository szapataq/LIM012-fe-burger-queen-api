const bcrypt = require('bcrypt');
const MongoLib = require('../lib/mongo');

const connector = new MongoLib();

module.exports = {
  getUsers: async (req, resp, next) => {
    const allUsers = await connector.getAll('users')
    resp.send(allUsers);
    // next();
  },

  getOneUser: async (req, resp) => {
    const paramId = req.params.uid;
    const oneUser = await connector.get('users', paramId);
    resp.send(oneUser);
  },

  createUser: async (req, resp, next) => {
    const data = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      roles: req.body.roles,
    };
    const uid = await connector.create('users', data);
    const user = await connector.get('users', uid);
    resp.status(201).send(user);
  },

  updateUser: async (req, resp) => {
    const paramId = req.params.uid;
    const data = {
      email: req.body.email,
      password: req.body.password,
      roles: req.body.roles,
    };
    const uid = await connector.update('users', paramId, data);
    const user = await connector.get('users', uid);
    resp.send(user);
  },

  deleteUser: async (req, resp, next) => {
    const paramId = req.params.uid;
    const user = await connector.get('users', paramId);
    await connector.delete('users', paramId);
    resp.send(user);
  },
};
