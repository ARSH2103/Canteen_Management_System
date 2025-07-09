import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewItemsOfTheDay = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/items-of-the-day')
      .then(res => setItems(res.data))
      .catch(err => console.error('Error fetching items of the day', err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-center text-2xl font-bold mb-4 text-green-600">Items of the Day</h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white border p-4 rounded shadow text-center">
            <div className="text-4xl">{item.img}</div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-500">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewItemsOfTheDay;
