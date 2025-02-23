import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        }
        const res = await axios.get("/api/requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (error) {
        alert("Failed to fetch requests");
      }
    };
    fetchRequests();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>My Service Requests</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Details</th>
            <th>Status</th>
            <th>Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request._id}>
              <td>{index + 1}</td>
              <td>{request.requestType}</td>
              <td>{request.details}</td>
              <td>{request.status}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
