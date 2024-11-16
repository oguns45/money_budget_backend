import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db'; 
import authRoutes from  './routes/auth'
import moneybudgetRoutes from './routes/moneybudget'
import budgetRoutes from './routes/budget'
import expensesRoutes from './routes/expenses'
import incomeRoutes from './routes/income'

import protect from './middlewares/authMw';


// 
dotenv.config()

// connect DB
db()

const app = express()
app.use(express.json())
app.use(cors())


app.use('/api', budgetRoutes) // auth  routes
app.use('/api', expensesRoutes) // auth  routes
app.use('/api', incomeRoutes) // auth  routes
app.use('/api', authRoutes) // auth  routes
app.use(protect)

const PORT =  process.env.PORT 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})