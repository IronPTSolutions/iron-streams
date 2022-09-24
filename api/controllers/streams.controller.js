const Stream = require("../models/stream.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  Stream.find()
    .then((streams) => res.json(streams))
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  const stream = req.body;
  delete stream.views;

  Stream.create(stream)
    .then((stream) => res.status(201).json(stream))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Stream.findById(req.params.id)
    .then((stream) => {
      if (stream) {
        res.json(stream);
      } else {
        next(createError(404, "stream not found"));
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const stream = req.body;
  delete stream.views;

  Stream.findByIdAndUpdate(
    req.params.id,
    stream,
    {
      new: true,
      runValidators: true,
    }
  )
    .then((stream) => {
      if (stream) {
        res.json(stream);
      } else {
        next(createError(404, "stream not found"));
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Stream.findByIdAndDelete(req.params.id)
    .then((stream) => {
      if (stream) {
        res.status(204).send();
      } else {
        next(createError(404, "stream not found"));
      }
    })
    .catch(next);
};
