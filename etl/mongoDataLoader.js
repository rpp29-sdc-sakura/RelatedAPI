const mongoose = require('mongoose');
const processedData = require('./data/rawData.json');
mongoose.connect('mongodb://127.0.0.1/loom_related', {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new mongoose.Schema({
  productId: Number,
  relatedIds: Array
});

const Product = mongoose.model('Product', productSchema);

const bulkLoad = (data) => {
  Product.collection.insertMany(data, {ordered: true})
    .then((result) => {
      console.log('\n\n\nLOAD SUCCESSFUL\n' ,result);
    })
    .catch((err) => {
      console.log('\n\n\nLOAD FAILED\n' ,err);
    });
};

bulkLoad(processedData);