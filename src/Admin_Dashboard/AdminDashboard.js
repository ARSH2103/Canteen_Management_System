import React from "react";
import Sidebar from '../Employee_Dashboard/EmployeeSidebar'
import Card from "./DashboardCard";
import { useState } from "react";
import ViewMasterList from "../MasterList/ViewMasterList";
import AddEmployeeDetails from "../AddEmployee/AddEmployee";
import AddMoney from "../AddMoney/AddMoney";
// import ViewEmployeeDetails from "../ViewEmployee";
import AddItems from "../AddItems/AddItems";
import EditItems from "../Delete/EditItems/Delete/Edititems";
import CheckBalancePage from "../CheckBalancePage/CheckBalancePage";
import TransactionDetailsPage from "../TransactionDetails/TransactionDetails";
import ViewEmployeePage from "../ViewEmployeeDetails/ViewEmployee";
import UpdateQuantityPage from "../UpdateQuantity/UpdateQuantity";
import BuyThroughAdmin from "../BuyThroughAdmin/BuyThroughAdmin";
import ManageItemsOfTheDay from "../ManageItemsOfTheDay/SelectFromMasterList";
import PurchasePage from "../PurchasePage/Purchase";

const SideBarHeadings = [
  { label: "Dashboard", value: "dashboard" },
  { label: "View Master List", value: "ViewMasterList" },
  {
    label: "Manage Item of the Day", value: "manageitemoftheday",
    SubLabel: [
      { label: "Select From Master List", value: "selectfrommasterlist" },
      { label: "Update Quantity", value: "updatequantity" }
    ]
  },
  {
    label: "Manage Employee", value: "manageemployee",
    SubLabel: [
      { label: "Add Employee", value: "addEmployee" },
      { label: "View Employee", value: "viewEmployee" }
    ]
  },
  {
    label: "Manage Items", value: "manageitems",
    SubLabel: [
      { label: "Add Itmes", value: "addItems" },
      { label: "Edit/Delete Items", value: "editdeleteitems" }
    ]
  },
  { label: "Buy Through Admin", value: "buyAdmin" },
  { label: "Purchase", value: "purchase" },
  { label: "Check Balance", value: "checkBalance" },
  { label: "Transaction Details", value: "transactionDetails" }
]

const Dashboard = () => {


  const [currPage, setCurrPage] = useState('dashboard');

  const renderContent = () => {
    switch (currPage) {
      case "dashboard":
        return (
          <div className="bg-gray-100">
            <div className="flex-1 p-2" >
              <div className="mb-10 text-3xl font-bold text-center text-green-600">Dashboard</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ml-10">
                <Card title="Total Customers" value="" icon="👤" bgcolour="bg-green-500 w-60 h-50 mb-4" />
                <Card title="Total Invoice" value="" icon="📄" bgcolour="bg-pink-500 w-60 h-50  mb-4" />
                <Card title="Date" value="" icon="📅" bgcolour="bg-yellow-400 w-60 h-50  mb-4" />
                <Card title="Total Revenue" value="" icon="💰" bgcolour="bg-pink-600 w-60 h-50  mb-4" />
              </div>
            </div>
          </div>
        );
      case "ViewMasterList":
        return <ViewMasterList />;


      case "selectfrommasterlist":
        return <ManageItemsOfTheDay />;


      case "updatequantity":
        return <UpdateQuantityPage />;


      case "addEmployee":
        return <AddEmployeeDetails />;

      case "viewEmployee":
        return <ViewEmployeePage />;

      case "addItems":
        return <AddItems />;

      case "editdeleteitems":
        return <EditItems />;

      case "addMoney":
        return <AddMoney />;

      case "buyAdmin":
        return <BuyThroughAdmin />;

      case "purchase":
        return <PurchasePage userId={'11'}/>;

      case "checkBalance":
        return <CheckBalancePage userId={'11'} />;
        
      case "transactionDetails":
        return <TransactionDetailsPage userId={'8'} />;

      default:
        return <div>Page Not Found</div>
    }
  };

  return (

    <div className="flex min-h-screen bg-gray-100" >
      <Sidebar title="Company" items={SideBarHeadings} onHeadingClick={setCurrPage} />
      <div className="flex-1 p-6">{renderContent()}</div>
      <Card />

      <div className="flex min-h-screen bg-gray-100">



      </div>
    </div>
  )
}

export default Dashboard;
