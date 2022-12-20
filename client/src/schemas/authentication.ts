import { message, v } from 'utils/validation';

export const LoginFormSchema = v.object({
    email: v
        .string(message.required)
        .min(1, message.nonEmpty)
        .email(message.email),
    password: v.string(message.required).min(1, message.nonEmpty),
});
