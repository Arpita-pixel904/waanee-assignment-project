import {
  getAllActivities,
  getActivitiesByLeadId,
  getActivityLogs
} from '../repositories/activity.repository.js';

export const getAllActivitiesService =
  async () => {

    return await getAllActivities();

};

export const getLeadActivitiesService =
  async (leadId) => {

    return await getActivitiesByLeadId(
      leadId
    );

};


  


export const getActivityLogsService =
  async () => {

    return await getActivityLogs();

  };