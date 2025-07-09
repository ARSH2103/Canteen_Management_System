import React from 'react'
import Sidebar from './EmployeeSidebar';
import MainContent from './MainContent';
import ViewMasterList from '../MasterList/ViewMasterList';
import { useState } from 'react';
import ViewItemOfTheDay from '../ItemOfTheDay/ViewItemOfTheDay'
import AddMoney from '../AddMoney/AddMoney';
import CheckBalancePage from '../CheckBalancePage/CheckBalancePage';
import TransactionDetailsPage from '../TransactionDetails/TransactionDetails';
import PurchasePage from '../PurchasePage/Purchase';


const SideBarHeadings = [
  { label: "Dashboard", value: "dashboard" },
  { label: "View Master List", value: "ViewMasterList" },
  { label: "View Item of the Day", value: "ViewItem" },
  { label: "Purchase", value: "purchase" },
  { label: "Check Balance", value: "balance" },
  { label: "Transaction Details", value: "transactions" }
]

const EmployeeDashboard = () => {
  const [currPage, setCurrPage] = useState('dashboard');

  const renderContent = () => {
    switch (currPage) {
      case "dashboard":
        return <MainContent />;

      case "ViewMasterList":
        return <ViewMasterList />;

      case "ViewItem":
        return <ViewItemOfTheDay />;

      case "addMoney":
        return <AddMoney />;

      case "balance":
        return <CheckBalancePage userId={'4692'} />;

      case "transactions":
        return <TransactionDetailsPage userId={'9'} />;

      case "purchase":
        return <PurchasePage userId={'4692'} />;

      default:
        return <div>Page Not Found</div>;
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar title="Company" items={SideBarHeadings} onHeadingClick={setCurrPage} />

      <div className="flex-1 p-6 overflow-auto">{renderContent()}</div>
    </div>

  )
}

export default EmployeeDashboard;
