import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import Dashboard from "./Admin_Dashboard/Dashboard";
import EmployeeDashboard from "./Employee_Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Admin-Dashboard" element={<Dashboard />} />
      <Route path="/Employee-Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;