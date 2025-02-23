import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RequestForm = () => {
  const [requestType, setRequestType] = useState("");
  const [details, setDetails] = useState("");
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const formData = new FormData();
      formData.append("requestType", requestType);
      formData.append("details", details);
      if (attachment) {
        formData.append("attachment", attachment);
      }
      await axios.post("/api/requests", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Request Submitted");
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to submit request");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit a New Service Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Request Type</label>
          <select
            className="form-control"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Gas Connection">Gas Connection</option>
            <option value="Repair Request">Repair Request</option>
            <option value="Billing Issue">Billing Issue</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Details</label>
          <textarea
            className="form-control"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Attachment (Optional)</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
