import * as leadService
from "../services/lead.service.js";

export const createLead =
  async (
    req,
    res,
    next
  ) => {

    try {

      const lead =
        await leadService
          .createLeadService(
            req.body,
            req.user
          );

      return res.status(201).json({
        success: true,
        message:
          "Lead created successfully",
        data: lead
      });

    } catch (error) {
      next(error);
    }
};

export const getAllLeads =
  async (
    req,
    res,
    next
  ) => {

    try {

      const leads =
        await leadService
          .getAllLeadsService(
            req.query
          );

      return res.status(200).json({
        success: true,
        data: leads
      });

    } catch (error) {
      next(error);
    }
};

export const getLeadById =
  async (
    req,
    res,
    next
  ) => {

    try {

      const lead =
        await leadService
          .getLeadByIdService(
            req.params.id
          );

      return res.status(200).json({
        success: true,
        data: lead
      });

    } catch (error) {
      next(error);
    }
};



export const deleteLead =
  async (
    req,
    res,
    next
  ) => {

    try {

      await leadService
        .deleteLeadService(
          req.params.id
        );

      res.status(200).json({
        success: true,
        message:
          'Lead deleted successfully'
      });

    } catch (error) {
      next(error);
    }
};


export const updateLead =
  async (
    req,
    res,
    next
  ) => {

    try {

      const lead =
        await leadService
          .updateLeadService(
            req.params.id,
            req.body,
            req.user
          );

      return res.status(200).json({
        success: true,
        message:
          'Lead updated successfully',
        data: lead
      });

    } catch (error) {
      next(error);
    }
};

export const updateLeadStatus =
  async (
    req,
    res,
    next
  ) => {

    try {

      const lead =
        await leadService
          .updateLeadStatusService(
            req.params.id,
            req.body.status,
            req.user
          );

      res.status(200).json({
        success: true,
        message:
          'Lead status updated',
        data: lead
      });

    } catch (error) {
      next(error);
    }
};

export const assignLead =
  async (
    req,
    res,
    next
  ) => {

    try {

      const lead =
        await leadService
          .assignLeadService(
            req.params.id,
            req.body.assignedTo,
            req.user
          );

      res.status(200).json({
        success: true,
        message:
          'Lead assigned successfully',
        data: lead
      });

    } catch (error) {
      next(error);
    }
};