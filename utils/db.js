const { MongoClient } = require('mongodb');

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || 27017;
const database = process.env.MONGO_DATABASE || 'file_manager';
const url = `mongodb://${host}:${port}/${database}`;

class DbClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (client) {
        this.db = client.db(database);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      }
      if (error) {
        console.log(error);
        this.db = false;
      }
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DbClient();
module.exports = dbClient;
