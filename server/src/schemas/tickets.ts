import { sanitizeText } from '@/utils/sanitizers';
import { message, v } from '@/utils/validation';

const TicketRequestSchema = v.object({
    title: v.string(message.required)
        .min(1, message.nonEmpty)
        .transform(sanitizeText),
    description: v.string(message.required)
        .transform(sanitizeText),
    priority: v.string(message.required)
        .min(1, message.nonEmpty),
    timeEstimated: v.number(message.required)
        .min(1, message.min(1)),
    assigneeId: v.number(message.required)
        .min(1, message.nonEmpty),
    supervisorId: v.number(message.required)
        .min(1, message.nonEmpty),
    categoryId: v.number(message.required)
        .min(1, message.nonEmpty),
}).partial({ description: true });

export const TicketCreateRequestSchema = TicketRequestSchema;

export const TicketUpdateRequestSchema = TicketRequestSchema.extend({
    status: v.string(message.required)
        .min(1, message.nonEmpty),
});