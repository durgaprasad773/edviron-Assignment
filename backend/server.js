const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();

const app = express();


app.use(cors({
    origin: 'http://localhost:3000', 
  }));
  
app.use(express.json());
app.use('/api/transactions', transactionRoutes);

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI); 
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
    }
  };
  
  connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});