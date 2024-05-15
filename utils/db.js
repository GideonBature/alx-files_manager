// Import the necessary module
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // Retrieve the configuration from environment variables or use defaults
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB URI
    const uri = `mongodb://${host}:${port}`;

    // Create a new MongoClient
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    // Connect to the client and set the database
    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log('MongoDB connected successfully');
      })
      .catch((err) => console.error('MongoDB connection error:', err));
  }

  // Check if the MongoDB client is connected
  isAlive() {
    return this.client && this.client.isConnected();
  }

  // Asynchronously return the number of documents in the users collection
  async nbUsers() {
    try {
      return await this.db.collection('users').countDocuments();
    } catch (err) {
      console.error('Failed to count users:', err);
      return null;
    }
  }

  // Asynchronously return the number of documents in the files collection
  async nbFiles() {
    try {
      return await this.db.collection('files').countDocuments();
    } catch (err) {
      console.error('Failed to count files:', err);
      return null;
    }
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
