if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mount = require('esm')(module);

module.exports = mount('./main.js');
