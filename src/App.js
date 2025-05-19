import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import AdminDashboard from "./Admin_Dashboard/AdminDashboard";
import EmployeeDashboard from "./Employee_Dashboard/EmployeeDashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Admin-Dashboard" element={<AdminDashboard />} />
      <Route path="/Employee-Dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;