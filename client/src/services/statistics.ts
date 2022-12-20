import {
    GetCategoriesStatsRequest,
    GetCategoriesStatsResponse,
    GetPerformanceStatsRequest,
    GetPerformanceStatsResponse,
} from 'types';
import api from 'utils/api';

export const getUsersPerformance = async (
    request: GetPerformanceStatsRequest,
) => {
    return await api.get<GetPerformanceStatsResponse>(
        '/stats/performance',
        request,
    );
};

export const getCategoriesStats = async (
    request: GetCategoriesStatsRequest,
) => {
    return await api.get<GetCategoriesStatsResponse>(
        '/stats/categories',
        request,
    );
};
