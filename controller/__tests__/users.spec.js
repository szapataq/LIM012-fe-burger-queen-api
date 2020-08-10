const {
  getUsers,
  createUser,
} = require('../users');
|
describe('create user', () => {
  test('deberia crear un usuario', (done) => {
    const req = {
      body: { email: 'sandra@gmail.com', password: 'qwerty' },
    };

    const res = {
      status: (value) => { console.log('status', value); },
      send: (value) => { console.log('send', value); },
    };

    const next = (value) => { expect(data.name).toBe(dataExpect.name); };

    const dataExpect = {
      email: 'sandra@gmail.com',
      password: 'querty',
    };

    createUser(req, res, next);
  });
});
