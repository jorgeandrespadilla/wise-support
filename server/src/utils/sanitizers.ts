export const sanitizeText = (value: string) => {
    return value.trim();
};

export const sanitizeEmail = (value: string) => {
    return value.trim().toLowerCase();
};

/**
 * Sanitizes an optional field by trimming it and returning undefined if it's empty.
 */
export const sanitizeOptionalField = (value: string) => {
    return value.trim() || undefined;
};
