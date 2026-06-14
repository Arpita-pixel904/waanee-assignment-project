import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import LeadForm from "../../components/LeadForm";

import { getLeadById, updateLead } from "../../services/lead.service";

const LeadEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [lead, setLead] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    const response = await getLeadById(id);

    setLead(response.data);
  };

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);

      await updateLead(id, formData);

      navigate("/leads");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!lead) {
    return <h4>Loading...</h4>;
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>Edit Lead</h2>

        <LeadForm
          initialData={lead}
          onSubmit={handleUpdate}
          loading={loading}
        />
      </div>
    </>
  );
};

export default LeadEdit;
