import React, {} from 'react';
import SignupButton from './SignupButton';
import InputFieldsSignup from './InputFieldsSignup';
import RoleButton from './RoleButton';



const Signup = () => {
  // const navigate = useNavigate();
  return (
    <div className="relative w-full max-h-100 p-2 bg-gray-100 flex items-center justify-center overflow-hidden">
      {/* Signup Page with the following entries which would be stored into the database for further login purpose */}
      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-8 w-96 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Sign up</h2>
        <p className="text-gray-500 mb-6">Create Your Account!</p>

        <form className="w-full flex flex-col gap-4">
          <InputFieldsSignup />
          <RoleButton />
          <SignupButton />
        </form>

        <p className="text-sm text-gray-600 mt-6">
          <a href='/'>Already have an account? </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
