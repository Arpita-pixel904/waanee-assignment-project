import api from './api';

const leadService = {
  // 1. Existing listing logic supporting pagination, search, sorting and filters
  getAllLeads: async (params) => {
    const response = await api.get('/leads', { params });
    return response.data;
  },

  // 2. Dashboard metrics aggregate fetch karne ke liye
  getDashboardStats: async () => {
    // Note: Humein global dashboard stats server side filters ke sath extract karne hain
    const response = await api.get('/leads'); 
    const leads = response.data.data || [];
    
    // Client-side mapping aggregation computing status metrics dynamically
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status?.toLowerCase() === 'new').length;
    const inProgress = leads.filter(l => l.status?.toLowerCase() === 'in_progress' || l.status?.toLowerCase() === 'in progress').length;
    const converted = leads.filter(l => l.status?.toLowerCase() === 'converted').length;

    return {
      totalLeads,
      newLeads,
      inProgress,
      converted,
      recentLeads: leads.slice(0, 5) // Recent 5 leads for quick preview
    };
  }
};

export default leadService;