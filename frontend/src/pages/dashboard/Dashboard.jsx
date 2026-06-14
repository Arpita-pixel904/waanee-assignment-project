console.log("Dashboard Rendered");
import {
  useEffect,
  useState
} from "react";

import Navbar
from "../../components/Navbar";

import {
  Link
} from "react-router-dom";

import {
  getDashboardStats
} from "../../services/dashboard.service";

const Dashboard = () => {

  const [stats,
    setStats] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

useEffect(() => {
  console.log("useEffect Called");
    fetchStats();

  }, []);

 const fetchStats = async () => {

  console.log("fetchStats Called");

  try {

    const response =
      await getDashboardStats();

    console.log(
      "Dashboard Response:",
      response
    );
setStats(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  if (loading) {

    return (
      <h4 className="text-center mt-5">
        Loading Dashboard...
      </h4>
    );

  }

  return (

    <>
      <Navbar />

      <div className="container mt-4">

        <h2>
          Dashboard
        </h2>

        <div className="row mt-4">

          <div className="col-md-3">

            <div className="card p-3">

              <h3>
                {stats.total_leads}
              </h3>

              <p>
                Total Leads
              </p>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card p-3">

              <h3>
                {stats.new_leads}
              </h3>

              <p>
                New Leads
              </p>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card p-3">

              <h3>
                {stats.contacted_leads}
              </h3>

              <p>
                Contacted Leads
              </p>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card p-3">

              <h3>
                {stats.closed_leads}
              </h3>

              <p>
                Closed Leads
              </p>

            </div>

          </div>

        </div>

        <div
          className="card p-4 mt-4"
        >

          <h4>
            Lead Management
          </h4>

          <Link
            to="/leads"
            className="btn btn-primary mt-3"
          >
            Manage Leads
          </Link>

        </div>

      </div>

    </>
  );
};

export default Dashboard;