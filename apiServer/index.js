const express = require('express');
const { getParser } = require('./middleware.js');
const db = require('./databaseHelpers/postgresHelper.js');

const app = express();
const PORT = 7778;
app.listen(PORT, () => { console.log(`API server now listening on port ${PORT}...`); });

app.use(getParser);

app.get('/', (req, res) => {
  console.log('body recieved: ', JSON.stringify(req.body));
  db.getIds(req.body.productId)
    .then((relatedIds) => {
      res.send(relatedIds);
    })
    .catch(() => {
      res.status(500).end();
    });
});