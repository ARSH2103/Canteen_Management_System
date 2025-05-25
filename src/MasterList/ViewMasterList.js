import React, { useState } from 'react'
const AvailableItmesInMasterList = [
  { name: 'Fish Burger', price: '$5.59', img: '🍔' },
  { name: 'Spicy Burger', price: '$5.59', img: '🌶️' },
  { name: 'Cheese Burger', price: '$5.59', img: '🧀' },
  { name: 'Cheese Burger', price: '$5.59', img: '🧀' },
  { name: 'Cheese Burger', price: '$5.59', img: '🧀' },
  { name: 'Cheese Burger', price: '$5.59', img: '🧀' },
  { name: 'Cheese Burger', price: '$5.59', img: '🧀' },
  { name: 'Cheese Burger', price: '$5.59', img: '🧀' },

];

const total_items_perpage = 12;

const ViewMasterList = () => {
  const[currPage , setCurrPage] = useState(1);

  const totalItemsInTheList = AvailableItmesInMasterList.length;

  const totalNoOfPages = totalItemsInTheList / total_items_perpage;

  const S_Index = (currPage - 1) * total_items_perpage;
  const currItem = AvailableItmesInMasterList.slice(S_Index , S_Index + total_items_perpage)

  const ChangePrev =()=>{
    setCurrPage((prev) => Math.max(prev-1 , 1));
  }

  const ChangeNext =()=>{
    setCurrPage((prev) => Math.max(prev+1 ,totalNoOfPages));
  }


  return (
    <div>
    <div className="flex-1 p-0">
       <h2 className="mt-2 text-lg font-semibold">Items Available</h2>
      <div className="grid grid-cols-4 gap-6 mt-4">

        {currItem.map((item, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-1 text-center">
            <div className="text-4xl">{item.img}</div>
            <h3 className="mt-2 font-bold">{item.name}</h3>
            <p className="text-yellow-500 mt-1">⭐⭐</p>
            <p className="mt-1">{item.price}</p>
          </div>
        ))}
      </div>  
      <div className="flex justify-end mt-6 space-x-1">
        <button
          onClick={ChangePrev}
          className="px-4 py-2 bg-green-400 rounded hover:bg-white font-bold"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
        </span>
        <button
          onClick={ChangeNext}
          className="px-4 py-2 bg-green-400 rounded hover:bg-white font-bold"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  )
}

export default ViewMasterList;
