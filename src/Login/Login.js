import React, {} from 'react';
// import { useNavigate } from 'react-router-dom';

const Login = () => {

  return (
    <div className="relative w-full max-h-100% p-20 bg-gray-100 flex items-center justify-center overflow-hidden">
      {/* Signup Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-8 w-96 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-6">Enter Your Credentials to Login!</p>

        <form  className="w-full flex flex-col gap-4">
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold transition-all"
            
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          <a href='/'>Create a new Account</a>
        </p>
      </div>

     
    </div>
  );
};

export default Login;
