// Importing the database client and a placeholder for Redis client
const dbClient = require('../utils/db');

// Assuming a Redis client has similar methods for the example
const redisClient = {
  isAlive: () => true // Placeholder function for Redis connectivity
};

class AppController {
  static async getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();
    return res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    return res.status(200).json({ users, files });
  }
}

module.exports = AppController;
