import {
  assignLead,
  createLead,
  deleteLead,
  getAllAgents,
  getAllLeads,
  getLeadById,
  getNextAgentForAssignment,
  updateLead,
  updateLeadStatus,
} from "../repositories/lead.repository.js";

import { createActivityLog } from "../repositories/activity.repository.js";
import { findUserById } from "../repositories/auth.repository.js";

export const createLeadService = async (leadData, currentUser) => {
  let assignedTo = null;

  /**
   * Manager created lead
   * Auto assign agent
   */
  if (currentUser.role === "MANAGER") {
  const nextAgent =
  await getNextAgentForAssignment();

if (!nextAgent) {

  throw new Error(
    "No active agents found"
  );

}

assignedTo =
  nextAgent.id;
  }

  const lead = await createLead({
    ...leadData,
    assignedTo,
    createdBy: currentUser.id,
  });

 await createActivityLog({
  leadId: lead.id,
  userId: currentUser.id,
  activityType: "LEAD_ASSIGNED",
  newValue: {
    assignedTo
  }
});
  

  return lead;
};

export const getAllLeadsService = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    source,
    sortBy = "created_at",
    sortOrder = "DESC",
  } = queryParams;

  return await getAllLeads({
    page: Number(page),
    limit: Number(limit),
    search,
    status,
    source,
    sortBy,
    sortOrder,
  });
};

export const getLeadByIdService = async (leadId) => {
  const lead = await getLeadById(leadId);

  if (!lead) {
    throw new Error("Lead not found");
  }

  return lead;
};

export const updateLeadService = async (leadId, updateData, currentUser) => {
  const oldLead = await getLeadById(leadId);

  if (!oldLead) {
    throw new Error("Lead not found");
  }

  const updatedLead = await updateLead(leadId, updateData);

  await createActivityLog({
    leadId,
    userId: currentUser.id,
    activityType: "LEAD_UPDATED",
    oldValue: oldLead,
    newValue: updatedLead,
  });

  return updatedLead;
};

export const updateLeadStatusService = async (leadId, status, currentUser) => {
  const oldLead = await getLeadById(leadId);

  if (!oldLead) {
    throw new Error("Lead not found");
  }

  const updatedLead = await updateLeadStatus(leadId, status);

  await createActivityLog({
    leadId,
    userId: currentUser.id,
    activityType: "STATUS_CHANGED",
    oldValue: {
      status: oldLead.status,
    },
    newValue: {
      status,
    },
  });

  return updatedLead;
};

export const assignLeadService = async (leadId, assignedTo, currentUser) => {
  const agent = await findUserById(assignedTo);

  if (!agent) {
    throw new Error("Assigned user does not exist");
  }

  if (agent.role !== "AGENT") {
    throw new Error("Lead can only be assigned to an AGENT");
  }

  const oldLead = await getLeadById(leadId);

  if (!oldLead) {
    throw new Error("Lead not found");
  }

  const updatedLead = await assignLead(leadId, assignedTo);

  await createActivityLog({
    leadId,
    userId: currentUser.id,
    activityType: "LEAD_ASSIGNED",
    oldValue: {
      assigned_to: oldLead.assigned_to,
    },
    newValue: {
      assigned_to: assignedTo,
    },
  });

  return updatedLead;
};

export const deleteLeadService = async (leadId) => {
  const lead = await getLeadById(leadId);

  if (!lead) {
    throw new Error("Lead not found");
  }

  await deleteLead(leadId);

  return true;
};
