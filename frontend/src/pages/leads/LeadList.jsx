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
  deleteLead,
  updateLeadStatus
} from "../../services/lead.service";

const LeadList = () => {

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchLeads = async () => {

    try {

      setLoading(true);

      const response =
        await getLeads({
          page,
          limit,
          search,
          status,
          source
        });

      setLeads(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    fetchLeads();

  }, [page]);

  const handleSearch = () => {

    setPage(1);

    fetchLeads();

  };

  const handleDelete = async (id) => {

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

  const handleStatusChange =
    async (
      leadId,
      newStatus
    ) => {

      try {

        await updateLeadStatus(
          leadId,
          {
            status:
              newStatus
          }
        );

        fetchLeads();

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <>
      <Navbar />

      <div className="container mt-4">

        <div
          className="d-flex justify-content-between mb-3"
        >

          <h2>Leads</h2>

          <Link
            to="/leads/create"
            className="btn btn-primary"
          >
            Create Lead
          </Link>

        </div>

        {/* Filters */}

        <div className="row mb-3">

          <div className="col-md-3">

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

          <div className="col-md-3">

            <select
              className="form-select"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >

              <option value="">
                All Status
              </option>

              <option value="NEW">
                NEW
              </option>

              <option value="CONTACTED">
                CONTACTED
              </option>

              <option value="QUALIFIED">
                QUALIFIED
              </option>

              <option value="CLOSED">
                CLOSED
              </option>

            </select>

          </div>

          <div className="col-md-3">

            <input
              className="form-control"
              placeholder="Source"
              value={source}
              onChange={(e) =>
                setSource(
                  e.target.value
                )
              }
            />

          </div>

          <div className="col-md-3">

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
              <>
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

                              <select
                                value={
                                  lead.status
                                }
                                onChange={(e) =>
                                  handleStatusChange(
                                    lead.id,
                                    e.target.value
                                  )
                                }
                                className="form-select form-select-sm"
                              >

                                <option value="NEW">
                                  NEW
                                </option>

                                <option value="CONTACTED">
                                  CONTACTED
                                </option>

                                <option value="QUALIFIED">
                                  QUALIFIED
                                </option>

                                <option value="CLOSED">
                                  CLOSED
                                </option>

                              </select>

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

                {/* Pagination */}

                <div
                  className="d-flex gap-2"
                >

                  <button
                    className="btn btn-outline-primary"
                    disabled={
                      page === 1
                    }
                    onClick={() =>
                      setPage(
                        page - 1
                      )
                    }
                  >
                    Previous
                  </button>

                  <span
                    className="align-self-center"
                  >
                    Page {page}
                  </span>

                  <button
                    className="btn btn-outline-primary"
                    onClick={() =>
                      setPage(
                        page + 1
                      )
                    }
                  >
                    Next
                  </button>

                </div>

              </>
            )
        }

      </div>

    </>
  );
};

export default LeadList;