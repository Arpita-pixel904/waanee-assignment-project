import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../../services/auth.service";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "AGENT"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await registerUser(formData);

      alert("User registered successfully");

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card p-4">

            <h2 className="mb-4">
              Register
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="form-control mb-3"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <select
                name="role"
                className="form-control mb-3"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="ADMIN">
                  ADMIN
                </option>

                <option value="MANAGER">
                  MANAGER
                </option>

                <option value="AGENT">
                  AGENT
                </option>
              </select>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {
                  loading
                    ? "Registering..."
                    : "Register"
                }
              </button>

            </form>

            <div className="mt-3 text-center">

              <Link to="/">
                Already have an account?
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;