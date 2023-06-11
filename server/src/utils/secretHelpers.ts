import { writeFileSync } from 'fs';
import { fileSync as tempFileSync } from 'tmp-promise';

/**
 * Loads a secret from a base64 encoded string into a temporary file.
 * This allows file secrets to be loaded into memory through environment variables.
 * @param data Data encoded using base64 to load into a temporary file.
 * @returns The path to the temporary file.
 */
export const loadSecret = (data: string, extension = '.json') => {
    const { name: path } = tempFileSync({ postfix: extension });
    const dataBuffer = Buffer.from(data, 'base64');
    writeFileSync(path, dataBuffer);
    return path;
};
