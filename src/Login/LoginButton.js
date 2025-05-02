import React from 'react';

const LoginButton = () => {
  return (
    <div>
      <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold transition-all"
          >
            Login
          </button>
    </div>
  )
}

export default LoginButton;
