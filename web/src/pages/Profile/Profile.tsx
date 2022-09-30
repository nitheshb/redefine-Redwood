import React from 'react'

import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import HeadNavBar from 'src/components/HeadNavBar/HeadNavBar'
import HeadSideBar from 'src/components/HeadSideBar/HeadSideBar'

import bg from '../../../public/group7.png'
const Profile = () => {
  return (
    <div>
      <h1 className="text-5xl text-[#2B2A35] ">My Profile</h1>
      <p className=" text-lg">It’s awesome to have you with us.</p>
      {/* div for making the profile card */}
      <div className="md:w-[20vw] flex flex-col justify-between items-center md:h-[50vh] rounded-md bg-gray-100">
        <img className="w-full relative mt-4 " src={bg} alt="bg profile" />
        <div className=" w-32 h-32 absolute mt-4 bg-gray-400 rounded-full "></div>
        <div>
          {' '}
          <p className=" font-semibold text-2xl text-center ">Nithesh</p>
          <small className="font-medium  text-gray-500 ">
            nitheshb@gmail.com
          </small>
        </div>

        <p className=" mb-4 font-medium text-gary-600 ">
          Redefine user since sept 2021
        </p>
      </div>
      {/* div for making change the details  */}
      <section className="md:w-[30vw] flex flex-col justify-between items-center md:h-[50vh] rounded-md bg-gray-100">
        <div className="w-full px-4 border-b-2 flex flex-row py-4 items-center justify-between">
          {' '}
          <p className="text-2xl">Personal Details</p>{' '}
          <button className=" h-10 w-40 bg-gray-400 hover:bg-blue-300 rounded-full ">
            Update
          </button>
        </div>
        <form className="flex flex-col ">
          <label className="text-left text-sm text-gray-300">Full Name</label>
          <input
            type="text"
            className=" border-b-2 my-2 bg-transparent  "
            placeholder="Enter your name "
          />
        </form>
      </section>
    </div>
  )
}

export default Profile
