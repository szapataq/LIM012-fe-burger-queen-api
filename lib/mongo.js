const {
  MongoClient,
  ObjectId,
} = require('mongodb');
const config = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          console.log('Conexión agregada');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
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

module.exports = MongoLib;
