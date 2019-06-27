const logger = require("../startup/logging");

module.exports = function(err, req, res, next) {
  logger.error(err.message, err);
  res.status(500).send({
    statusCode: 500,
    body: { message: "Something failed." }
  });
};
