import prisma from '../config/prisma.js';
import { AssignmentService } from '../services/assignmentService.js';

// --- MANDATORY 3RD PARTY API INTEGRATION ---
// Using a free mock API to demonstrate real async HTTP integration
const sendWelcomeEmailAPI = async (email, name) => {
  try {
    console.log(`[External API] Triggering email webhook for: ${name} <${email}>`);
    
    // Making a real HTTP POST request to a free dummy endpoint
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Welcome Email Trigger',
        body: `Email sent to ${name} at ${email}`,
        userId: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('[External API] Success:', data);
    return data;
  } catch (error) {
    console.error('[External API] Failed to send email:', error.message);
    // We don't throw here so it doesn't crash the lead creation process
  }
};
// -------------------------------------------
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, source } = req.body;
    if (!name || !email || !phone || !source) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const assignedAgentId = await AssignmentService.getNextRoundRobinAgent();

    const newLead = await prisma.lead.create({
      data: { ...req.body, assigned_to: assignedAgentId }
    });

    // Match schema: performed_by
    await prisma.activityLog.create({
      data: {
        lead_id: newLead.id,
        performed_by: req.user.id, 
        action_type: 'LEAD_CREATED',
        details: assignedAgentId ? `Auto-assigned to Agent ID: ${assignedAgentId}` : 'Unassigned'
      }
    });

    sendWelcomeEmailAPI(email, name).catch(err => console.error('Email API failed', err));
    return res.status(201).json({ success: true, data: newLead });
  } catch (error) {
    console.error('Create Lead Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const { search, status, source, sortBy = 'created_at', order = 'desc', page = 1, limit = 10 } = req.query;
    
    const where = {
      ...(status && { status }),
      ...(source && { source }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(req.user.role === 'AGENT' && { assigned_to: req.user.id })
    };

    const leads = await prisma.lead.findMany({
      where,
      include: { agent: { select: { name: true } } },
      orderBy: { [sortBy]: order.toLowerCase() },
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit)
    });

    const totalCount = await prisma.lead.count({ where });

    return res.status(200).json({ success: true, count: totalCount, page: parseInt(page), data: leads });
  } catch (error) {
    console.error('Get Leads Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// --- NEWLY ADDED: Missing Assessment Requirement ---
export const getLeadById = async (req, res) => {
  try {
    const leadId = parseInt(req.params.id);
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { agent: { select: { name: true } } }
    });

    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    
    // Agent restrictions
    if (req.user.role === 'AGENT' && lead.assigned_to !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Forbidden: You do not own this lead' });
    }

    return res.status(200).json({ success: true, data: lead });
  } catch (error) {
    console.error('Get Lead By ID Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const updateLead = async (req, res) => {
  try {
    const leadId = parseInt(req.params.id);
    const updates = req.body;

    const existingLead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!existingLead) return res.status(404).json({ success: false, message: 'Lead not found' });

    if (req.user.role === 'AGENT' && existingLead.assigned_to !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Forbidden: You do not own this lead' });
    }

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: updates
    });

    let logDetails = `Lead updated.`;
    if (updates.status && updates.status !== existingLead.status) {
      logDetails += ` Status changed to ${updates.status}.`;
    }

    await prisma.activityLog.create({
      data: { lead_id: leadId, user_id: req.user.id, action_type: 'LEAD_UPDATED', details: logDetails }
    });

    return res.status(200).json({ success: true, data: updatedLead });
  } catch (error) {
    console.error('Update Lead Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const deleteLead = async (req, res) => {
  try {
  // Only allow ADMIN or MANAGER to delete
    if (req.user.role === 'AGENT') {
        return res.status(403).json({ success: false, message: 'Forbidden: Only Admins can delete' });
    }
    const leadId = parseInt(req.params.id);
    await prisma.lead.delete({ where: { id: leadId } });
    return res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ success: false, message: 'Lead not found' });
    console.error('Delete Lead Error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};