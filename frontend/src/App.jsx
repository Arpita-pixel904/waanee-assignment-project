import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LeadList from './pages/LeadList';
import LeadForm from './pages/LeadForm';
import LeadDetails from './pages/LeadDetails';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoutes from './components/ProtectedRoutes';

import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// 🎨 Layout Wrapper: Har dashboard page ke aas-paas Navbar aur Sidebar lagane ke liye
const AppLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column vh-100 bg-light">
      <Navbar />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar />
        <div className="flex-grow-1 p-4 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          
          <Route path="/register" element={<Register />} />
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/leads" 
            element={
              <ProtectedRoute>
                <LeadList />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/lead/:id" 
            element={
              <ProtectedRoute>
                <LeadDetails />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
