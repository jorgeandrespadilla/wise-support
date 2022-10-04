export type ParserCallback = (value: string) => any;

export interface LoadEnvOptions {
    /**
     * Default value to use if the environment variable is not defined.
     * This value will not be parsed by the **parserCallback**.
     * If this value is not set, the environment variable is set as required.
     */
    defaults?: any;
    /**
     * Callback to parse the environment variable value.
     * This is not necessary if the value is a string, but it is recommended for types such as numbers and booleans.
     */
    parserCallback?: ParserCallback;
}

/**
 * This object contains functions to parse environment variables.
 * They can be used as the **parserCallback** parameter of the **loadEnv** function.
 */
export const envParser: Record<string, ParserCallback> = {
    /**
     * Returns the value of the environment variable without altering it.
     */
    default: (value) => value,
    /**
     * Returns the value of the environment variable as a boolean.
     */
    boolean: (value) => value === 'true',
    /**
     * Returns the value of the environment variable as a number.
     */
    number: (value) => parseInt(value),
    /**
     * Returns the value of the environment variable as a float.
     */
    float: (value) => parseFloat(value),
};

/**
 * Returns the value of the environment variable.
 * @param name Name of the environment variable.
 * @param options Options for loading the environment variable.  
 * @returns The value of the environment variable.
 */
export function loadEnv<T = any>(name: string, {
    parserCallback = envParser.default,
    defaults,
}: LoadEnvOptions = {}): T {
    const value = process.env[name] || defaults;
    
    if (value === undefined) {
        const required = defaults === undefined;
        if (required) {
            throw new Error(`Environment variable ${name} is required.`);
        }
        return defaults;
    }

    return parserCallback(value);
}