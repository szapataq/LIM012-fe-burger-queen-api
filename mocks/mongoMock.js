const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();
const {
  MongoClient,
  ObjectId,
} = require('mongodb');

const mongod = new MongoMemoryServer();

class MongoLibMock {
  async connect() {
    console.log(process.env.NODE_ENV); // eslint-disable-line
    if (!this.client) {
      const MONGO_URI = await mongod.getUri();
      this.client = new MongoClient(MONGO_URI, {
        useUnifiedTopology: true,
      });
    }

    if (!this.dbName) {
      const DB_NAME = await mongod.getDbName();
      this.dbName = DB_NAME;
    }

    if (!MongoLibMock.connection) {
      MongoLibMock.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          console.log('Conexión agregada Mock'); // eslint-disable-line
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLibMock.connection;
  }

  getAll(collection, query) {
    return this.connect().then((db) => db.collection(collection).find(query).toArray());
  }

  pagination(collection, page, limit, query) {
    return this.connect().then((db) => db.collection(collection)
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray());
  }

  get(collection, id) {
    return this.connect().then((db) => db.collection(collection).findOne({
      _id: ObjectId(id),
    }));
  }

  getUser(collection, email) {
    return this.connect().then((db) => db.collection(collection).findOne({ email }));
  }

  create(collection, data) {
    return this.connect()
      .then((db) => db.collection(collection).insertOne(data))
      .then((result) => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect().then((db) => db.collection(collection).updateOne({
      _id: ObjectId(id),
    }, {
      $set: data,
    }, {
      upsert: true,
    })).then((result) => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect().then((db) => db.collection(collection).updateOne({
      _id: ObjectId(id),
    }, {
      $set: { statusElem: { isActive: false } },
    }, {
      upsert: true,
    })).then((result) => result.upsertedId || id);
  }

  deleteOne(collection, id) {
    return this.connect().then((db) => db.collection(collection).deleteOne({
      _id: ObjectId(id),
    })).then(() => id);
  }
}

module.exports = MongoLibMock;
