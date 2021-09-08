const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

const dataDir = path.join(__dirname, 'data');

const readFileAsync = Promise.promisify(fs.readFile);
const writeFileAsync = Promise.promisify(fs.writeFile);

const baseName = ['productid', 'productId'];
const relatedName = ['relatedids', 'relatedIds'];

//converts txt to json
const convertRawDataToJSON = (filename, camelCase = true) => {
  readFileAsync(path.join(dataDir, `${filename}.txt`), 'utf8')
    .then((data) => {
      return data.split('\n')
        .map(x => x.split(',').slice(1).map(x => Number(x)))
        .reduce((acc, entry, i) => {
          if (acc.length > 0 && acc[acc.length - 1][baseName[Number(camelCase)]] === entry[0]) {
            acc[acc.length - 1][relatedName[Number(camelCase)]].push(entry[1]);
          } else {
            if (camelCase) {
              acc.push({productId: entry[0], relatedIds: [entry[1]]});
            } else {
              acc.push({productid: entry[0], relatedids: [entry[1]]});
            }
          }
          return acc;
        }, []);
    })
    .then((cleanData) => {
      writeFileAsync(path.join(dataDir, `${camelCase ? filename : filename + 'Flat'}.json`), JSON.stringify(cleanData))
        .then((result) => {
          console.log('write successful');
        })
        .catch((err) => {
          console.log('write failed\n', err);
        })
    })
    .catch((err) => {
      return 'error occured';
    })
};
