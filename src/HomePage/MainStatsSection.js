import { useState , useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

const MainStatsSection = () => {
     // Created a fucntion named navigate which uses useNavigate function which would help to direct the user to the another pages.

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
    <div>
         <main className="flex flex-col items-center justify-center text-center flex-grow px-4 py-3">
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
  )
}

export default MainStatsSection;
