import { Request, Response } from 'express';
import Budget from '../models/Budget';
import { IBudget } from '../utils/Interfaces';

// Add a new budget
// Add a new income
export const addBudget = async (req: Request, res: Response): Promise<void> => {
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

        const budget = new Budget({
            user,
            title,
            amount,
            category,
            description,
            date,
        });

        const savedBudget = await budget.save();
        res.status(201).json({ message: 'Income added successfully!', savedBudget });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


// Get all budgets for a specific user
export const getBudgets = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const budgets = await Budget.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ budgets });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budgets', error });
    }
};

// Update a specific budget
export const updateBudget = async (req: Request, res: Response): Promise<void> => {
    const { budgetId } = req.params;
    const updates = req.body;

    try {
        const updatedBudget = await Budget.findByIdAndUpdate(budgetId, updates, { new: true });

        if (!updatedBudget) {
            res.status(404).json({ message: 'Budget not found!' });
            return;
        }

        res.status(200).json({ message: 'Budget updated successfully', budget: updatedBudget });
    } catch (error) {
        res.status(500).json({ message: 'Error updating budget', error });
    }
};

// Delete a specific budget
export const deleteBudget = async (req: Request, res: Response) => {
    const { id, userId } = req.params;

    const user = req.user;

    try {
        const deletedBudget = await Budget.findOneAndDelete({ _id: id, user: userId });
        if (!deletedBudget) {
            return res.status(404).json({ message: 'Budget not found for this user.' });
        }
        res.status(200).json({ message: 'Budget deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting budget.', error });
    }
};

// export const deleteBudget = async (req: Request, res: Response) => {
//     const { id, userId } = req.params;

//     const user = req.user;

//     try {
//         const deletedBudget = await Budget.findOne({ _id: id });
//         if (!deletedBudget) {
//             return res.status(404).json({ message: 'Budget not found for this user.' });
//         }
//         if(user._id.toString() !== deletedBudget.user.toString()){
//             return res.status(404).json({ message: 'Budget not for this user.' })
//         }
//         await Budget.findOne({ _id: id });

//         res.status(200).json({ message: 'Budget deleted successfully.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting budget.', error });
//     }
// };