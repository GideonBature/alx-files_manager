const sha1 = require('sha1');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Check if the email already exists in the database
    const emailExists = await dbClient.userExists(email);

    if (emailExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash the password and create the user
    const hashedPassword = sha1(password);
    const userId = await dbClient.createUser(email, hashedPassword);

    // Return the new user's email and id
    res.status(201).json({ id: userId, email });
  }
}

module.exports = UsersController;
