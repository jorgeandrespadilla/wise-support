import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file'; 
import { LOG_CONFIG } from '@/constants/settings';

const logger: winston.Logger = configureLogger();

function configureLogger() {
    return winston.createLogger({
        level: LOG_CONFIG.logLevel,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ level, message, timestamp }) => {
                return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
            })
        ),
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    winston.format.printf(({ level, message, timestamp }) => {
                        return `[${timestamp}] ${level}: ${message}`;
                    })
                )
            }),
            new DailyRotateFile({
                filename: LOG_CONFIG.outputPath,
                datePattern: "YYYY-MM-DD",
                zippedArchive: true,
                maxSize: "20m",
                maxFiles: "14d"
            })
        ]
    });
}

export default {
    /**
     * Events considered to be useful during software debugging.
     */
    debug: (message: string) => logger.debug(message),
    /**
     * Events related to HTTP requests.
     */
    http: (message: string) => logger.http(message),
    /**
     * Events that are purely informational and can be ignored during normal operations.
     */
    info: (message: string) => logger.info(message),
    /**
     * Events related to unexpected behavior.
     */
    warn: (message: string) => logger.warn(message),
    /**
     * Events related to errors and exceptions that prevent the application from working properly.
     */
    error: (message: string) => logger.error(message)
}