import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  loginUser
} from "../../services/auth.service";

import {
  useAuth
} from "../../context/AuthContext";

const Login = () => {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: ""
    });

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);
        setError("");

        const response =
          await loginUser(
            formData
          );

        login(
          response.data.user,
          response.data.accessToken
        );

        navigate(
          "/dashboard"
        );

      } catch (err) {

        setError(
          err.response?.data?.message ||
          "Login Failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="container">

      <div
        className="row vh-100 justify-content-center align-items-center"
      >

        <div
          className="col-md-4"
        >

          <div
            className="card p-4 shadow"
          >

            <h3
              className="text-center mb-4"
            >
              Login
            </h3>

            {error && (

              <div
                className="alert alert-danger"
              >
                {error}
              </div>

            )}

            <form
              onSubmit={
                handleSubmit
              }
            >

              <div className="mb-3">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >

                {
                  loading
                    ? "Logging In..."
                    : "Login"
                }

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Login;