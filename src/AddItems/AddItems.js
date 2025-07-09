import { useState, useEffect } from "react";
import axios from 'axios';

const AddItems = () => {
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    rate: '',
    category_name: '',
    status: '',
  });

  const categoryOptions = [
    'Snacks',
    'Fast Food',
    'Contiental',
    'Indian',
  ]

  const validateName = (name) => {
    if (!name || !name.trim()) return "Enter Valid Name";
    if (name.length < 3) return "Name must have 3 characters";
    return '';
  };

  const validateQuantity = (quantity) => {
    if (!quantity || !quantity.trim()) return "Enter Valid Quantity";
    if (!/^\d+$/.test(quantity)) return "Quantity must be a number";
    return '';
  };

  const validateRate = (rate) => {
    if (!rate || !rate.trim()) return "Enter Valid Rate";
    if (!/^\d+(\.\d{1,2})?$/.test(rate)) return "Rate must be numeric";
    return '';
  };

  const validateCategory = (category) => {
    if (!category || !category.trim()) return "Enter Valid Category";
    return '';
  };

  const validateStatus = (status) => {
    const validStatuses = ["Available", "Unavailable"];
    if (!status || !status.trim()) return "Status is required";
    if (!validStatuses.includes(status)) return "Invalid Status";
    return '';
  };

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const newError = {
      name: validateName(formData.name),
      quantity: validateQuantity(formData.quantity),
      rate: validateRate(formData.rate),
      category_name: validateCategory(formData.category_name),
      status: validateStatus(formData.status),
    };
    setError(newError);
    setIsFormValid(Object.values(newError).every((e) => e === ''));
  }, [formData]);

  const handleChange = (e, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/items', formData);
      alert('Item added successfully');
      setFormData({ name: '', quantity: '', rate: '', category_name: '', status: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add item');
    }
  };

  return (
    <div className="flex-1 px-20 py-6">
      <h2 className="text-green-500 text-4xl font-bold mb-6 text-center">Add Items</h2>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {[
            { label: 'Name', key: 'name' },
            { label: 'Quantity', key: 'quantity' },
            { label: 'Rate', key: 'rate' }
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-gray-700 font-medium w-40">{label}</label>
              <input
                type="text"
                value={formData[key]}
                onChange={(e) => handleChange(e, key)}
                placeholder={`Enter ${label}`}
                className={`w-full p-3 border rounded-lg ${error[key] ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                  } focus:outline-none focus:ring-2`}
              />
            </div>
          ))}

          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium w-40">Category</label>
            <select
              value={formData.category_name}
              onChange={e => handleChange(e, 'category_name')}
              className={`w-full p-3 border rounded-lg ${error.category_name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                } focus:outline-none focus:ring-2`}
            >
              <option value="">Select Category</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700 font-medium w-40">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange(e, 'status')}
              className={`w-full p-3 border rounded-lg ${error.status ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-400'
                } focus:outline-none focus:ring-2`}
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full ${isFormValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'
                } text-black p-3 rounded-lg font-semibold`}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;