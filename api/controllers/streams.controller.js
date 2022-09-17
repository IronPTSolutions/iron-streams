const Stream = require("../models/stream.model");

module.exports.list = (req, res, next) => {
  Stream.find()
    .then((streams) => res.json(streams))
    .catch((error) => next(error));
};
const data = { title, description, author, url, views, category, duration, thumbnail, private } = req.body
module.exports.create = (req, res, next) => {
  Stream.create(data)
    .then(stream => res.status(200).json(stream))
    .catch(next)
};

module.exports.detail = (req, res, next) => {
  Stream.findById(req.params.id)
    .then(stream => res.status(200).json(stream))
    .catch(next)
};

module.exports.update = (req, res, next) => {
  const stream = req.stream
  const data = req.body
  Object.assign(stream, data)
  stream.save()
    .then(stream => res.status(200).json(stream))
    .catch(next)
    
};

module.exports.delete = (req, res, next) => {
  Stream.deleteOne(req.params.id)
    .then(() => res.status(200).send())
    .catch(next)
};
