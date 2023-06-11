export const parseJson = async <T>(json: string): Promise<T> => {
    return JSON.parse(json) as T;
};
