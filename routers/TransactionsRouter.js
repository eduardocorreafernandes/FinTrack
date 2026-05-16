import express from 'express';
import TransactionController from '../controllers/TransactionsController.js';

const router = express.Router();

router.post('/', TransactionController.CreateTransaction);
router.get('/', TransactionController.GetTransactions);
router.put('/:id', TransactionController.UpdateTransaction);
router.delete('/:id', TransactionController.DeleteTransaction);

export default router;