import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'AGENT' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData.name, formData.email, formData.password, formData.role);
      navigate('/login');
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required />
        <input className="form-control mb-2" type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
        <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required />
        <select className="form-control mb-3" onChange={e => setFormData({...formData, role: e.target.value})}>
          <option value="AGENT">Agent</option>
          <option value="MANAGER">Manager</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};
export default Register;