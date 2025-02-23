const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    requestType: { type: String, required: true },
    details: { type: String, required: true },
    attachment: { type: String },
    status: { type: String, default: "Pending" }, // 'Pending', 'In Progress', 'Resolved'
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", ServiceRequestSchema);
