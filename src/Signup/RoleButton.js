import React from 'react';
import { useState } from 'react';

const RoleButton = () => {
  const [FormData, setFormData] = useState({
    username: '',
    employeeId: '',
    email: '',
    password: '',
    department: '',
    role: 'Admin',
  });
   // Creating the functiuon named as handleRoleChange which would change the role of the user according to the option selected by the user.
   const handleRoleChange = (role) => {
    setFormData((OldData) => ({
      // the below line is used to copy all the data as it is.(also Known as Spread operator). 
      ...OldData,role,
    }));
  };
  return (
    <div>
      <div className="flex justify-between gap-4">
            <button
              type="button"
              className={`w-1/2 py-2 rounded-lg ${
                // Using strick Operator over here to compare the role.
                // Also using the ternary condition over here for role option.
                FormData.role === 'Admin'
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
                FormData.role === 'Employee'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => handleRoleChange('Employee')}
            >
              Employee
            </button>
          </div> 
    </div>
  )
}

export default RoleButton;
