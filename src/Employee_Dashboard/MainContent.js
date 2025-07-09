import React from 'react'
import MasterListOfTheDayForDashBoard from '../ViewContent/ViewItemOfTheDayForDashBoard'
import ViewItemOfTheDay from '../ItemOfTheDay/ViewItemOfTheDay';
import { Link } from 'react-router-dom';

const MainContent = () => {

  return (

    <div className="flex-1 p-6">
      <h1 className="text-2xl mb-1 font-bold">Hello,Name</h1>
      <section className="mb-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold"></h2>
          <Link to="/view-item-of-the-day" className="text-sm text-orange-600 hover:underline">
            View all
          </Link>
        </div>
        <ViewItemOfTheDay />
      </section>

      <h2 className="flex justify-center text-2xl font-bold text-green-600 ">Items Available</h2>
      <section className="mb-2">
        <div className="flex justify-end items-center mb-4">
          <Link to="/view-master-list" className="text-sm text-orange-600 hover:underline">
            View all
          </Link>
        </div>
        <MasterListOfTheDayForDashBoard />
      </section>
    </div>


  )
}

export default MainContent
