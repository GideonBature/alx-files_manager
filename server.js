// Import necessary modules
const express = require('express');
const routes = require('./routes');

// Create an Express application
const app = express();

// Use routes from the routes folder
app.use(routes);

// Get the port from the environment and store in Express
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
