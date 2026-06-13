import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow-sm">
      <span className="navbar-brand mb-0 h1 fw-bold">Mini CRM System</span>
      <div className="ms-auto d-flex align-items-center">
        <span className="text-light me-4 d-none d-md-block">
          Welcome, <strong>{user?.name || 'Agent'}</strong>
        </span>
        <button className="btn btn-danger btn-sm fw-bold" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;