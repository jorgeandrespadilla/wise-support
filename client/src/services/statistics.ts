import { GetPerformanceStatsRequest, GetPerformanceStatsResponse } from "types";
import api from "utils/api";

export const getUsersPerformance = async (request: GetPerformanceStatsRequest) => {
    return await api.get<GetPerformanceStatsResponse>("/stats/performance", request);
}
