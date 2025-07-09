import React from "react";

const Card = ({ title, value, icon, bgcolour, textSize = "text-3xl" }) => {
  return (
    <div className={`p-6 rounded-2xl text-black shadow-md ${bgcolour} `}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-medium mt-10">{title}</div>
    </div>
  )

}

export default Card;