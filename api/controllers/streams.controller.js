const Stream = require("../models/stream.model");

module.exports.list = (req, res, next) => {
  Stream.find()
    .then((streams) => res.json(streams))
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {};

module.exports.detail = (req, res, next) => {};

module.exports.update = (req, res, next) => {};

module.exports.delete = (req, res, next) => {};
