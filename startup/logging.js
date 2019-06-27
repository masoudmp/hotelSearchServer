const winston = require("winston");
require("express-async-errors");

class Logger {
  constructor() {
    if (!this.instance) {
      this.instance = winston.createLogger({
        level: "info",
        format: winston.format.json(),
        transports: [
          new winston.transports.File({
            filename: "./logs/error.log",
            level: "error",
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.prettyPrint()
            )
          }),
          new winston.transports.File({
            filename: "./logs/combined.log",
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.prettyPrint()
            )
          })
        ],
        exceptionHandlers: [
          new winston.transports.File({
            filename: "./logs/uncaughtExceptions.log"
          })
        ]
      });
      if (process.env.NODE_ENV !== "production") {
        this.instance.add(
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple(),
              winston.format.timestamp()
            )
          })
        );
      }
    }
  }

  getInstance() {
    return this.instance;
  }
}

module.exports = new Logger().getInstance();
