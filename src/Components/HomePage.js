import React, { useEffect, useState } from "react";


const HomePage = () => {

  // Using the usestate so that we can change the states when the numbers are changing.
  const [employeeCount, setEmployeeCount] = useState(0);
  const [dailyTransactions, setDailyTransactions] = useState(0);
  const [availableItems, setAvailableItems] = useState(0);
  
  useEffect(() => {
    // The fetchstats would call the function once when the component is loaded.
    fetchStats();

  }, []);

  // Creating the function to get the live data from the server.
  const fetchStats = async () => {
    try 
    {
      const response = await fetch("http://localhost:5000/api/stats");
      const data = await response.json();
      setEmployeeCount(data.totalEmployees);
      setDailyTransactions(data.dailyTransactions);
      setAvailableItems(data.availableItems);
    } 
    catch (error)
    {
      console.error("Failed to fetch the stats from the Backend:", error);
    }
  };

  return (
    
    <div className="min-h-screen bg-[#219C89] text-white flex flex-col">
      {/* Navbar section which consists of the company name along eith the login and signup buttons */}
      <header className="w-full flex justify-between items-center px-6 py-4">
        <div className="text-4xl font-bold">Company</div>
        <div className="space-x-4">
          <button
            
            className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 hover:text-black"
          >
            LOGIN
          </button>
          <button
            
            className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 hover:text-black"
          >
            SIGNUP
          </button>
        </div>
      </header>

      {/* Main content section which would have the welcome message and the heading  */}
      <main className="flex flex-col items-center justify-center text-center flex-grow px-4 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          Canteen Management <br/> System
        </h1>
        <p className="text-lg mb-6 font-medium  mt-6">
          Welcome to the corporate office <br /> canteen management system!
        </p>
        <button className="bg-white text-black font-semibold px-6 py-2 rounded mb-10 hover:bg-gray-200 transition mt-6">
          Get Started
        </button>



        {/* These are the main stats section which would be updated as soon the backend updation is done */}

        <div className="flex flex-col md:flex-row gap-6 pb-10">
          <div className="bg-gray-200 text-black rounded-xl shadow-md p-6 text-center w-64">
            <div className="text-3xl font-bold">{employeeCount}</div>
            <div className="text-sm mt-2 font-medium">Total Employees</div>
          </div>
          <div className="bg-gray-200 text-black rounded-xl shadow-md p-6 text-center w-64">
            <div className="text-3xl font-bold">{dailyTransactions}</div>
            <div className="text-sm mt-2 font-medium">Daily Transaction</div>
          </div>
          <div className="bg-gray-200 text-black rounded-xl shadow-md p-6 text-center w-64">
            <div className="text-3xl font-bold">{availableItems}</div>
            <div className="text-sm mt-2 font-medium">Available Items</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;