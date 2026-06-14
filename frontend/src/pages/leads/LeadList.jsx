import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import Navbar
from "../../components/Navbar";

import {
  getLeads,
  deleteLead
} from "../../services/lead.service";

const LeadList = () => {

  const [leads,
    setLeads] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [search,
    setSearch] =
    useState("");

  const fetchLeads =
    async () => {

      try {

        setLoading(true);

        const response =
          await getLeads({
            search
          });

        setLeads(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchLeads();

  }, []);

  const handleSearch =
    async () => {

      fetchLeads();

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Lead?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteLead(id);

        fetchLeads();

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <>
      <Navbar />

      <div
        className="container mt-4"
      >

        <div
          className="d-flex justify-content-between mb-3"
        >

          <h2>
            Leads
          </h2>

          <Link
            to="/leads/create"
            className="btn btn-primary"
          >
            Create Lead
          </Link>

        </div>

        <div
          className="row mb-3"
        >

          <div
            className="col-md-4"
          >

            <input
              className="form-control"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          <div
            className="col-md-2"
          >

            <button
              onClick={
                handleSearch
              }
              className="btn btn-secondary"
            >
              Search
            </button>

          </div>

        </div>

        {
          loading
            ? (
              <h5>
                Loading...
              </h5>
            )
            : (
              <table
                className="table table-bordered"
              >

                <thead>

                  <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Source</th>
                    <th>Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    leads.map(
                      (lead) => (

                        <tr
                          key={lead.id}
                        >

                          <td>
                            {lead.id}
                          </td>

                          <td>
                            {lead.name}
                          </td>

                          <td>
                            {lead.email}
                          </td>

                          <td>
                            {lead.status}
                          </td>

                          <td>
                            {lead.source}
                          </td>

                          <td>

                            <Link
                              to={`/leads/${lead.id}`}
                              className="btn btn-info btn-sm me-2"
                            >
                              View
                            </Link>

                            <Link
                              to={`/leads/edit/${lead.id}`}
                              className="btn btn-warning btn-sm me-2"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() =>
                                handleDelete(
                                  lead.id
                                )
                              }
                              className="btn btn-danger btn-sm"
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>
            )
        }

      </div>
    </>
  );
};

export default LeadList;