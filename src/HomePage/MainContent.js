import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
    const navigate = useNavigate();
  return (
    <div>
      <main className="flex flex-col items-center justify-center text-center flex-grow px-4 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          Canteen Management <br/> System
        </h1>
        <p className="text-lg mb-6 font-medium  mt-6">
          Welcome to the corporate office <br /> canteen management system!
        </p>
        <button className="bg-white text-black font-semibold px-6 py-2 rounded mb-10 hover:bg-gray-200 transition mt-6"
        onClick={()=>navigate('/Signup')}
        >
          Get Started
        </button>
        </main>
    </div>
  )
}

export default MainContent;
