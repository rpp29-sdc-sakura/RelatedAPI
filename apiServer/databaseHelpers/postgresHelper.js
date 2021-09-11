const Promise = require('bluebird');
const { Client, Pool } = require('pg');

const pool = new Pool({
  database: 'loom_related',
  port: 5432,
  max: 100000
});
pool.queryAsync = Promise.promisify(pool.query);

const getIds = (id) => {
  return pool.queryAsync(`SELECT * FROM products WHERE productid = ${id} LIMIT 1`)
    .then((result) => {
      console.log('\nQUERY SUCCESSFUL\n');
      return result.rows[0].relatedids;
    })
    .catch((err) => {
      console.log('\nQUERY FAILED\n');
      throw err;
    });
};

module.exports= {
  getIds,
  pool
};