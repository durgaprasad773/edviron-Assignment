import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import SchoolTransactions from "./components/SchoolTransactions";
import TransactionStatus from "./components/TransactionStatus";
import UpdateTransactionStatus from "./components/UpdateTransactionStatus"; // Import UpdateTransactionStatus component

import "./App.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for the user's dark mode preference in localStorage when the app loads hello
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode"); // Apply dark mode class
    } else {
      document.body.classList.remove("dark-mode"); // Apply light mode class
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Save the user's preference in localStorage
      if (newMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
      return newMode;
    });
  };

  return (
    <Router>
      <div>
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/school-transactions" element={<SchoolTransactions />} />
          <Route path="/transaction-status" element={<TransactionStatus />} />
          <Route path="/update-status" element={<UpdateTransactionStatus />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;