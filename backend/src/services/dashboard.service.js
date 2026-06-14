import {
  getDashboardStats
} from "../repositories/dashboard.repository.js";

export const getDashboardStatsService =
  async () => {

    return await getDashboardStats();

  };