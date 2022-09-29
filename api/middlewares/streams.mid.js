const Stream = require("../models/stream.model");
const createError = require("http-errors");

module.exports.isOwnedByUser = (req, res, next) => {
  const { id } = req.params;
  Stream.findById(id)
    .then((stream) => {
      if (stream?.owner == req.user?.id) {
        req.stream = stream;
        next();
      } else if (stream) {
        next(createError(403, "Nooooo puedeeeees paasaaaaar"));
      } else {
        next(createError(404, "Stream not found"));
      }
    })
    .catch(next);
};

module.exports.isCommentOwnedByUser = (req, res, next) => {
  const { commentId } = req.params;

  Comment.findById(commentId)
    .then((comment) => {
      if (comment) {
        if (comment.user === req.user.id) {
          req.comment = comment;
          next();
        } else {
          next(createError(403, "Nooooo puedeeeees paasaaaaar"));
        }
      } else {
        next(createError(404, "Stream not found"));
      }
    })
    .catch(next);
};
