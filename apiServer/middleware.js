const getParser = (req, res, next) => {
  // console.log('middleware recieved:\n\n', req);
  req.body = {
    productId: Number(req.url.slice(req.url.indexOf('=') + 1)),
    productid: Number(req.url.slice(req.url.indexOf('=') + 1))
  }
  next();
}

module.exports = {
  getParser
}