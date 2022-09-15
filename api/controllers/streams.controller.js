const Stream = require('../models/stream.model');

module.exports.list = (req, res, next) => {
  Stream.find()
    .then(streams => res.json(streams))
    .catch(error => next(error))
}
