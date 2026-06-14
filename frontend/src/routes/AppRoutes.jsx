import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

import LeadList from "../pages/leads/LeadList";
import LeadCreate from "../pages/leads/LeadCreate";
import LeadEdit from "../pages/leads/LeadEdit";
import LeadDetails from "../pages/leads/LeadDetails";

import ProtectedRoute from "../components/ProtectedRoutes";

const AppRoutes = () => {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

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
          path="/leads/create"
          element={
            <ProtectedRoute>
              <LeadCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/:id"
          element={
            <ProtectedRoute>
              <LeadDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/edit/:id"
          element={
            <ProtectedRoute>
              <LeadEdit />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;