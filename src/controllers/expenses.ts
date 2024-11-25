import { Request, Response } from 'express';
import Expense from '../models/Expenses';
import { IExpense } from '../utils/Interfaces';

// Add a new expense
export const addExpense = async (req: Request, res: Response): Promise<void> => {
    const { user, title, amount, category, description, date }: IExpense = req.body;

    try {
        // Validations
        if (!user || !title || !category || !description || !date) {
            res.status(400).json({ message: 'All fields are required!' });
            return;
        }
        if (amount <= 0 || typeof amount !== 'number') {
            res.status(400).json({ message: 'Amount must be a positive number!' });
            return;
        }

        const expense = new Expense({
            user,
            title,
            amount,
            category,
            description,
            date,
        });

        const savedExpense = await expense.save();
        res.status(200).json({ message: 'Expense Added', savedExpense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all expenses
export const getExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete an expense by ID
export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
    const { id, userId} = req.params;

    try {
        const deletedExpense = await Expense.findByIdAndDelete({_id: id, user: userId});

        if (!deletedExpense) {
            res.status(404).json({ message: 'Expense not found!' });
            return;
        }

        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
