//TODO: swagger documentation
//TODO: more validation
//TODO: unit,integration,EndToEnd test
const express = require("express");
const app = express();

const logger = require("./startup/logging");
require("./startup/errorHandling")();
require("./startup/production")(app);
require("./startup/routes")(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  logger.log("info", `Listening on port ${port}...`)
);

module.exports = server;
