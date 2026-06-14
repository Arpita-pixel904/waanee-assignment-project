import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import { getLeadById } from "../../services/lead.service";

const LeadDetails = () => {
  const { id } = useParams();

  const [lead, setLead] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {
      const response = await getLeadById(id);

      setLead(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h4>Loading...</h4>;
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="card p-4">
          <h3>Lead Details</h3>

          <hr />

          <p>
            <strong>Name:</strong> {lead.name}
          </p>

          <p>
            <strong>Email:</strong> {lead.email}
          </p>

          <p>
            <strong>Phone:</strong> {lead.phone}
          </p>

          <p>
            <strong>Source:</strong> {lead.source}
          </p>

          <p>
            <strong>Status:</strong> {lead.status}
          </p>

          <p>
            <strong>Assigned To:</strong>{" "}
            {lead.assigned_agent || "Not Assigned"}
          </p>

          <p>
            <strong>Notes:</strong> {lead.notes}
          </p>

          <p>
            <strong>Created At:</strong>{" "}
            {new Date(lead.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default LeadDetails;
