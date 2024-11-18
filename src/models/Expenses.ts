import { model, Schema, Types } from 'mongoose';
import { IExpense } from '../utils/Interfaces';

// Create the Expense Schema
const ExpenseSchema: Schema<IExpense> = new Schema<IExpense>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
        title: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50,
        },
        amount: {
            type: Number,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            default: "expense",
        },
        date: {
            type: Date,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            maxLength: 20,
            trim: true,
        },
    },
    { timestamps: true } // Automatically handle createdAt and updatedAt
);

// Export the Expense model
export default model<IExpense>('Expense', ExpenseSchema);
