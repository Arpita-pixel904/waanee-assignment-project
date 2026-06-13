import prisma from '../config/prisma.js';

export const AssignmentService = {
  async getNextRoundRobinAgent() {
    // 1. Fetch all available agents
    const agents = await prisma.user.findMany({
      where: { role: 'AGENT' },
      orderBy: { id: 'asc' }
    });

    if (agents.length === 0) return null;

    // 2. Get the last assigned agent ID from our metadata table
    const metadata = await prisma.assignment_metadata.findUnique({
      where: { key: 'round_robin' }
    });

    let nextAgentId;
    if (!metadata) {
      // First time assignment: start with the first agent
      nextAgentId = agents[0].id;
    } else {
      // Find current index and calculate next
      const lastAgentIndex = agents.findIndex(a => a.id === metadata.last_assigned_agent_id);
      const nextIndex = (lastAgentIndex + 1) % agents.length;
      nextAgentId = agents[nextIndex].id;
    }

    // 3. Persist the new state in metadata
    await prisma.assignment_metadata.upsert({
      where: { key: 'round_robin' },
      update: { last_assigned_agent_id: nextAgentId },
      create: { key: 'round_robin', last_assigned_agent_id: nextAgentId }
    });

    return nextAgentId;
  }
};