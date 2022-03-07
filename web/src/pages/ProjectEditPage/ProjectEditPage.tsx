import { Fragment, useState } from 'react'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'
import DummyBodyLayout from '../../components/DummyBodyLayout/DummyBodyLayout'
import HeadSideBar from '../../components/HeadSideBar/HeadSideBar'
import SiderForm from '../../components/SiderForm/SiderForm'
import ProjectsMHomeBody from '../../components/ProjectsMHomeBody/ProjectsMHomeBody'

import ProjPhaseHome from '../../components/ProjPhaseHome/ProjPhaseHome'

const ProjectEditPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOnClose = () => setIsOpen(false)

  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        <HeadSideBar />
        <div className="flex flex-col flex-grow">
          <HeadNavBar />
          <div className="flex-grow p-6 overflow-auto  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex items-center flex-shrink-0 h-16 px-0  pl-0  ">
              {/* <h1 className="text-lg font-medium">redefine.</h1> */}
              <span className="relative z-10 flex items-center w-auto text-xl  leading-none pl-0">
                PROJECTS
              </span>
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center h-10 px-4  bg-gray-200 ml-auto text-sm font-medium rounded hover:bg-gray-300"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="ml-2 leading-none">New Project</span>
              </button>
            </div>
            {/* <button className="flex items-center justify-center h-10 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="ml-2 leading-none">New Item</span>
            </button> */}
            <ProjectsMHomeBody />
            {/* <ProjectsMHomeBody />
            <ProjectsMHomeBody /> */}
            <ProjPhaseHome />
            <DummyBodyLayout />
            <SiderForm
              open={isOpen}
              setOpen={handleOnClose}
              title="Create Project"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectEditPage
