import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateQuantityPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/items-of-the-day')
      .then(res => setItems(res.data))
      .catch(err => console.error('Error loading items:', err));
  }, []);

  const handleQuantityChange = (id, newQty) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleUpdate = async () => {
    try {
      const payload = items.map(({ id, quantity }) => ({ id, quantity: parseInt(quantity) || 0 }));
      await axios.put('http://localhost:3000/api/items-of-the-day', {
        items: payload,
      });
      alert('Quantities updated!');
    } catch (err) {
      console.error('Error updating quantities:', err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Update Item Quantities</h2>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between border p-4 rounded shadow">
            <div>
              <div className="text-lg font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500">Price: ₹{item.price}</div>
            </div>
            <input
              type="number"
              min={1}
              value={item.quantity || 1}
              onChange={e => handleQuantityChange(item.id, parseInt(e.target.value || '1'))}
              className="border rounded p-1 w-20"
            />
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleUpdate}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Update Quantities
        </button>
      </div>
    </div>
  );
};

export default UpdateQuantityPage;