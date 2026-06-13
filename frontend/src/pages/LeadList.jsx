import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import leadService from '../services/leadService';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  
  useEffect(() => {
    // Fetch leads with pagination/filter params
    leadService.getAllLeads({ page: 1, limit: 10 })
      .then(res => setLeads(res.data))
      .catch(err => console.error("Error fetching leads", err));
  }, []);

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Leads Management</h2>
        <Link to="/leads/new" className="btn btn-primary">+ Add New Lead</Link>
      </div>
      <table className="table border shadow-sm">
        <thead className="table-light">
          <tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.status}</td>
              <td><Link to={`/lead/${lead.id}`} className="btn btn-sm btn-info">View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default LeadList;