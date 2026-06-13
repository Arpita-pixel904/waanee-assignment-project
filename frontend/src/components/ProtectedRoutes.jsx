import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth(); // AuthContext se user status check karein

  if (!user) {
    // Agar user logged in nahi hai, toh login page par bhej dein
    return <Navigate to="/login" />;
  }

  // Agar user logged in hai, toh protected content dikhayein
  return children;
};

export default ProtectedRoutes;