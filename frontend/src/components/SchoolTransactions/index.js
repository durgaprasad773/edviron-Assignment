import React, { useState } from "react";
import "./index.css";

const SchoolTransactions = () => {
  const [schoolId, setSchoolId] = useState("");
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    fetch(`https://edviron-assignment.onrender.com/api/transactions/school/${schoolId}`)
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching school transactions:", err));
  };

  return (
    <div className="school-transactions">
      <h2>School Transactions</h2>
      <input
        type="text"
        placeholder="Enter School ID"
        value={schoolId}
        onChange={(e) => setSchoolId(e.target.value)}
      />
      <button onClick={fetchTransactions}>Fetch Transactions</button>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.collect_id} - {transaction.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolTransactions;
