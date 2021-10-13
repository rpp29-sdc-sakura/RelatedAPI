const {Sequelize, Model, Datatypes} = require('sequelize');
const processedData = require('./data/rawDataFlat.json');

const db = new Sequelize({
  database: 'loom_related',
  host: 'ec2-54-146-195-234.compute-1.amazonaws.com',
  username: 'postgres',
  port: 5432,
  dialect: 'postgres'
});

const Products = db.define('products', {
  productid: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  relatedids: Sequelize.ARRAY(Sequelize.INTEGER)
}, {
  timestamps: false
});

Products.bulkCreate(processedData, {fields: ['productid', 'relatedids']})
  .then(() => {
    console.log('insertion successful');
  })
  .catch((err) => {
    console.log(err, '\nUNSUCCESSFUL');
  })