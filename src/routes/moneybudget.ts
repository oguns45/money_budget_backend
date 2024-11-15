import express from 'express'
import { createBudget , getUserBudgets, getBudgetById, updateTodayEntry, deleteBudget } from '../controllers/moneybudget'
import protect from '../middlewares/authMw'

const router = express.Router()

//router.get('/', )
router.post('/moneybudjet',  createBudget )
router.post('/moneybudjet',  getUserBudgets )
router.post('/moneybudjet',  getBudgetById )
router.post('/moneybudjet',  updateTodayEntry )
router.post('/moneybudjet',  deleteBudget )


export default router