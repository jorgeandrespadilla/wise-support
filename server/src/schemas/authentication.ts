import { message, v } from '@/utils/validation';

export const LoginRequestSchema = v.object({
    token: v.string(message.required).min(1, message.nonEmpty),
});

export const RefreshRequestSchema = v.object({
    refreshToken: v.string(message.required).min(1, message.nonEmpty),
});
