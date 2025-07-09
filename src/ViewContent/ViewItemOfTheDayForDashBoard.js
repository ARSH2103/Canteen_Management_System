import React from 'react'
const ItemsOfTheDayForDashBoardList = [
  { name: 'Dosa', price: '$5.59', img: '🍔' },
  { name: 'Dosa', price: '$5.59', img: '🍔' },
  { name: 'Dosa', price: '$5.59', img: '🍔' },
  { name: 'Dosa', price: '$5.59', img: '🍔' },

];

const MasterListOfTheDayForDashBoard = () => {
  return (

    <div>
      <div className="flex-1 p-0">
        <div className="grid grid-cols-4 gap-6 mt-4">
          {ItemsOfTheDayForDashBoardList.map((item, idx) => (
            <div key={idx} className="bg-white shadow rounded-lg p-4 text-center">
              <div className="text-4xl">{item.img}</div>
              <h3 className="mt-2 font-bold">{item.name}</h3>
              <p className="text-yellow-500 mt-1">⭐⭐⭐⭐</p>
              <p className="mt-1">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MasterListOfTheDayForDashBoard
