import React, {useState,useEffect} from 'react';
import axios from 'axios';


const Signup = () => {
  //Used the useState hook so that the the formData coul be updated and shown using setFormData
  const [formData, setFormData] = useState({
    username: '',
    employeeId: '',
    email: '',
    password: '',
    department: '',
    role: 'Admin',
  });

  const [error , setError] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


  const ValidateUsername = (username) =>{
    if(!username.trim())
    {
      return `Username is required`;
    }
    if(username.length <3)
    {
      return `Username must have atleast 3 characters`
    }return '';
  }

  const ValidateEmployeeId = (employeeId) =>{
    if(!employeeId.trim())
    {
      return `Employee Id is required`
    }
        if (!/^\d+$/.test(employeeId)) return 'Employee ID must be numeric';
return '';
  }

  const ValidateEmail = (email) =>{
    const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email.trim())
    {
      return 'Email is required';
    }
    if(!Regex.test(email))
    {
      return 'Enter a valid email';
    }return '';
  }

  const ValidatePassword = (password)=>{
    if(!password.trim())
    {
      return 'Password is required';
    }
    if(password.length <6)
    {
      return 'Password must have atleast 6 characters';
    }return '';
  }

  const ValidateDepartment = (department)=>{
    if(!department.trim())
    {
      return 'Department is required';
    }return '';
  }

   useEffect(() => {
    const newError = {
      username: ValidateUsername(formData.username),
      employeeId: ValidateEmployeeId(formData.employeeId),
      email: ValidateEmail(formData.email),
      password: ValidatePassword(formData.password),
      department: ValidateDepartment(formData.department),
    };
    setError(newError);
    setIsFormValid(Object.values(newError).every((error) => error === ''));
  }, [formData]);


  // Creating the functiuon named as handleRoleChange which would change the role of the user according to the option selected by the user.
  const handleRoleChange = (role) => {
  setFormData((OldData) => ({
      // the below line is used to copy all the data as it is.(also Known as Spread operator). 
      ...OldData,  role
     }));
  };

  // const navigate = useNavigate();

  // Created the Funtion handleSubmit which would handle when the form is been submitted.
  const handleSubmit = async (error) => {
    error.preventDefault();
    
    try 
    {
      const res = await axios.post('http://localhost:3000/signup', formData);
      alert(res.data.message);
      window.location.href='/Login'
    }catch(error){
      alert("Signup Failed");
    }
  };

  return (
    <div className="relative w-full max-h-100 p-2 bg-gray-100 flex items-center justify-center overflow-hidden">
      {/* Signup Card */}
      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-8 w-96 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Sign up</h2>
        <p className="text-gray-500 mb-6">Create Your Account</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}          
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
           {formData.username !== '' && error.username && (
             <p className="text-red-500 text-sm mt-1">{error.username}</p>
           )}
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
            {formData.employeeId !== '' && error.employeeId && (
             <p className="text-red-500 text-sm mt-1">{error.employeeId}</p>
           )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
           {formData.email !== '' && error.email && (
             <p className="text-red-500 text-sm mt-1">{error.email}</p>
           )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
           {formData.password !== '' && error.password && (
             <p className="text-red-500 text-sm mt-1">{error.password}</p>
           )}

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
            {formData.department !== '' && error.department && (
             <p className="text-red-500 text-sm mt-1">{error.department}</p>
           )}

          {/* Role Selection */}
          <div className="flex justify-between gap-4">
            <button
              type="button"
              className={`w-1/2 py-2 rounded-lg ${
                formData.role === 'Admin'
                // Using strick Operator over here to compare the role.
                // Also using the ternary condition over here for role option.
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => handleRoleChange('Admin')}
            >
              Admin
            </button>
            <button
              type="button"
              className={`w-1/2 py-2 rounded-lg ${
                formData.role === 'Employee'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => handleRoleChange('Employee')}
            >
              Employee
            </button>
          </div>

          <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full ${
                isFormValid
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-300 cursor-not-allowed'
              } text-white p-3 rounded-lg font-semibold transition-all`}
            >
              SignUp
            </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          <a href='/Login'>Already have an account? </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
