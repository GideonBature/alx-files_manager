const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}/`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect((err) => {
      if (err) console.error(err);
      this.db = this.client.db(database);
      console.log('Connected to MongoDB');
    });
  }

  isAlive() {
    return !!this.client && !!this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }

  async userExists(email) {
    const count = await this.db.collection('users').countDocuments({ email });
    return count > 0;
  }

  async createUser(email, password) {
    const result = await this.db.collection('users').insertOne({ email, password });
    return result.insertedId;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
