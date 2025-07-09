import React, { useState, useEffect } from 'react';


const AddEmployeeDetails = () => {

  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    employeeId: '',
    email: '',
    password: '',
    department: '',
    role: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const ValidateUsername = (username) => {
    if (!username.trim()) {
      return `Username is required`;
    }
    if (username.length < 3) {
      return `Username must have atleast 3 characters`
    } return '';
  }

  const ValidateEmployeeId = (employeeId) => {
    if (!employeeId.trim()) {
      return `Employee Id is required`
    }
    if (!/^\d+$/.test(employeeId)) return 'Employee ID must be numeric';
    return '';
  }

  const ValidateEmail = (email) => {
    const Regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!Regex.test(email)) {
      return 'Enter a valid email';
    } return '';
  }

  const ValidatePassword = (password) => {
    if (!password.trim()) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must have atleast 6 characters';
    } return '';
  }

  const ValidateDepartment = (department) => {
    if (!department.trim()) {
      return 'Department is required';
    } return '';
  }
  const ValidateRole = (role) => {
    if (!role.trim()) return 'Role is required';
    return '';
  };

  useEffect(() => {
    const newError = {
      username: ValidateUsername(formData.username),
      employeeId: ValidateEmployeeId(formData.employeeId),
      email: ValidateEmail(formData.email),
      password: ValidatePassword(formData.password),
      department: ValidateDepartment(formData.department),
      role: ValidateRole(formData.role)
    };
    setError(newError);
    setIsFormValid(Object.values(newError).every((error) => error === ''));
  }, [formData]);



  const handle_Submit_Form = async (e) => {
    e.preventDefault();

    try {

      const SubmitRespone = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),

      });

      if (SubmitRespone.ok) {
        setFormData({
          username: '',
          employeeId: '',
          email: '',
          password: '',
          department: '',
          role: '',
        });
        alert("Employee Added successfully");
      }
      else {
        console.log("Error Occured!!");

      }
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-6 text-4xl font-bold text-center text-green-600">Add Employee Section</div>
      <div className="p-8 bg-white rounded shadow-md w-full max-w-2xl mx-auto">
        <form onSubmit={handle_Submit_Form} className="space-y-6">
          {/* Username */}
          <div className="flex items-center">
            <label className="w-40 font-medium">Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Name"
              className={`w-full p-3 border rounded-lg ${error.username
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
                } focus:outline-none focus:ring-2`}
            />
          </div>

          {/* Employee ID */}
          <div className="flex items-center">
            <label className="w-40 font-medium">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter Employee ID"
              className={`w-full p-3 border rounded-lg ${error.employeeId
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
                } focus:outline-none focus:ring-2`}
            />
          </div>

          {/* Email */}
          <div className="flex items-center">
            <label className="w-40 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className={`w-full p-3 border rounded-lg ${error.email
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
                } focus:outline-none focus:ring-2`}
            />
          </div>

          {/* Password */}
          <div className="flex items-center">
            <label className="w-40 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className={`w-full p-3 border rounded-lg ${error.password
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
                } focus:outline-none focus:ring-2`}
            />
          </div>

          {/* Department */}
          <div className="flex items-center">
            <label className="w-40 font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter Department"
              className={`w-full p-3 border rounded-lg ${error.department
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-green-400'
                } focus:outline-none focus:ring-2`}
            />
          </div>

          {/* Role - Radio Buttons */}
          <div className="flex items-center">
            <label className="w-40 font-medium">Role</label>
            <div className="flex gap-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Admin"
                  checked={formData.role === 'Admin'}
                  onChange={handleChange}
                />
                <span>Admin</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Employee"
                  checked={formData.role === 'Employee'}
                  onChange={handleChange}
                />
                <span>Employee</span>
              </label>
            </div>
          </div>


          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full ${isFormValid
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-300 cursor-not-allowed'
                } text-black p-3 rounded-lg font-semibold`}   >
              Add
            </button>
          </div>
        </form>
      </div>

    </div>
  )
};
export default AddEmployeeDetails;

