// This config file will load our env.jest test environment variables
// and set various options for how the tests will run

// Get the full path to our env.jest file
const path = require('path');
const envFile = path.join(__dirname, 'env.jest');

// Read the environment variables we use for Jest from our env.jest file
require('dotenv').config({ path: envFile });

// Log a message to remind developers how to see more detail from log messages
console.log(`Using LOG_LEVEL=${process.env.LOG_LEVEL}. Use 'debug' in env.jest for more detail`);

// Set our Jest options, see https://jestjs.io/docs/configuration
module.exports = {
  verbose: true,
  testTimeout: 5000,
};
// Tried to test .env file for index.js
// module.exports = {   setupFiles: ['dotenv/config'] }
