// const { MongoMemoryServer } = require('mongodb-memory-server');
const { createUser, getOneUser } = require('../users');
// const initDb = require('../../db-data/connect_db');

// beforeAll((done) => {
//   const mongod = new MongoMemoryServer();
//   mongod.getConnectionString().then((url) => {
//     // process.env.DB_URL = url;
//     initDb(url)
//       .then(() => {
//         console.log('db configurada exitosamente');
//         done();
//       })
//     // eslint-disable-next-line no-unused-vars
//       .catch((e) => {
//         console.error('db ERROR');
//         done();
//       });
//   });
// });

describe('createUsers', () => {
  it('should create users', (done) => {
    const user = {
      email: 'tester@test',
      roles: {
        admin: false,
      },
    };
    const req = {
      body: {
        email: 'tester@test',
        password: 'querty',
        roles: {
          admin: false,
        },
      },
    };
    const res = {
      send(result) {
        expect(result.email).toStrictEqual(user.email);
        done();
      },
    };
    const next = (code) => code;
    createUser(req, res, next);
  });
});

describe('POST/users', () => {
  it('should show an error 400 if not send email', (done) => {
    const req = {
      body: {
        email: '',
        password: '123456',
        roles: {
          admin: false,
        },
      },
    };
    const next = (code) => {
      expect(code).toBe(400);
      done();
    };
    createUser(req, {}, next);
  });

  it('should show an error 400 if not send password', (done) => {
    const req = {
      body: {
        email: 'sama@gmail.com',
        password: '',
        roles: {
          admin: false,
        },
      },
    };
    const next = (code) => {
      expect(code).toBe(400);
      done();
    };
    createUser(req, {}, next);
  });

  it('should respond with 400 when email and password missing', (done) => {
    const req = {
      body: {
        email: '',
        password: '',
        roles: {
          admin: false,
        },
      },
    };
    const next = (code) => {
      expect(code).toBe(400);
      done();
    };
    createUser(req, {}, next);
  });

  it('should fail with 400 when invalid email', (done) => {
    const req = {
      body: {
        email: 'failmail',
        password: '123456',
        roles: {
          admin: false,
        },
      },
    };
    const next = (code) => {
      expect(code).toBe(400);
      done();
    };
    createUser(req, {}, next);
  });

  it('should fail with 400 when invalid password', (done) => {
    const req = {
      body: {
        email: 'email@test.tes',
        password: '12',
        roles: {
          admin: false,
        },
      },
    };
    const next = (code) => {
      expect(code).toBe(400);
      done();
    };
    createUser(req, {}, next);
  });

  it('should create a new user', (done) => {
    const req = {
      body: {
        email: 'test1@test.com',
        password: '123456',
        roles: {
          admin: false,
        },
      },
    };
    const resp = {
      send: (response) => {
        expect(response.email).toBe('test1@test.com');
        expect(response.roles.admin).toBe(false);
        done();
      },
    };
    const next = (code) => code;
    createUser(req, resp, next);
  });
  it('should create a new admin user', (done) => {
    const req = {
      body: {
        email: 'test2@test.com',
        password: '123456',
        roles: {
          admin: true,
        },
      },
    };
    const resp = {
      send: (response) => {
        expect(response.email).toBe('test2@test.com');
        expect(response.roles.admin).toBe(true);
        done();
      },
    };
    const next = (code) => code;
    createUser(req, resp, next);
  });
});

describe('GET/users/uid', () => {
  it('should show an error 400 if user is not exists', (done) => {
    const req = {
      params: {
        uid: 'user@test.com',
      },
    };

    const next = (code) => {
      expect(code).toBe(404);
      done();
    };
    getOneUser(req, {}, next);
  });

  it('should getUsersById', async (done) => {
    const user = {
      email: 'test1@test.com',
      role: {
        admin: true,
      },
    };
    const req = {
      headers: {
        autorization: '',
      },
      user: {
        email: 'test1@test.com',
        password: '123456',
        role: {
          admin: false,
        },
      },
      params: {
        uid: 'test1@test.com',
      },
    };
    const resp = {
      send(result) {
        expect(result.email).toBe(user.email);
        done();
      },
    };
    const next = (code) => code;
    await getOneUser(req, resp, next);
  });

  // it('should get an user', (done) => {
  //   console.log('entra aqui');
  //   const req = {
  //     params: {
  //       uid: '5f349a5e6dd0f62558332a09',
  //     },
  //   };
  //   const resp = {
  //     send: (response) => {
  //       console.log('respuesta de send', response);
  //       expect(response._id).toBe('5f349a5e6dd0f62558332a09');
  //       expect(response.roles.admin).toBe(false);
  //       done();
  //     },
  //   };
  //   const next = (code) => code;
  //   getOneUser(req, resp, next);
  // });
});
