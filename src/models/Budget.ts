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
            default: "budget",
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

// Export the Budget model
export default model<IBudget>('Budget', BudgetSchema);
