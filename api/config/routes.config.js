const express = require("express");
const router = express.Router();
const streams = require("../controllers/streams.controller");
const comments = require("../controllers/comments.controller");
const passport = require("passport");
const auth = require("../controllers/auth.controller");
const secure = require("../middlewares/secure.mid");
const streamsMid = require("../middlewares/streams.mid");

router.post("/register", auth.register);
router.get("/profile", secure.isAuthenticated, auth.profile);
router.post("/authenticate", auth.authenticate);
router.get("/authenticate/slack", passport.authorize("Slack"));
router.get("/authenticate/slack/cb", passport.authorize("Slack"), auth.slack);
router.delete("/logout", auth.logout);

router.get("/streams", secure.isAuthenticated, streams.list);
router.post("/streams", secure.isAuthenticated, streams.create);
router.get("/streams/:id", streams.detail);
router.patch(
  "/streams/:id",
  secure.isAuthenticated,
  streamsMid.isOwnedByUser,
  streams.update
);
router.delete(
  "/streams/:id",
  secure.isAuthenticated,
  streamsMid.isOwnedByUser,
  streams.delete
);

router.post("/streams/:id/like", secure.isAuthenticated, streams.like);

router.post("/streams/:id/comments", secure.isAuthenticated, comments.create);
router.patch(
  "/streams/:id/comments/:commentId",
  secure.isAuthenticated,
  streamsMid.isCommentOwnedByUser,
  comments.update
);
router.delete(
  "/streams/:id/comments/:commentId",
  secure.isAuthenticated,
  streamsMid.isCommentOwnedByUser,
  comments.delete
);

router.use((req, res, next) => next(createError(404, "Route not found")));

module.exports = router;
