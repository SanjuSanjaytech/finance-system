import express from "express";
import {
  getUsers,
  updateUserRole,
  updateUserStatus
} from "../controllers/userController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin only routes
router.get("/", protect, allowRoles("admin"), getUsers);
router.patch("/:id/role", protect, allowRoles("admin"), updateUserRole);
router.patch("/:id/status", protect, allowRoles("admin"), updateUserStatus);

export default router;