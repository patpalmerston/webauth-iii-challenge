const knex = require('knex');
const knexConfig = ('../knexfile.js');

module.exports = knex(knexConfig.development);