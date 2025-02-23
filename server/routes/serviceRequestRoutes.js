const express = require("express");
const { protect } = require("../middleware/auth");
const {
  createServiceRequest,
  getUserRequests,
  updateRequestStatus,
} = require("../controllers/serviceRequestController");

const router = express.Router();

router.post("/", protect, createServiceRequest);
router.get("/", protect, getUserRequests);
router.put("/:id", protect, updateRequestStatus);

module.exports = router;
