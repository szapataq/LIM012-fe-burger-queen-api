// const bcrypt = require('bcrypt');
const MongoLib = require('../lib/mongo');
// const {
//   isAdmin,
//   isAuthenticated,
// } = require('../middleware/auth');
const {
  linksPagination,
} = require('../utils/utils');

const connector = new MongoLib();

module.exports = {
  getAllOrders: async (req, resp) => {
    const {
      query,
    } = req;
    const allOrders = query
      ? await connector.pagination('orders', parseInt(query.limit, 0), parseInt(query.page, 0))
      : await connector.getAll('orders');
    // console.log(req.get('Referer'));

    const links = linksPagination(req.get('Referer'), query.limit, query.page, (await connector.getAll('orders')).length);
    resp.set(links);
    resp.send(allOrders);
  },

};
