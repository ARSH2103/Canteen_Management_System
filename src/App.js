import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import AdminDashboard from "./Admin_Dashboard/AdminDashboard";
import EmployeeDashboard from "./Employee_Dashboard/EmployeeDashboard";
import AddEmployeeDetails from "./AddEmployee/AddEmployee";
import ViewMasterList from "./MasterList/ViewMasterList";
import ViewItemOfTheDay from "./ItemOfTheDay/ViewItemOfTheDay";
import CheckBalancePage from "./CheckBalancePage/CheckBalancePage";
import AddMoney from "./AddMoney/AddMoney";
import TransactionDetailsPage from "./TransactionDetails/TransactionDetails";
import PurchasePage from "./PurchasePage/Purchase";
import BuyThroughAdmin from "./BuyThroughAdmin/BuyThroughAdmin";
import ViewEmployeePage from "./ViewEmployeeDetails/ViewEmployee";
import { useState } from "react";




function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Admin-Dashboard" element={<AdminDashboard />} />
        <Route path="/Employee-Dashboard" element={<EmployeeDashboard />} />
        <Route path="/add-Employee" element={<AddEmployeeDetails />} />
        <Route path="/view-master-list" element={<ViewMasterList />} />
        <Route path="/view-item-of-the-day" element={<ViewItemOfTheDay />} />
        <Route path="/add-money" element={<AddMoney />} />
        <Route path="/Check-balance" element={<CheckBalancePage />} />
        <Route path="/transaction-details" element={<TransactionDetailsPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/Buy-admin" element={<BuyThroughAdmin />} />
        <Route path="/view-employee" element={<ViewEmployeePage />} />
        <Route path="/view-master-list" element={<ViewMasterList cart={cart} setCart={setCart} />} />
        <Route path="/purchase" element={<PurchasePage cart={cart} setCart={setCart} userId={1} />} />
      </Routes>
    </Router>
  );
}

export default App;