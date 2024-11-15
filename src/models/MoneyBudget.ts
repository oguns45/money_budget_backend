// import { model, Schema, Types } from 'mongoose';
// import { IMoneyBudgetInterface } from '../utils/Interfaces';

// const moneyBudgetSchema = new Schema<IMoneyBudgetInterface>({
//   user: {
//     type: Schema.Types.ObjectId, // Use Schema.Types.ObjectId for better compatibility
//     ref: 'User', // Reference to User model
//     required: true,
//   },
//   income: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   expenses: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   categories: {
//     type: Map, // Map to store budget or spending by category
//     of: Number,
//     default: {}, // Defaults to an empty object
//   },
//   month: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 12,
//   },
//   year: {
//     type: Number,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updated: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default model<IMoneyBudgetInterface>('MoneyBudget', moneyBudgetSchema);



import { model, Schema, Types } from 'mongoose';
import { IMoneyBudgetInterface } from '../utils/Interfaces';

const moneyBudgetSchema = new Schema<IMoneyBudgetInterface>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  income: {
    type: Number,
    required: true,
    default: 0,
  },
  expenses: {
    type: Number,
    required: true,
    default: 0,
  },
  categories: {
    type: Map,
    of: Number,
    default: {},
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  year: {
    type: Number,
    required: true,
  },
  // New 'days' field to track daily expenses
  days: [
    {
      day: { type: Number, required: true }, // Day of the month
      dailyIncome: { type: Number, default: 0 }, // Income for this day
      dailyExpenses: { type: Number, default: 0 }, // Expenses for this day
      categoryExpenses: { type: Map, of: Number, default: {} }, // Optional: Breakdown by category for the day
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

export default model<IMoneyBudgetInterface>('MoneyBudget', moneyBudgetSchema);