import { sanitizeText } from '@/utils/sanitizers';
import { message, v } from '@/utils/validation';

export const TaskRequestSchema = v.object({
    description: v.string(message.required)
        .min(1, message.nonEmpty)
        .transform(sanitizeText),
    timeSpent: v.number(message.required)
        .min(1, message.min(1)),
    ticketId: v.number(message.required),
});
