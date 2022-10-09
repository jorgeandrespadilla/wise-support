export const sanitizeText = (value: string) => {
    return value.trim();
};

export const sanitizeEmail = (value: string) => {
    return value.trim().toLowerCase();
};