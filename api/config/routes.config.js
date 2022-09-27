const express = require("express");
const router = express.Router();
const streams = require("../controllers/streams.controller");
const auth = require("../controllers/auth.controller");
const secure = require("../middlewares/secure.mid");
const streamsMid = require("../middlewares/streams.mid");

router.post("/register", auth.register);
router.post("/authenticate", auth.authenticate);
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

module.exports = router;
