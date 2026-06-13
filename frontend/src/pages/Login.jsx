import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Context se login function nikal rahe hain

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard"); // 🚀 Login success hone par dashboard bhejein
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-sm border-0"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-primary">System Login</h3>
            <p className="text-muted small">
              Enter your credentials to access the portal
            </p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted small fw-bold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="agent@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label text-muted small fw-bold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : null}
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
