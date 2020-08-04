// const MongoLibMock = require('../../mocks/mongoMock');

// const connect = new MongoLibMock();
const {
  // getProducts,
  // getOneProduct,
  createProduct,
  // updateProduct,
  // deleteProduct
} = require('../products');

describe('Deberia crear Productos', () => {
  test('probando crear un producto', async () => {
    const req = {
      body: { name: 'salchipapa', price: 5 },
    };

    const res = {
      status: (value) => { console.log(value) },
      send: (value) => { console.log(value) },
    };

    const next = (value) => { console.log(value) };

    const dataExpect = {
      name: 'salchipapa',
      price: 5,
      image: null,
      type: null,
      dateEntry: '2020-07-23T14:56:35.672Z',
      statusElem: {
        isActive: true,
      },
    };

    await createProduct(req, res, next).then((data) => {
      console.log(data, 'ESTO ES LO QUE RECIBO');
      expect(data.name).toBe(dataExpect.name);
    });
  });
});

// const reqGetElems = {
//   query: {
//     limit: 10,
//     page: 1,
//   },
// };
// const respGetElems = {

// };

// describe('get all products', () => {
//   test('should get users collection', async () => {
//     const products = connect.getProducts(reqGetElems.query, );
//     await getProducts(path).then((data) => {
//       expect(data.length).toBeGreaterThan(0);
//     });
//   });
// });
