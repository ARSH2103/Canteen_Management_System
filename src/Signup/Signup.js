import React, {useState} from 'react';
import SignupButton from './SignupButton';
import InputFieldsSignup from './InputFieldsSignup';
import RoleButton from './RoleButton';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const navigate = useNavigate();

  //Used the useState hook so that the the formData coul be updated and shown using setFormData
  const [formData, setFormData] = useState({
    username: '',
    employeeId: '',
    email: '',
    password: '',
    department: '',
    role: 'Admin',
  });


  // Created the Funtion handleSubmit which would handle when the form is been submitted.
  const handleSubmit = (error) => {
    error.preventDefault();

    // Logging the details entered by the user onto the console.
    console.log(formData);
    alert('Signup successful!.');
    navigate('/login');
  };



  return (
    <div className="relative w-full max-h-100 p-2 bg-gray-100 flex items-center justify-center overflow-hidden">
      {/* Signup Page with the following entries which would be stored into the database for further login purpose */}
      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-8 w-96 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Sign up</h2>
        <p className="text-gray-500 mb-6">Create Your Account!</p>

        <form onSubmit={handleSubmit}  className="w-full flex flex-col gap-4">

          {/* Passing props to the following fields */}
          <InputFieldsSignup formData={formData} setFormData={setFormData}/>
          <RoleButton  formData={formData} setFormData={setFormData}  />
          <SignupButton />
          
        </form>

        <p className="text-sm text-gray-600 mt-6">
          <a onClick={() => navigate('/Login')}>Already have an account? </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;