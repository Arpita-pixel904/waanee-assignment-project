import React, { useEffect, useState } from 'react';
import leadService from '../services/leadService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    inProgress: 0,
    converted: 0,
    recentLeads: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Local storage se active profile parameter render karne ke liye extract karenge
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User', role: 'AGENT' };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await leadService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Dashboard Fetch Error:', err.message);
        setError('Failed to load performance metrics.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Dashboard metrics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Welcome Bar displaying contextual identity */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold text-dark">Welcome back, {user.name}!</h2>
          <p className="text-muted mb-0">Role: <span className="badge bg-secondary">{user.role.toUpperCase()}</span> | Real-time Operations Console</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* 🚀 Metrics Summary Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm bg-primary text-white h-100">
            <div className="card-body d-flex flex-column justify-content-between p-4">
              <span className="text-uppercase fw-semibold small opacity-75">Total Leaded Accounts</span>
              <h1 className="display-5 fw-bold my-2">{stats.totalLeads}</h1>
              <small className="opacity-50">Active records in repository</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm bg-warning text-dark h-100">
            <div className="card-body d-flex flex-column justify-content-between p-4">
              <span className="text-uppercase fw-semibold small opacity-75">Unassigned / New Leads</span>
              <h1 className="display-5 fw-bold my-2">{stats.newLeads}</h1>
              <small className="opacity-50">Awaiting engagement action</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm bg-info text-white h-100">
            <div className="card-body d-flex flex-column justify-content-between p-4">
              <span className="text-uppercase fw-semibold small opacity-75">In Progress pipeline</span>
              <h1 className="display-5 fw-bold my-2">{stats.inProgress}</h1>
              <small className="opacity-50">Active touchpoint pipeline</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm bg-success text-white h-100">
            <div className="card-body d-flex flex-column justify-content-between p-4">
              <span className="text-uppercase fw-semibold small opacity-75">Conversion Conversions</span>
              <h1 className="display-5 fw-bold my-2">{stats.converted}</h1>
              <small className="opacity-50">Closed-won accounts achieved</small>
            </div>
          </div>
        </div>
      </div>

      {/* 📋 Recent Leads Quick View Segment */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="mb-0 fw-bold text-dark">Recent Lead Registrations</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-nowrap">
                  <thead className="table-light">
                    <tr>
                      <th className="px-4 py-3 border-0">Name</th>
                      <th className="py-3 border-0">Source Channel</th>
                      <th className="py-3 border-0">Current Status</th>
                      <th className="py-3 border-0">Assigned Agent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentLeads.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-4">No recent leads found in system grid.</td>
                      </tr>
                    ) : (
                      stats.recentLeads.map((lead) => (
                        <tr key={lead.id}>
                          <td className="px-4 py-3 fw-medium">{lead.name}</td>
                          <td><span className="badge bg-light text-dark">{lead.source || 'N/A'}</span></td>
                          <td>
                            <span className={`badge ${lead.status?.toLowerCase() === 'new' ? 'bg-warning text-dark' : 'bg-primary'}`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="text-muted">{lead.agent_name || 'System Unassigned'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;