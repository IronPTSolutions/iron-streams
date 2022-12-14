const Comment = require("../models/comment.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  Comment.create({
    text: req.body.text,
    stream: req.params.id,
    user: req.user.id,
  })
    .then((comment) => res.status(201).json(comment))
    .catch(next);
};

module.exports.update = (req, res, next) => {
  req.comment.text = req.body.text;

  req.comment
    .save()
    .then((comment) => res.json(comment))
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Comment.deleteOne({ _id: req.comment.id })
    .then(() => res.status(204).send())
    .catch(next);
};
