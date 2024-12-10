import Expense from '../models/Expense.js';

// Add Expense
export const addExpense = async (req, res, next) => {
    try {
        const { category, amount, comments } = req.body;
        const expense = await Expense.create({ user: req.user._id, category, amount, comments });
        res.status(201).json(expense);
    } catch (error) {
        next(error);
    }
};

// Get All Expenses
export const getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find({ user: req.user._id }).sort('-createdAt');
        res.status(200).json(expenses);
    } catch (error) {
        next(error);
    }
};

// Update Expense
export const updateExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });

        if (expense.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        Object.assign(expense, req.body);
        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        next(error);
    }
};

// Delete Expense
export const deleteExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });

        if (expense.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await expense.deleteOne();
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        next(error);
    }
};
