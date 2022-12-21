export interface LoadEnvOptions<T> {
    /**
     * Default value to use if the environment variable is not defined.
     * This value will not be parsed by the **parserCallback**.
     * If this value is not set, the environment variable is set as required.
     */
    defaults?: T;
    /**
     * Callback to parse the environment variable value.
     * This is not necessary if the value is a string, but it is recommended for types such as numbers and booleans.
     */
    parserCallback?: (value: string) => T;
}

/**
 * This object contains functions to parse environment variables.
 * They can be used as the **parserCallback** parameter of the **loadEnv** function.
 */
export const envParser = {
    /**
     * Returns the value of the environment variable without altering it.
     */
    default: (value: string) => value,
    /**
     * Returns the value of the environment variable as a boolean.
     */
    boolean: (value: string) => value === 'true',
    /**
     * Returns the value of the environment variable as a number.
     */
    number: (value: string) => parseInt(value),
    /**
     * Returns the value of the environment variable as a float.
     */
    float: (value: string) => parseFloat(value),
};

/**
 * Returns the value of the environment variable.
 * @param variableName Name of the environment variable.
 * @param options Options for loading the environment variable.
 * @returns The value of the environment variable.
 */
export function loadEnv<T>(
    variableName: string,
    options: LoadEnvOptions<T> | undefined = {},
): T {
    const { parserCallback, defaults } = options;
    const value = process.env[variableName];

    if (value === undefined || value === '') {
        if (defaults === undefined) {
            throw new Error(
                `La variable de entorno '${variableName}' es requerida.`,
            );
        }
        return defaults;
    }

    if (parserCallback) {
        return parserCallback(value);
    }
    return value as T;
}
