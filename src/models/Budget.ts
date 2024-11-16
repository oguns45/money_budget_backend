import { model, Schema, Types } from 'mongoose';
import { IBudget } from '../utils/Interfaces';

// Create the Budget Schema
const BudgetSchema: Schema<IBudget> = new Schema<IBudget>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12, // Ensure valid month numbers
        },
        year: {
            type: Number,
            required: true,
        },
        totalIncome: {
            type: Number,
            default: 0,
        },
        totalExpenses: {
            type: Number,
            default: 0,
        },
        categories: {
            type: Map,
            of: Number,
            default: {},
          },
        days: [
            {
                day: {
                    type: Number,
                    required: true,
                },
                dailyIncome: {
                    type: Number,
                    default: 0,
                },
                dailyExpenses: {
                    type: Number,
                    default: 0,
                },
                categoryExpenses: {
                    type: Map,
                    of: Number, // Map of category name to expense amount
                },
            },
        ],
    },
    { timestamps: true } // Automatically handle createdAt and updatedAt
);

// Export the Budget model
export default model<IBudget>('Budget', BudgetSchema);
