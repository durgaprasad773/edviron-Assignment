const express = require('express');
const { getAllTransactions, getTransactionsBySchool, checkTransactionStatus, webhookStatusUpdate } = require('../controllers/transactionController');
const middleware=require('../utils/authMiddleware')
const router = express.Router();

router.get('/', getAllTransactions);
router.get('/school/:school_id', getTransactionsBySchool);
router.get('/status/:custom_order_id', checkTransactionStatus);

router.post('/webhookStatusUpdate', webhookStatusUpdate);

module.exports = router;