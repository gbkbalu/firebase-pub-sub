const winston = require('winston');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL,
  format: winston.format.combine(
    enumerateErrorFormat(),
    //winston.format.colorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    }),
    new winston.transports.File({ filename: 'app.log' }) // Log to a file
  ]
});

module.exports = logger;

