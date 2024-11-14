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
    budget: Budget;
    spendingAnalysis: SpendingRecord[];  // Array to store spending records by month and year
    graphData?: any;  // Optional field for storing data to be used in graph representation
    _id?:Types.ObjectId
    createdAt: Date
  }

  export interface INoteInterface{

    title: string;
    content:string;
    updated: Date;
    date?:Date;
    time?:Date;
    user?:Types.ObjectId;

    createdAt: Date

  }
