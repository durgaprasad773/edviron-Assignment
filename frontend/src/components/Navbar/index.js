import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <nav className="navbar">
      <h1>EduPayPro</h1>
      <ul className="navbar-menu">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/school-transactions">School Transactions</Link></li>
        <li><Link to="/transaction-status">Transaction Status</Link></li>
       
      </ul>
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
};

export default Navbar;