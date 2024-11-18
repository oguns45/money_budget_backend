import { model, Schema } from 'mongoose';
import { IIncome } from '../utils/Interfaces';

// Create the Income Schema
const IncomeSchema: Schema<IIncome> = new Schema<IIncome>(
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
            default: "income",
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

// Export the Income model
export default model<IIncome>('Income', IncomeSchema);
