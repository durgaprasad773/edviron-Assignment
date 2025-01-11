const Transaction = require('../models/Transaction');


exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactionsBySchool = async (req, res) => {
    console.log("School ID:", req.params.school_id);  
    try {
      const transactions = await Transaction.find({ school_id: req.params.school_id });
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.checkTransactionStatus = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ custom_order_id: req.params.custom_order_id });
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateTransactionStatus = async (req, res) => {
  try {
    const { custom_order_id, status } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { custom_order_id },
      { status },
      { new: true }
    );
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.webhookStatusUpdate = async (req, res) => {
    const { transaction_id, status } = req.body;
  
    if (!transaction_id || !status) {
      return res.status(400).json({ message: 'Missing transaction_id or status' });
    }
  
    try {
   
      const transaction = await Transaction.findOneAndUpdate(
        { _id: transaction_id },
        { $set: { status } },
        { new: true }  
      );
  
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
  
      res.json({ message: 'Transaction status updated', transaction });
    } catch (error) {
      res.status(500).json({ message: 'Error updating transaction status', error: error.message });
    }
  };
  