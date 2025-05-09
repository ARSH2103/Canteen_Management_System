import React from "react";
import Sidebar from './Sidebar'
import Card from "./DashboardCard";


const Dashborad = () => {
  return (
    <div>
        <Sidebar />
        <Card />

    <div className="flex min-h-screen bg-gray-100">

      <div className="flex-1 p-4">

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Card title="Total Customers" value="" icon="👤" bgcolour="bg-green-500 w-80 h-60"  />
          <Card title="Total Invoice" value="" icon="📄" bgcolour="bg-pink-500 w-80 h-60" />
          <Card title="Date" value="" icon="📅" bgcolour="bg-yellow-400 w-80 h-60" />
          <Card title="Total Revenue" value="" icon="💰" bgcolour="bg-pink-600 w-80 h-60" />
        </div>
      </div>
        
      
    </div>
  </div>
  )
}

export default Dashborad;
