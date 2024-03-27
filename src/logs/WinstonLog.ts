import winston from "winston";
import path from "path";

class WinstonLog {
  private logger: winston.Logger;

  constructor(level: string, serviceName: string) {
    const logDirectory = path.resolve(__dirname, "../logs");

    this.logger = winston.createLogger({
      level: level,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      defaultMeta: { service: serviceName },
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.join(logDirectory, "error.log"),
          level: "error",
        }),
        new winston.transports.File({
          filename: path.join(logDirectory, "combined.log"),
        }),
      ],
    });
  }

  public log(level: string, message: string, meta?: any): void {
    this.logger.log(level, message, meta);
  }

  public info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  public error(message: string, meta?: any): void {
    this.logger.error(message, meta);
  }
}

export { WinstonLog };
