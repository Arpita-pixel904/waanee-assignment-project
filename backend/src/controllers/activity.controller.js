import * as activityService
from '../services/activity.service.js';



export const getAllActivities =
  async (
    req,
    res,
    next
  ) => {

    try {

      const activities =
        await activityService
          .getAllActivitiesService();

      res.status(200).json({
        success: true,
        data: activities
      });

    } catch (error) {
      next(error);
    }
};

export const getLeadActivities =
  async (
    req,
    res,
    next
  ) => {

    try {

      const activities =
        await activityService
          .getLeadActivitiesService(
            req.params.leadId
          );

      res.status(200).json({
        success: true,
        data: activities
      });

    } catch (error) {
      next(error);
    }
};