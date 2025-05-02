import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from './InputForm';

const Login = () => {

  const navigate = useNavigate();



  return (
    <div className="relative w-full h-100 p-20 bg-gray-100 flex items-center justify-center">
      {/* Login Form along with the details are inserted over here */}
      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-7 w-96 flex flex-col items-center">
        <h2 className="text-4xl font-bold">Welcome Back</h2>
        <p className="text-gray-500 mb-6 text-sm mt-3">Enter Your Credentials to Login!</p>
        
        <InputForm />

        <p className="text-s text-gray-600 mt-6">
          <a onClick={()=>navigate('/Signup')} >Create a new Account</a>
        </p>
      </div>

     
    </div>
  );
};

export default Login;
