const Stream = require("../models/stream.model");
const Like = require("../models/like.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  Stream.find()
    .populate("owner", "name email")
    .then((streams) => res.json(streams))
    .catch((error) => next(error));
};

module.exports.create = (req, res, next) => {
  const stream = req.body;
  delete stream.views;
  stream.owner = req.user.id;

  Stream.create(stream)
    .then((stream) => res.status(201).json(stream))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Stream.findById(req.params.id)
    .populate("owner", "name email")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .populate("likes")
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
  const data = req.body;
  delete data.views;
  delete data.owner;

  const stream = Object.assign(req.stream, data);
  stream
    .save()
    .then((stream) => res.json(stream))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Stream.deleteOne({ _id: req.stream.id })
    .then(() => res.status(204).send())
    .catch(next);
};

module.exports.like = (req, res, next) => {
  const detail = {
    user: req.user.id,
    stream: req.params.id,
  };

  Like.findOne(detail)
    .then((like) => {
      if (like) {
        return Like.deleteOne(detail);
      } else {
        return Like.create(detail);
      }
    })
    .then(() => Like.count(detail))
    .then((likes) => res.json({ likes }))
    .catch(next);
};
