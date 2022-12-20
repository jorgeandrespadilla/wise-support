import { today, tryParseDate } from '@/utils/dateHelpers';
import { message, v } from '@/utils/validation';
import { DATE_CONFIG } from '@/constants/settings';

export const PerformanceStatsRequestSchema = v
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

export const CategoriesStatsRequestSchema = v
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
