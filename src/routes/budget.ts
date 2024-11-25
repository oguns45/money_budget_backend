import express from 'express'
import { addBudget, getBudgets, updateBudget, deleteBudget } from '../controllers/budget'
import protect from '../middlewares/authMw'

const router = express.Router()

//router.get('/', )
router.post('/budget',  addBudget )
router.get('/budget/:userId',  getBudgets )
router.post('/budget/:id/:userId',  updateBudget)
router.delete('/budget/:id/:userId', deleteBudget);




export default router