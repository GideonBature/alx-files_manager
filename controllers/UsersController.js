const crypto = require('crypto');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    // Input validation
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists
    const existingUser = await dbClient.db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exists' });
    }

    // Hash the password using SHA1
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    // Create new user document
    const newUser = {
      email,
      password: hashedPassword,
    };

    // Insert the user into the database
    const result = await dbClient.db.collection('users').insertOne(newUser);

    // Return the new user with only email and id
    return res.status(201).json({
      id: result.insertedId,
      email: newUser.email,
    });
  }
}

module.exports = UsersController;
