import Transaction from "../models/Transaction.js";

// summary of transactions for dashboard
export const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") totalIncome += t.amount;
      else totalExpense += t.amount;
    });

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getCategoryBreakdown = async (req, res) => {
    try {
        const transactions = await Transaction.find()

        const breakdown = {}

        transactions.forEach((t) => {
            if (!breakdown[t.category]) {
                breakdown[t.category] = 0
            }
            breakdown[t.category] += t.amount
        })

        res.json(breakdown)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


export const getRecentTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};