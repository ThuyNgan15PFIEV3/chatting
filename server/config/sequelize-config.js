require("babel-core/register");
require("babel-polyfill");
const config = require('./db-config.json');

module.exports = {
    development: config,
    production: config
};