import { Request, Response } from 'express';
import MoneyBudget from '../models/MoneyBudget';

// Create a new budget entry for a specific user (Create)
export const createBudget = async (req: Request, res: Response) => {
    const { user, income, expenses, month, year } = req.body;

    if (!user || !month || !year) {
        return res.status(400).json({ message: 'User, month, and year are required.' });
    }

    try {
        const newBudget = new MoneyBudget({
            user,
            income: income || 0,
            expenses: expenses || 0,
            month,
            year,
            createdAt: new Date(),
            updated: new Date(),
            //days: []  // Initialize an empty array for daily entries
        });

        const savedBudget = await newBudget.save();
        res.status(201).json(savedBudget);
    } catch (error) {
        res.status(500).json({ message: 'Error creating budget.', error });
    }
};

// Retrieve all budgets for a specific user (Read)
export const getUserBudgets = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const budgets = await MoneyBudget.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving budgets.', error });
    }
};

// Retrieve a single budget by ID and user (Read)
export const getBudgetById = async (req: Request, res: Response) => {
    const { id, userId } = req.params;

    try {
        const budget = await MoneyBudget.findOne({ _id: id, user: userId });
        if (!budget) {
            return res.status(404).json({ message: 'Budget not found for this user.' });
        }
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving budget.', error });
    }
};

// Update today's entry for a specific user (Update)
// Update today's entry for a specific user (Update)
export const updateTodayEntry = async (req: Request, res: Response) => {
    const { id, userId } = req.params;  // Budget ID and user ID
    const { dailyIncome, dailyExpenses } = req.body;  // Daily income and expenses from request body

    if (dailyIncome === undefined && dailyExpenses === undefined) {
        return res.status(400).json({ message: 'Please provide either daily income or daily expenses to update.' });
    }

    try {
        const today = new Date();
        const day = today.getDate();  // Current day of the month (1-31)

        const budget = await MoneyBudget.findOne({ _id: id, user: userId });

        if (!budget) {
            return res.status(404).json({ message: 'Budget not found for this user.' });
        }

        // Initialize 'days' array if it's undefined
        if (!budget.days) {
            budget.days = [];
        }

        // Find or create today's entry in 'days'
        const todayEntry = budget.days.find(entry => entry.day === day);

        if (todayEntry) {
            todayEntry.dailyIncome = dailyIncome ?? todayEntry.dailyIncome;
            todayEntry.dailyExpenses = dailyExpenses ?? todayEntry.dailyExpenses;
        } else {
            budget.days.push({
                day,
                dailyIncome: dailyIncome || 0,
                dailyExpenses: dailyExpenses || 0,
                categoryExpenses: {}  // Initialize an empty object for category expenses
            });
        }

        budget.updated = new Date();

        const updatedBudget = await budget.save();
        res.status(200).json(updatedBudget);

    } catch (error) {
        res.status(500).json({ message: 'Error updating today\'s entry.', error });
    }
};


// Delete a budget by ID and user (Delete)
export const deleteBudget = async (req: Request, res: Response) => {
    const { id, userId } = req.params;

    try {
        const deletedBudget = await MoneyBudget.findOneAndDelete({ _id: id, user: userId });
        if (!deletedBudget) {
            return res.status(404).json({ message: 'Budget not found for this user.' });
        }
        res.status(200).json({ message: 'Budget deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting budget.', error });
    }
};
