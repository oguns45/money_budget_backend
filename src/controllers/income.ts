import { Request, Response } from 'express';
import Income from '../models/Income';
import { IIncome } from '../utils/Interfaces';

// Add a new income
export const addIncome = async (req: Request, res: Response): Promise<void> => {
    const { user, title, amount, category, description, date } = req.body;

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

        const income = new Income({
            user,
            title,
            amount,
            category,
            description,
            date,
        });

        const savedIncome = await income.save();
        res.status(201).json({ message: 'Income added successfully!', savedIncome });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get all incomes for a specific user
export const getIncomes = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        
        const incomes = await Income.find({ user: userId }).sort({ createdAt: -1 });
        console.log(incomes)

        if (!incomes || incomes.length === 0) {
            res.status(404).json({ message: 'No incomes found for this user.' });
            return;
        }

        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete an income by ID for a specific user
export const deleteIncome = async (req: Request, res: Response): Promise<void> => {
    const { id, userId } = req.params;

    try {
        const deletedIncome = await Income.findOneAndDelete({ _id: id, user: userId });

        if (!deletedIncome) {
            res.status(404).json({ message: 'Income not found!' });
            return;
        }

        res.status(200).json({ message: 'Income deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


