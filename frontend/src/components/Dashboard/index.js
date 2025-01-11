import React, { useState, useEffect } from "react";
import "./index.css";
import UpdateTransactionStatus from '../UpdateTransactionStatus'; 

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

 
  const fetchTransactions = () => {
    fetch("https://edviron-assignment.onrender.com/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  };


  const updateTransactionStatus = (transactionId, status) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction._id === transactionId
          ? { ...transaction, status } 
          : transaction
      )
    );
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="dashboard">
      
      <UpdateTransactionStatus fetchTransactions={updateTransactionStatus} /> 
      <h2>All Transactions</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Collect ID</th>
            <th>School ID</th>
            <th>Gateway</th>
            <th>Order Amount</th>
            <th>Transaction Amount</th>
            <th>Status</th>
            <th>Custom Order Id</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction._id}</td>
              <td>{transaction.collect_id}</td>
              <td>{transaction.school_id}</td>
              <td>{transaction.gateway}</td>
              <td>{transaction.order_amount}</td>
              <td>{transaction.transaction_amount}</td>
              <td>{transaction.status}</td>
              <td>{transaction.custom_order_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
