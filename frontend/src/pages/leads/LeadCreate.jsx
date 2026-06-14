import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import LeadForm from "../../components/LeadForm";

import {
  createLead
} from "../../services/lead.service";

const LeadCreate = () => {

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const handleCreate =
    async (formData) => {

      try {

        setLoading(true);

        await createLead(
          formData
        );

        navigate("/leads");

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  return (

    <>
      <Navbar />

      <div
        className="container mt-4"
      >

        <h2>
          Create Lead
        </h2>

        <LeadForm
          onSubmit={handleCreate}
          loading={loading}
        />

      </div>

    </>

  );
};

export default LeadCreate;