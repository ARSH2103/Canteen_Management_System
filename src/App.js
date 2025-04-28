import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;