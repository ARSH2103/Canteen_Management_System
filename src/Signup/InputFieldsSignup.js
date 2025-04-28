import React from 'react';

const InputFieldsSignup = () => {
  return (
    <div>
      <input
            type="text"
            name="Username"
            placeholder="Username"
            required
            className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="EmployeeId"
            placeholder="Employee ID"
            required
            className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            required
            className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            name="Password"
            placeholder="Password"
            required
            className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="text"
            name="Department"
            placeholder="Department"
            required
            className="w-full p-3  mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
    </div>
  )
}

export default InputFieldsSignup;
