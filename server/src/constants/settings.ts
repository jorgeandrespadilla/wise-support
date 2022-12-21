import dotenv from 'dotenv';
import { envParser, loadEnv } from '@/utils/dotenvHelpers';

export const IS_DEV = loadEnv<boolean>('NODE_ENV', {
    defaults: true,
    parserCallback: value => value === 'development',
});

if (IS_DEV) dotenv.config();

export const PORT = loadEnv<number>('SERVER_PORT', {
    defaults: 4000,
    parserCallback: envParser.number,
});
export const BASE_URL = loadEnv<string>('SERVER_BASE_URL', { defaults: '' }); // Should include leading slash
export const BASE_API_URL = `${BASE_URL}/api`;

export const JWT_CONFIG = {
    accessToken: {
        secret: loadEnv<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: '1h',
    },
    refreshToken: {
        secret: loadEnv<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: '1d',
    },
};

export const LOG_CONFIG = {
    outputPath: 'logs/server_%DATE%.log', // DATE is replaced with the current date based on log file rotation
    logLevel: IS_DEV ? 'debug' : 'info',
};

export const DATE_CONFIG = {
    /**
     * Date format used for JSON responses.
     */
    shortDateFormat: 'yyyy-MM-dd',
    /**
     * Date format used for display purposes.
     */
    dateDisplayFormat: 'dd/MM/yyyy',
    /**
     * Minimum date allowed.
     */
    minDate: new Date('1900-01-01'),
};
