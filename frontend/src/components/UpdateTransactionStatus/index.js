import React, { useState } from 'react';
import './index.css'

const UpdateTransactionStatus = ({ fetchTransactions }) => {  
  const [transactionId, setTransactionId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!transactionId || !status) {
      setError('Please provide both transaction ID and status.');
      return;
    }
  
    try {
      // Log the data you're sending to ensure it's correct
      console.log({
        transaction_id: transactionId,
        status: status,
      });
  
      const response = await fetch('http://localhost:5000/api/transactions/webhookStatusUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction_id: transactionId,
          status: status,
        }),
      });
  
      // Check if the response status is OK
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error from server:", errorData);  // Log the server error response
        throw new Error(errorData.message || 'Failed to update status');
      }
  
      const data = await response.json();
      console.log('Success response:', data);  
      if (data.message) {
        setMessage(data.message);
        setError('');

        
        fetchTransactions(transactionId, status);  
      }
    } catch (err) {
      setError(err.message || 'Error updating transaction status');
      setMessage('');
      console.error('Error during update:', err);  
    }
  };
  
  return (
    <div>
      <h2>Update Transaction Status</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="transactionId">Transaction ID:</label>
          <input
            type="text"
            id="transactionId"
            value={transactionId}
            onChange={handleTransactionIdChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" value={status} onChange={handleStatusChange} required>
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <button type="submit">Update Status</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateTransactionStatus;