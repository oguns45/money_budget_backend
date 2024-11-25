import {model, Schema, Types} from 'mongoose'

  interface SpendingRecord {
    month: number;  // Represents the month (1-12)
    year: number;   // Represents the year (e.g., 2024)
    totalIncome: number;  // Total income for this period
    totalExpenses: number;  // Total expenses for this period
    categoryBreakdown: { [key: string]: number };  // Breakdown of expenses by category
  }

  
  interface Budget {
    income: number;
    expenses: number;
    categories: { [key: string]: number };
  }

  export interface UserInterface {
    email: string;
    password: string;
    username: string;
    budget?: Budget;
    spendingAnalysis?: SpendingRecord[];  // Array to store spending records by month and year
    graphData?: any;  // Optional field for storing data to be used in graph representation
    _id?:Types.ObjectId
    createdAt: Date
  }

  // Define the interface for the Expense document
  export interface IExpense extends Document {
    user: Types.ObjectId; // Reference to the user
    title: string;
    amount: number;
    type?: string;
    date: Date;
    category: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  // Define the Income Interface
  export interface IIncome extends Document {
    user: Types.ObjectId; // References the User model
    title: string; // Title of the income (e.g., "Salary", "Bonus")
    amount: number; // Amount of income
    type?: string; // Always set to "income"
    date: Date; // Date of the income entry
    category: string; // Category of income (e.g., "Job", "Investment")
    description: string; // Description or note for the income
    createdAt?: Date; // Timestamp for when the income entry was created (automatically added)
    updatedAt?: Date; // Timestamp for when the income entry was last updated (automatically added)
  }

  // Define the Budget Interface
  export interface IBudget extends Document {
    user: Types.ObjectId; // Reference to the user
    title: string;
    amount: number;
    type?: string;
    date: Date;
    category: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  // Define the DayEntry Interface
  export interface DayEntry {
    day: number; // Day of the month (1-31)
    dailyIncome: number; // Income recorded for the day
    dailyExpenses: number; // Expenses recorded for the day
    categoryExpenses: Record<string, number>; // Map of category name to expense amount
  }


  interface ICategory {
    [key: string]: number; // Category name as key, budget amount as value
  }
  