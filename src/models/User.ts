import {model, Schema, Types} from 'mongoose'
import { UserInterface } from '../utils/Interfaces'





const userSchema = new Schema<UserInterface>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    budget: {
        income: { type: Number, default: 0 },
        expenses: { type: Number, default: 0 },
        categories: { type: Map, of: Number, default: {} }  // Storing categories as key-value pairs
    },
    spendingAnalysis: [
        {
            month: { type: Number, required: true },
            year: { type: Number, required: true },
            totalIncome: { type: Number, default: 0 },
            totalExpenses: { type: Number, default: 0 },
            categoryBreakdown: { type: Map, of: Number, default: {} }
        }
    ],
    graphData: { type: Schema.Types.Mixed, default: {} },  // Optional field for data to be used in charts or graphs
    createdAt: {
        type: Date,
        default: Date.now
    }
})



export default model('User', userSchema)