import { today, tryParseDate } from '@/utils/dateHelpers';
import { message, v } from '@/utils/validation';
import { DATE_CONFIG } from '@/constants/settings';

const StatsRequestSchema = v
    .object({
        startDate: v.preprocess(
            tryParseDate,
            v
                .date(message.date)
                .min(DATE_CONFIG.minDate, message.minDate(DATE_CONFIG.minDate))
                .max(today('endOfDay'), message.maxDateToday),
        ),
        endDate: v.preprocess(
            tryParseDate,
            v
                .date(message.date)
                .min(DATE_CONFIG.minDate, message.minDate(DATE_CONFIG.minDate))
                .max(today('endOfDay'), message.maxDateToday),
        ),
    })
    .refine(
        data => data.startDate <= data.endDate,
        message.minDateLessThanMaxDate,
    );

export const PerformanceStatsRequestSchema = StatsRequestSchema;

export const CategoriesStatsRequestSchema = StatsRequestSchema;
