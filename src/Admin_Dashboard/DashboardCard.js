import React from "react";

const Card = ({title , value , icon , bgcolour})=>{
 return (
    <div className={`p-6 rounded-2xl text-white shadow-md ${bgcolour} `}>
      <div className="text-8xl mb-2">{icon}</div>
      <div className="text-8xl font-bold">{value}</div>
      <div className="text-medium mt-10">{title}</div>
    </div>
 )

}

export default Card;