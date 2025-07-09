import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

const ViewMasterList = ({ cart, setCart }) => {
  const [masterItems, setMasterItems] = useState([]);
  const [currPage, setCurrPage] = useState(1);


  useEffect(() => {
    const fetchMasterItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/master-list');
        setMasterItems(response.data);
      } catch (error) {
        console.error('Error fetching master list:', error);
      }
    };
    fetchMasterItems();
  }, []);

  const handleAddToCart = (item) => {
  setCart(prev => {
    if (prev.find(i => i.id === item.id)) return prev;
    return [...prev, { ...item, quantity: 1 }];
  });
};

  const totalItems = masterItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIdx = (currPage - 1) * ITEMS_PER_PAGE;
  const currentItems = masterItems.slice(startIdx, startIdx + ITEMS_PER_PAGE);


  return (
    <div>
      <div className="flex justify-end text-sm text-black font-semibold mt-1 mr-4">
        Total Items: {totalItems}
      </div>

      <div className="mb-8 text-xl font-bold text-center text-green-600">
        View Master List
      </div>

      <div className="grid grid-cols-3 gap-6 mt-4">
        {currentItems.map((item, idx) => (
          <div
            key={item.id || idx}
            className="relative bg-white shadow rounded-lg p-3 text-center"
          >
            <div className="text-4xl">{item.img}</div>
            <h3 className="mt-2 font-bold">{item.name}</h3>
            <p className="text-yellow-500 mt-1">⭐⭐</p>
            <p className="mt-1">₹{item.price}</p>

            <button
              onClick={() => handleAddToCart(item)}
              className="absolute bottom-2 right-2 text-green-600 hover:text-green-800"
              title="Add to cart"
            >
              <Plus size={20} />
            </button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-3 items-center">
          <button
            onClick={() => setCurrPage(p => Math.max(p - 1, 1))}
            disabled={currPage === 1}
            className="px-4 py-1 bg-white border hover:bg-gray-100"
          >
            Previous
          </button>
          <span className="font-bold">{currPage}</span>
          <button
            onClick={() => setCurrPage(p => Math.min(p + 1, totalPages))}
            disabled={currPage === totalPages}
            className="px-4 py-1 bg-white border hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewMasterList;
