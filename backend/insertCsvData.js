const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const dotenv = require('dotenv');
const Transaction = require('./models/Transaction'); 

dotenv.config();

// MongoDB URI
const URI = process.env.MONGO_URI;


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

const csvFilePath = './dummyData.csv';  


const transactions = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    transactions.push({
      collect_id: row.collect_id,
      school_id: row.school_id,
      gateway: row.gateway,
      order_amount: parseFloat(row.order_amount),
      transaction_amount: parseFloat(row.transaction_amount),
      status: row.status,
      custom_order_id: row.custom_order_id
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
    
    Transaction.insertMany(transactions)
      .then(() => {
        console.log('Dummy data inserted');
        mongoose.connection.close();
      })
      .catch((err) => {
        console.log('Error inserting dummy data:', err);
        mongoose.connection.close();
      });
  });