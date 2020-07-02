const MongoLib = require('../lib/mongo');

const connector = new MongoLib();

module.exports = {
  getUsers: async (req, resp, next) => {
    const allUsers = await connector.getAll('users');
    resp.send(allUsers);
    // next();
  },
};
