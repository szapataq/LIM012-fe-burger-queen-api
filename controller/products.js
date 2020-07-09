const MongoLib = require('../lib/mongo');
const {
  linksPagination,
} = require('../utils/utils');

const connector = new MongoLib();

module.exports = {
  // @code {401} si no hay cabecera de autenticación - sale cuando intento
  // ver los productos sin ser admin.
  getProducts: async (req, resp, next) => {
    try {
      const { query } = req;
      const allProducts = query
        ? await connector.pagination('products', parseInt(query.limit, 0), parseInt(query.page, 0))
        : await connector.getAll('products');

      const links = linksPagination(req.get('Referer'), query.limit, query.page, (await connector.getAll('products')).length);
      resp.set(links);
      resp.send(allProducts);
    } catch (error) {
      next(401);
    }
  },
  // @code {401} si no hay cabecera de autenticación - sale cuando intento
  // ver los productos sin ser admin.
  getOneProduct: async (req, resp, next) => {
    try {
      const paramId = req.params.productId;
      const oneProduct = await connector.get('products', paramId);
      if (!oneProduct) return next(404);
      resp.send(oneProduct);
    } catch (error) {
      next(404);
    }
  },

  createProduct: async (req, resp, next) => {
    try {
      const { name, price } = req.body;

      if (!name || !price) return next(400);

      const data = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        type: req.body.type,
        dateEntry: new Date(),
        status: {
          isActive: true,
        },
      };

      const id = await connector.create('products', data);
      const product = await connector.get('products', id);
      resp.status(201).send(product);
    } catch (error) {
      next(401);
    }
  },

  // {400} si no se indican ninguna propiedad a modificar
  updateProduct: async (req, resp, next) => {
    try {
      const paramId = req.params.productId;
      const data = {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        type: req.body.type,
        dateEntry: new Date(),
      };

      const productId = await connector.update('products', paramId, data);
      const product = await connector.get('products', productId);

      if (!product) return next(404);
      resp.send(product);
    } catch (error) {
      next(404);
    }
  },
  deleteProduct: async (req, resp, next) => {
    try {
      const paramId = req.params.productId;
      const product = await connector.get('products', paramId);
      await connector.delete('products', paramId);
      if (!product) return next(404);
      resp.send(product);
    } catch (error) {
      next(404);
    }
  },
};
