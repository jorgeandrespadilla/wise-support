import { today, tryParseDate } from '@/utils/dateHelpers';
import { message, v } from '@/utils/validation';

const minDate = new Date(1900, 0, 1);

export const PerformanceStatsRequestSchema = v.object({
    startDate: v.preprocess(
        tryParseDate,
        v.date(message.date)
            .min(minDate, message.minDate(minDate))
            .max(today(), message.maxDate(today()))
    ),
    endDate: v.preprocess(
        tryParseDate,
        v.date(message.date)
            .min(minDate, message.minDate(minDate))
            .max(today(), message.maxDate(today()))
    ),
    
}).refine((data) => data.startDate <= data.endDate, message.minDateLessThanMaxDate);