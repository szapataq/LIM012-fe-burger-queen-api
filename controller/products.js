const MongoLib = require('../lib/mongo');
require('dotenv').config();

const {
  linksPagination,
} = require('../utils/utils');

const connector = new MongoLib();

module.exports = {
  getProducts: async (req, resp, next) => {
    const { query } = req;

    const internalQuery = {
      statusElem: { isActive: true },
    };

    try {
      const allProducts = query
        ? await connector.pagination('products', parseInt(query.page, 0), parseInt(query.limit, 0), internalQuery)
        : await connector.getAll('products', internalQuery);

      const links = linksPagination(req.get('Referer'), query.page, query.limit, (await connector.getAll('products')).length);
      resp.set(links);
      resp.send(allProducts);
    } catch (error) {
      next(401);
    }
  },

  getOneProduct: async (req, resp, next) => {
    const paramId = req.params.productId;

    try {
      const oneProduct = await connector.get('products', paramId);
      if (!oneProduct || !oneProduct.statusElem.isActive) return next(404);
      resp.send(oneProduct);
    } catch (error) {
      next(404);
    }
  },

  createProduct: async (req, resp, next) => {
    const {
      name,
      price,
      image,
      type,
    } = req.body;

    try {
      if (!name || !price || (typeof (price) !== 'number')) return next(400);

      const data = {
        name,
        price,
        image,
        type,
        dateEntry: new Date(),
        statusElem: {
          isActive: true,
        },
      };

      const id = await connector.create('products', data);
      const product = await connector.get('products', id);
      resp.status(200).send(product);
    } catch (error) {
      next(401);
    }
  },

  updateProduct: async (req, resp, next) => {
    const data = req.body;
    const paramId = req.params.productId;

    try {
      const prod = await connector.get('products', paramId);
      delete prod._id;

      if (Object.keys(data).length === 0
      || JSON.stringify(data) === JSON.stringify(prod)
      || (typeof (data.price) !== 'number')) return next(400);

      const productId = await connector.update('products', paramId, data);
      const product = await connector.get('products', productId);

      if (!product) return next(404);
      resp.send(product);
    } catch (error) {
      next(404);
    }
  },

  deleteProduct: async (req, resp, next) => {
    const paramId = req.params.productId;

    try {
      const product = await connector.get('products', paramId);
      await connector.delete('products', paramId);
      if (!product || !product.statusElem.isActive) return next(404);
      resp.send(product);
    } catch (error) {
      next(404);
    }
  },
};
