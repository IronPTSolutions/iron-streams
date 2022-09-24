const Stream = require('../models/stream.model');
const createError = require('http-errors');


module.exports.isOwnedByUser = (req, res, next) => {
  const { id } = req.params;
  Stream.findById(id)
    .then(stream => {
      if (stream?.owner == req.user?.id) {
        req.stream = stream;
        next();
      } else if (stream) {
        next(createError(403, 'Nooooo puedeeeees paasaaaaar'))
      } else {
        next(createError(404, 'Stream not found'))
      }
    })
    .catch(next)
}