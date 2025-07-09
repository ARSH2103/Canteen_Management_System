import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SelectFromMasterList = () => {
  const [masterItems, setMasterItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/master-list')
      .then(res => setMasterItems(res.data))
      .catch(err => console.error('Error loading master list', err));
  }, []);

  const toggleSelect = (item) => {
    setSelectedItems(prev =>
      prev.find(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/items-of-the-day', { items: selectedItems });
      console.log(selectedItems);
      
      alert('Items of the Day saved!');
    } catch (err) {
      console.error('Submission error:', err);
    }
  };


  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-center text-2xl font-bold mb-4 text-green-600">Select Items from Master List</h2>

      <div className="grid grid-cols-3 gap-4">
        {masterItems.map(item => (
          <div
            key={item.id}
            className={`border p-4 rounded shadow cursor-pointer transition-all ${selectedItems.find(i => i.id === item.id) ? 'bg-green-100 border-green-600' : 'hover:bg-gray-100'
              }`}
            onClick={() => toggleSelect(item)}
          >
            <div className="text-4xl">{item.img}</div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-500">₹{item.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Save as Items of the Day
        </button>
      </div>
    </div>
  );
};

export default SelectFromMasterList;
