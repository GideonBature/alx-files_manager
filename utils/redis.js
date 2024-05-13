import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Promisify Redis client methods
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.setex).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);

    // Display any errors from the redis client
    this.client.on('error', (error) => {
      console.error(`Redis client error: ${error.message}`);
    });
  }

  /**
     * Checks if connection to Redis is alive
     * @returns {boolean} True if connection is alive, otherwise false
     */
  isAlive() {
    return this.client.connected;
  }

  /**
     * Get the value corresponding to the provided key from Redis
     * @param {string} key - The key to search for in Redis
     * @returns {Promise<string|null>} The value of the key, or null if key does not exist
     */
  async get(key) {
    try {
      const value = await this.getAsync(key);
      return value;
    } catch (error) {
      console.error(`Error getting value from Redis: ${error.message}`);
      return null;
    }
  }

  /**
     * Set a key-value pair in Redis with an expiration time
     * @param {string} key - The key to be saved in Redis
     * @param {string} value - The value to be assigned to the key
     * @param {number} duration - The TTL (time to live) of the key in seconds
     * @returns {Promise<void>} Promise resolved after the operation is completed
     */
  async set(key, value, duration) {
    try {
      await this.setAsync(key, duration, value);
    } catch (error) {
      console.error(`Error setting value in Redis: ${error.message}`);
    }
  }

  /**
     * Delete a key from Redis
     * @param {string} key - The key to be deleted
     * @returns {Promise<void>} Promise resolved after the operation is completed
     */
  async del(key) {
    try {
      await this.delAsync(key);
    } catch (error) {
      console.error(`Error deleting key from Redis: ${error.message}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
