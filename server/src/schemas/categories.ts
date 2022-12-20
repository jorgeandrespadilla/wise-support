import { sanitizeText } from '@/utils/sanitizers';
import { message, v } from '@/utils/validation';

export const CategoryRequestSchema = v
    .object({
        name: v
            .string(message.required)
            .min(1, message.nonEmpty)
            .transform(sanitizeText),
        code: v
            .string(message.required)
            .min(1, message.nonEmpty)
            .transform(sanitizeText),
        description: v.string(message.required).transform(sanitizeText),
    })
    .partial({ description: true });
