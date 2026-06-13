import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const LeadDetails = () => {
  const { id } = useParams(); // URL se lead id uthane ke liye
  const [lead, setLead] = useState(null);

  useEffect(() => {
    // API call karke specific lead ka data laayein
    api.get(`/leads/${id}`)
      .then((res) => setLead(res.data))
      .catch((err) => console.error("Error fetching lead:", err));
  }, [id]);

  if (!lead) return <div>Loading lead details...</div>;

  return (
    <div className="container mt-4">
      <h2>Lead Details</h2>
      <div className="card p-4">
        <p><strong>Name:</strong> {lead.name}</p>
        <p><strong>Email:</strong> {lead.email}</p>
        <p><strong>Status:</strong> {lead.status}</p>
        <p><strong>Source:</strong> {lead.source}</p>
      </div>
    </div>
  );
};

export default LeadDetails;