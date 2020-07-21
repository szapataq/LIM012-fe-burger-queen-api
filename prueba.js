const MongoLib = require('./lib/mongo');

const connector = new MongoLib();
// algo.connect(); // ? probar conexion

// const data = {
//   email: 'test@devlaboratoria.com',
//   password: '123456',
// };

// ? creando registro
// connector.create('', data)
//   .then(console.log);

// ? leyendo todos los registros
// connector.getAll('test', { email: 'test@test.com' })
//   .then(console.log);

// ? leyendo un registro
// connector.getUser('test', 'Sandra@unsa.edu.com')
//   .then(console.log);

// ? actualizando un registro
// connector.update('test', '5ef7965690a45c1b3859a132', { email: 'test@laboratoria.com' })
//   .then(console.log);

// ? eliminando un registro
// connector.delete('test', '5ef7965690a45c1b3859a132')
//   .then(console.log);

// ? paginación
// connector.pagination('users', 3, 2)
//   .then(console.log);

// ? consultando el máximo
// connector.getMaxCod('users')
//   .then(async (res) => {

//     const { maximo } = await res.next();
//     connector.close();
//     console.log(maximo);
//   });
