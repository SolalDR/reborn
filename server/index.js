if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv').config();
}

// Set options as a parameter, environment variable, or rc file.
require = require("esm")(module/*, options*/)
module.exports = require("./main.js")

