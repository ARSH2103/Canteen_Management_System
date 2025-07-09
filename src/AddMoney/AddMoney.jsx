import React, { useState, useEffect } from 'react';
const AddMoney = () => {

  const [formData, setFormData] = useState({
    username: '',
    employeeId: '',
    email: '',
    Amount: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState({});

  const Validateusername = (username) => {
    if (!username.trim()) {
      return `Name is required`;
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
  const ValidateAmount = (Amount) => {
    if (!Amount.trim()) {
      return `Amount is required`
    }
    if (!/^\d+$/.test(Amount)) return 'Amount must be numeric';
    return '';
  }

  useEffect(() => {
    const newError = {
      username: Validateusername(formData.username),
      employeeId: ValidateEmployeeId(formData.employeeId),
      email: ValidateEmail(formData.email),
      Amount: ValidateAmount(formData.Amount),
    };
    setError(newError);
    setIsFormValid(Object.values(newError).every((error) => error === ''));
  }, [formData]);



  const handle_Submit_Form = async (e) => {
    e.preventDefault();
    try {

      const response = await fetch('http://localhost:3000/api/money', {

        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),

      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        alert("Money added successfully!");
        setFormData({ username: '', employeeId: '', email: '', Amount: '' });
      } else {
        alert(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      alert("Failed to connect to backend.");
    }
  };

  return (
    <div>
      <div className=" mt-8 mb-6 text-center text-4xl font-bold text-green-600">Add Money</div>
      <div className="p-8 mt-10 bg-white rounded shadow-md w-full max-w-2xl mx-auto">
        <form onSubmit={handle_Submit_Form} className="space-y-10">
          {[
            { label: 'Name', name: 'username' },
            { label: 'Employee ID', name: 'employeeId' },
            { label: 'Email', name: 'email' },
            { label: 'Amount', name: 'Amount', type: 'number' },
          ].map(({ label, name, type = 'text' }) => (
            <div className="flex items-center" key={name}>
              <label className="w-40  font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                required
                className={`w-full p-3 border rounded-lg ${error[name]
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-green-400"
                  } focus:outline-none focus:ring-2`}
              />

            </div>
          ))}

          <div className="flex justify-center text-xl">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full ${isFormValid
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-300 cursor-not-allowed'
                } text-black p-3 rounded-lg font-semibold`}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMoney;

