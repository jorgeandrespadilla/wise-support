import { sanitizeEmail } from '@/utils/sanitizers';
import { message, v } from '@/utils/validation';

export const AuthRequestSchema = v.object({
    email: v.string(message.required)
        .email(message.email)
        .transform(sanitizeEmail),
    password: v.string(message.required)
});
