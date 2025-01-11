import React, { useState } from "react";
import "./index.css";

const TransactionStatus = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");

  const fetchStatus = () => {
    fetch(`http://localhost:5000/api/transactions/status/${orderId}`)
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch((err) => console.error("Error fetching transaction status:", err));
  };

  return (
    <div className="transaction-status">
      <h2>Transaction Status</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={fetchStatus}>Check Status</button>
      <p>Status: {status}</p>
    </div>
  );
};

export default TransactionStatus;