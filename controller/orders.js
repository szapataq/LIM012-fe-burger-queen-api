const MongoLib = require('../lib/mongo');

const {
  linksPagination,
} = require('../utils/utils');

const connector = new MongoLib();

module.exports = {
  getAllOrders: async (req, resp, next) => {
    try {
      const { query } = req;
      const allOrders = query
        ? await connector.pagination('orders', parseInt(query.limit, 0), parseInt(query.page, 0))
        : await connector.getAll('orders');
      // console.log(req.get('Referer'));

      const links = linksPagination(req.get('Referer'), query.limit, query.page, (await connector.getAll('orders')).length);
      resp.set(links);
      resp.send(allOrders);
    } catch (error) {
      next(401);
    }
  },

  getOneOrder: async (req, resp, next) => {
    const paramId = req.params.orderId;
    try {
      const oneOrder = await connector.get('orders', paramId);
      if (!oneOrder) return next(404);
      resp.send(oneOrder);
    } catch (error) {
      next(404);
    }
  },

  createOrder: async (req, resp, next) => {
    const { products, client } = req.body;

    try {
      if (products.length === 0) return next(400);
      // si no se indica id del usuario autenticado.

      const data = {
        userId: req.user._id,
        client,
        products: await Promise.all(products.map((objProduct) => connector
          .get('products', objProduct.product._id)
          .then((prod) => ({ qty: objProduct.qty, prod })))),
        status: 'pending',
        dateEntry: new Date(),
        dateProcessed: '',
        statusElem: {
          isActive: true,
        },
      };

      const orderId = await connector.create('orders', data);
      const newOrder = await connector.get('orders', orderId);
      resp.status(200).send(newOrder);
    } catch (error) {
      next(400);
    }
  },

  updateOrder: async (req, resp, next) => {
    const data = req.body;
    const paramId = req.params.orderId;

    try {
      const order = await connector.get('orders', paramId);
      delete order._id;

      const statusOrder = ['pending', 'canceled', 'delivering', 'delivered'];

      if (Object.keys(data).length === 0
      || JSON.stringify(data) === JSON.stringify(order)
      || !statusOrder.includes(data.status)) return next(400);

      const orderId = await connector.update('orders', paramId, data);
      const ord = await connector.get('orders', orderId);

      if (!ord) return next(404);
      resp.send(ord);
    } catch (error) {
      next(404);
    }
  },

  deleteOrder: async (req, resp, next) => {
    const paramId = req.params.orderId;
    try {
      const order = await connector.get('orders', paramId);
      await connector.delete('orders', paramId);
      if (!order) return next(404);
      resp.send(order);
    } catch (error) {
      next(404);
    }
  },
};
