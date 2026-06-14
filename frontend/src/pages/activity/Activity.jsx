import {
  useEffect,
  useState
} from "react";

import Navbar
from "../../components/Navbar";

import {
  getActivityLogs
} from "../../services/activity.service";

const ActivityLogs = () => {

  const [logs,
    setLogs] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchLogs();

  }, []);

  const fetchLogs =
    async () => {

      try {

        const response =
          await getActivityLogs();

        setLogs(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  if (loading) {

    return (
      <h4 className="text-center mt-5">
        Loading...
      </h4>
    );

  }

  return (

    <>
      <Navbar />

      <div className="container mt-4">

        <h2>
          Activity Logs
        </h2>

        <table
          className="table table-bordered mt-3"
        >

          <thead>

            <tr>

              <th>ID</th>

              <th>Lead</th>

              <th>User</th>

              <th>Activity</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {
              logs.map(
                (log) => (

                  <tr
                    key={log.id}
                  >

                    <td>
                      {log.id}
                    </td>

                    <td>
                      {log.lead_name}
                    </td>

                    <td>
                      {log.user_name}
                    </td>

                    <td>
                      {log.activity_type}
                    </td>

                    <td>
                      {
                        new Date(
                          log.created_at
                        ).toLocaleString()
                      }
                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </>
  );
};

export default ActivityLogs;