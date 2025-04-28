import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();
  return (
    <div>
        {/* Navbar section which consists of the company name along eith the login and signup buttons */}
      <header className="w-full flex justify-between items-center px-6 py-4">
        <div className="text-4xl font-bold">Company</div>
        <div className="space-x-4">
          <button
            
            className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 hover:text-black"
            onClick={()=>navigate('/Login')}
          >
            LOGIN
          </button>
          <button
            
            className="bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 hover:text-black"
            onClick={()=>navigate('/Signup')}
          >
            SIGNUP
          </button>
        </div>
      </header>
    </div>
  )
}

export default Header;
