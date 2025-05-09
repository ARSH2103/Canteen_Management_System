import React from "react";

const Card = ({title , value , icon , bgcolour})=>{
 return (
    <div className={`p-6 rounded-2xl text-white shadow-md ${bgcolour}`}>
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm mt-10">{title}</div>
    </div>
 )

}

export default Card;