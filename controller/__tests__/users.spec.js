const { createUser } = require('../users');

describe('POST/users', () => {
  it('should create a new user', async (done) => {
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
    await createUser(req, resp, next);
  });

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

// const { resp, next } = require('./utils/mock-test');

// describe('create user', () => {
//   test('deberia crear un usuario', (done) => {
//     const req = {
//       body: { email: 'sandra@gmail.com', password: 'qwerty' },
//     };

//     const res = {
//       status: (value) => { console.log('status', value); },
//       send: (value) => { console.log('send', value); },
//     };

//     const next = (value) => { expect(data.name).toBe(dataExpect.name); };

//     const dataExpect = {
//       email: 'sandra@gmail.com',
//       password: 'querty',
//     };

//     createUser(req, res, next);
//   });
// });
