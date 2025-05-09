import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 max-h-100 bg-white shadow-md p-4 border-r-2 over overflow-hidden">
      <h2 className="text-xl font-bold mb-6  text-green-700">🏢 Company</h2>
      <ul className="space-y-4  text-gray-700 font-medium   ">
       <a href=""> <li className="hover:text-green-600 mt-10">Dashboard</li></a>
       <a href="" > <li className="hover:text-green-600 mt-10">View Master List</li></a>
       <a href="" > <li className="hover:text-green-600 mt-11">Manage Item of the Day</li></a>
       <a href="" > <li className="hover:text-green-600 mt-11">Manage Employee</li></a>
       <a href="" > <li className="hover:text-green-600 mt-11">Manage Items</li></a>
       <a href="" > <li className="hover:text-green-600 mt-11">Add Money</li></a>
       <a href="" > <li className="hover:text-green-600 mt-11">Check Balance</li></a>
       <a href="" > <li className="hover:text-green-600 mt-11">Transaction Details</li></a>
      </ul>
    </div>
  );
};

export default Sidebar;
