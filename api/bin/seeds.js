require("../config/db.config");

const Stream = require("../models/stream.model");

Stream.deleteMany({})
  .then(() => {
    // TODO: create 20 Streams using https://fakerjs.dev/guide/
  })
  .catch((err) => {
    console.error(err);
  });
