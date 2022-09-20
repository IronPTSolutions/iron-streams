const express = require("express");
const router = express.Router();
const streams = require("../controllers/streams.controller");

router.get("/streams", streams.list);
router.post("/streams", streams.create);
router.get("/streams/:id", streams.detail);
router.patch("/streams/:id", streams.update);
router.delete("/streams/:id", streams.delete);

module.exports = router;
