import React, { useState } from 'react'


const Sidebar = ({ items, onHeadingClick, title }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (value) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  return (
    <div className="w-64 max-h-100 bg-blue-950 shadow-md p-4 border-r-2 over overflow-hidden">
      <h2 className="text-3xl font-bold mb-6 text-white">{title}</h2>
      <ul className="space-y-4 text-white max-h-120 text-m">
        {items.map((item, index) => (
          <div key={index}>
            {item.SubLabel ? (
              <>
                <li
                  className="cursor-pointer hover:text-green-600 mt-12"
                  onClick={() => toggleDropdown(item.value)}
                >
                  <span>{item.label}</span>
                  <span className='text-xs ml-8'>{openDropdowns[item.value] ? '▲' : '▼'}</span>
                </li>
                {openDropdowns[item.value] &&
                  item.SubLabel.map((subItem) => (
                    <div
                      key={subItem.value}
                      className="sidebar-subitem cursor-pointer hover:text-green-600"
                      onClick={() => onHeadingClick(subItem.value)}
                    >
                      {subItem.label}
                    </div>
                  ))}
              </>
            ) : (
              <li
                className="cursor-pointer hover:text-green-600 mt-12"
                onClick={() => onHeadingClick(item.value)}
              >
                {item.label}
              </li>
            )}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
