require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

require("./config/db.config");

const app = express();

app.use(logger("dev"));

const routes = require("./config/routes.config");
app.use("/api/v1", routes);

app.use((req, res, next) => next(createError(404, "Route not found")));

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500);

  const data = {};

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);

    for (field of Object.keys(error.errors)) {
      error.errors[field] = error.errors[field].message;
    }

    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, "Resource not found");
  }

  data.message = error.message;

  res.json(data);
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`iron streams api running at port ${port}`));
