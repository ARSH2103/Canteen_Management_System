import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    // Used the useState for updating the values when the user enters the value.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isLoginFormValid = email.trim() !== '' && password.trim() !== '';

    const navigate = useNavigate();



  return (
    <div className="relative w-full h-100 p-20 bg-gray-100 flex items-center justify-center">

      {/* Login Form along with the details are inserted over here */}

      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-7 w-96 flex flex-col items-center">
        <h2 className="text-4xl font-bold">Welcome Back</h2>
        <p className="text-gray-500 mb-6 text-sm mt-3">Enter Your Credentials to Login!</p>
        
        <form className="w-80 flex flex-col gap-5 p-8">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />


          <button
              type="submit"
              disabled={!isLoginFormValid}
              className={`w-full ${
                isLoginFormValid
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-300 cursor-not-allowed'
              } text-white p-3 rounded-lg font-semibold transition-all`}
            >
              Login
            </button>
        </form>

        <p className="text-s text-gray-600 mt-6">
          <a href='/Signup' onClick={()=>navigate('/Signup')} >Create a new Account</a>
        </p>
      </div>

     
    </div>
  );
};

export default Login;
