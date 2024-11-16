import express from 'express'
import { addIncome, getIncomes, deleteIncome } from '../controllers/income'
import protect from '../middlewares/authMw'

const router = express.Router()

//router.get('/', )
router.post('/income',  addIncome )
router.get('/income',  getIncomes, )
router.delete('/income/:id/:userId',  deleteIncome  )


export default router