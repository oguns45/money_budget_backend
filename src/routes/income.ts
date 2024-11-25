// import express from 'express'
// import { addIncome, getIncomes, deleteIncome } from '../controllers/income'
// import protect from '../middlewares/authMw'

// const router = express.Router()

// //router.get('/', )
// router.post('/income',  addIncome )
// router.get('/income',  getIncomes )
// router.delete('/income/:id/:userId',  deleteIncome  )


// export default router

import express from 'express';
import { addIncome, getIncomes, deleteIncome } from '../controllers/income';
import protect from '../middlewares/authMw';

const router = express.Router();

// Route to add an income
router.post('/income', addIncome);

// Route to get incomes for a specific user
router.get('/income/:userId', getIncomes); // Notice the :userId parameter here

// Route to delete an income by its ID and user ID
router.delete('/income/:id/:userId', deleteIncome);

export default router;
