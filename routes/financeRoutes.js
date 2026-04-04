import express from "express";
import {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
} from "../controllers/financeController.js";

import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";


const router = express.Router()


// This route is for creating a transaction, only by the admin
router.post("/", protect, allowRoles("admin"), addTransaction);

// This route is for retrieving transactions, accessible by admin, analyst, and viewer
router.get("/", protect, allowRoles("admin", "analyst", "viewer"), getTransactions);

// This route is for updating a transaction, only by the admin
router.put("/:id", protect, allowRoles("admin"), updateTransaction);

// This route is for deleting a transaction, only by the admin
router.delete("/:id", protect, allowRoles("admin"), deleteTransaction);

export default router