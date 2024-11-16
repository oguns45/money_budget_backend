import express from 'express'
import { addExpense, getExpense, deleteExpense} from '../controllers/expenses'
import protect from '../middlewares/authMw'

const router = express.Router()

//router.get('/', )
router.post('/expenses',  addExpense )
router.get('/expenses',   getExpense )
router.delete('/expenses/:id/:userId', deleteExpense )



export default router