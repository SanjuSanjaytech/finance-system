import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
    try {
        const { amount, type, category, date, description } = req.body;

        if (!amount || !type || !category) {
            return res.status(400).json({ msg: "Missing required fields"})
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
    try{
        const transactions = await Transaction.find().populate(
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
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }

        Object.assign(transaction, req.body);

        await transaction.save();

        res.json({ msg: "Transaction updated", transaction });
    } catch(error) {
        res.status(500).json({ msg: error.message})
    }
}


// Delete transaction only by the admin

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    await transaction.deleteOne();

    res.json({ msg: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};