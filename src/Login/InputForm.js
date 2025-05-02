import React from 'react';
import LoginButton from './LoginButton';

const InputForm = () => {
  return (
    <div> 
      <form className="w-80 flex flex-col gap-5 p-8">
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
          {/* Calling the Login button over here which is a seperate component */}
          <LoginButton />
        </form>
    </div>
  )
}

export default InputForm;
