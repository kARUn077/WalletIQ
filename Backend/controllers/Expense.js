const Expenses = require('../models/expenseModel');

const addExpense = async (req, res) => {
    try {
        const { title, amount, date, category, description, user_id } = req.body;
        if (!title || !amount || !date || !category || !description || !user_id) {
            return res.status(400).send({ success: false, message: "All fields are required" });
        }
        if (amount < 0 || !amount === 'Number') {
            return res.status(400).send({ success: false, message: "Amount must be non negative integers" });
        }
        const expense = new Expenses({ title, amount, date, category, description, user_id });
        const createExpense = await expense.save();
        res.status(201).send({ success: true, message: "Expense added Successfully", createExpense });
    }
    catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

const getExpenses = async (req, res) => {
    try {
        const { user_id, category, sort } = req.query;
        let query = { user_id };
        if (category && category !== 'all') {
            query.category = category;
        }

        let sortOptions = { "createdAt": -1 };
        if (sort) {
            sortOptions = { "date": sort === 'asc' ? 1 : -1 };
        }

        const allExpenses = await Expenses.find(query).sort(sortOptions);
        res.status(200).send({ success: true, message: "Expense rendered Successfully", allExpenses });
    }
    catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

const deleteExpense = async (req, res) => {
    try {
        const _id = req.params.id;
        const deletedExpense = await Expenses.findByIdAndDelete({ _id });
        res.status(200).send({ success: true, message: "Expense Deleted successfully", deletedExpense });
    }
    catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

module.exports = { addExpense, getExpenses, deleteExpense };
