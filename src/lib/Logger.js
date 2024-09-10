const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const rTracer = require("cls-rtracer");
const { LOG_TRACING } = process.env;

class Logger {
  static instance;

  static createLogger() {
    if (process.env.LOG_PATH) {
      Logger.instance = winston.createLogger({
        transports: [
          new DailyRotateFile({
            dirname: process.env.LOG_PATH,
            filename: "chatapp-server-%DATE%.log",
            utc: true,
            maxSize: "10k",
            maxFiles: "10d",
            zippedArchive: true,
          }),
        ],
      });
    } else {
      Logger.instance = winston.createLogger({
        level: process.env.LOG_LEVEL || "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [new winston.transports.Console()],
      });
    }
  }

  static injectCorrelationIdIntoMeta(meta) {
    if (LOG_TRACING && LOG_TRACING === "true") {
      if (!meta) meta = {};
      if (meta instanceof Object) meta.correlationId = rTracer.id();
      else {
        meta = {
          correlationId: rTracer.id(),
          info: meta,
        };
      }
    }
    return meta;
  }

  static info(message, meta = {}) {
    if (!Logger.instance) Logger.createLogger();
    Logger.instance.info(message, Logger.injectCorrelationIdIntoMeta(meta));
  }

  static warn(message, meta = {}) {
    if (!Logger.instance) Logger.createLogger();
    Logger.instance.warn(message, Logger.injectCorrelationIdIntoMeta(meta));
  }

  static error(message, meta = {}) {
    if (!Logger.instance) Logger.createLogger();
    Logger.instance.error(message, Logger.injectCorrelationIdIntoMeta(meta));
  }
}

module.exports = { Logger };
