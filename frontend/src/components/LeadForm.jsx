import { useEffect, useState } from "react";

const LeadForm = ({
  initialData,
  onSubmit,
  loading
}) => {
    const [formData, setFormData] =
  useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    notes: ""
  });

useEffect(() => {
  if (initialData) {
    setFormData(initialData);
  }
}, [initialData]);



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);

  };

  return (

    <form onSubmit={handleSubmit}>

      <div className="mb-3">

        <label>Name</label>

        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />

      </div>

      <div className="mb-3">

        <label>Email</label>

        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
        />

      </div>

      <div className="mb-3">

        <label>Phone</label>

        <input
          type="text"
          name="phone"
          className="form-control"
          value={formData.phone}
          onChange={handleChange}
        />

      </div>

      <div className="mb-3">

        <label>Source</label>

        <input
          type="text"
          name="source"
          className="form-control"
          value={formData.source}
          onChange={handleChange}
        />

      </div>

      <div className="mb-3">

        <label>Notes</label>

        <textarea
          name="notes"
          rows="4"
          className="form-control"
          value={formData.notes}
          onChange={handleChange}
        />

      </div>

      <button
        className="btn btn-primary"
        disabled={loading}
      >
        {
          loading
            ? "Saving..."
            : "Save Lead"
        }
      </button>

    </form>

  );
};

export default LeadForm;