import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export const addTransaction = async (req, res) => {
    try {
        const { amount, type, category, date, description } = req.body;

        // Validation

        if (!amount || !type || !category) {
            return res.status(400).json({ msg: "Amount, type, and category are required" })
        }

        if (!["income", "expense"].includes(type)) {
            return res.status(400).json({
                msg: "Type must be income or expense"
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                msg: "Amount must be greater than 0"
           });
        }

        const transaction = await Transaction.create({
            amount,
            type,
            category,
            date,   
            note: description,
            createdBy: req.user._id
        })

        res.status(201).json(transaction);
    } catch(error) {
        res.status(500).json({ msg: error.message })
    }
}

// Get transactions for the logged-in user

export const getTransactions = async (req, res) => {

    const { type, category, startDate, endDate } = req.query;
    try{

        let filter = {
            createdBy: req.user._id
        };

        // Filter by the type

        if (type) {
            filter.type = type.toLowerCase();
        }

        // filter by the category

        if (category) {
            filter.category = category
        }

        // Filter by the date range

        if (startDate || endDate) {
            filter.date = {}

            if (startDate) {
                filter.date.$gte = new Date(startDate)
            }
            if (endDate) {
                filter.date.$lte  = new Date(endDate)
            }
        }

        const transactions = await Transaction.find(filter).populate(
            "createdBy",
            "name email role"
        )
        res.json(transactions);

    } catch(error) {
        res.status(500).json({ msg: error.message})
    }
};

// update transaction only by the admin

export const updateTransaction = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    if (
      req.user.role !== "admin" &&
      transaction.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    Object.assign(transaction, req.body);

    await transaction.save();

    res.json({ msg: "Transaction updated", transaction });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete transaction only by the admin

export const deleteTransaction = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    
    if (
      req.user.role !== "admin" &&
      transaction.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await transaction.deleteOne();

    res.json({ msg: "Transaction deleted" });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};