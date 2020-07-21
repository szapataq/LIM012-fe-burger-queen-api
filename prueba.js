const { MongoMemoryServer } = require('mongodb-memory-server');

const mock = async () => {
  const mongod = new MongoMemoryServer();

  const uri = await mongod.getUri();
  // const port = await mongod.getPort();
  //   const dbPath = await mongod.getDbPath();
  const dbName = await mongod.getDbName();
  console.log(uri, dbName);
};

mock();
