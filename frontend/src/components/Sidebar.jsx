import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-white border-end shadow-sm" style={{ width: '250px', minHeight: 'calc(100vh - 56px)' }}>
      <div className="list-group list-group-flush mt-3 px-2">
        <Link 
          to="/dashboard" 
          className={`list-group-item list-group-item-action rounded mb-2 ${location.pathname === '/dashboard' ? 'bg-primary text-white fw-bold' : 'text-dark'}`}
        >
          📊 Dashboard
        </Link>
        <Link 
          to="/leads" 
          className={`list-group-item list-group-item-action rounded mb-2 ${location.pathname.includes('/leads') ? 'bg-primary text-white fw-bold' : 'text-dark'}`}
        >
          👥 Manage Leads
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;