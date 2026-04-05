import express from "express";
import {
  getSummary,
  getCategoryBreakdown,
  getRecentTransactions
} from "../controllers/dashboardController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// All roles can view the dashboard
router.get("/summary", protect, allowRoles("admin", "analyst", "viewer"), getSummary);

router.get("/category", protect, allowRoles("admin", "analyst"), getCategoryBreakdown);

router.get("/recent", protect, allowRoles("admin", "analyst", "viewer"), getRecentTransactions);

export default router;