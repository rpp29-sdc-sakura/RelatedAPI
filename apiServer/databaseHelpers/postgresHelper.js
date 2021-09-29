const Promise = require('bluebird');
const { Client, Pool } = require('pg');

const pool = new Pool({
  database: 'loom_related',
  port: 5432,
  max: 450
});
pool.queryAsync = Promise.promisify(pool.query);

const getIds = (id) => {
  return pool.queryAsync(`SELECT * FROM products WHERE productid = ${id} LIMIT 1`);
};

module.exports= {
  getIds,
  pool
};