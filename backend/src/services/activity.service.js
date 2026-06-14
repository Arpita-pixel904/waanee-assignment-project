import {
  getAllActivities,
  getActivitiesByLeadId
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