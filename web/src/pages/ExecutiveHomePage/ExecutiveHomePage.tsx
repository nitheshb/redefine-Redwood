import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Fragment, useState } from 'react'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'
import DummyBodyLayout from '../../components/DummyBodyLayout/DummyBodyLayout'
import HeadSideBar from '../../components/HeadSideBar/HeadSideBar'
import SiderForm from '../../components/SiderForm/SiderForm'
import CallExecutiveBoard from '../../components/CallExecutiveBoard/CallExecutiveBoard'

const ExecutiveHomePage = () => {
  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        <HeadSideBar pgName={'executiveHome'} />
        <div className="flex flex-col flex-grow">
          <HeadNavBar />
          <div className="flex-grow p-6 overflow-auto  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex items-center flex-shrink-0 h-16 px-0  pl-0  ">
              {/* <h1 className="text-lg font-medium">redefine.</h1> */}
              <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0">
                Projects
              </span>
            </div>
   
            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />

            <h1>ExecutiveHomePage</h1>
            <p>
              Find me in{' '}
              <code>
                ./web/src/pages/ExecutiveHomePage/ExecutiveHomePage.tsx
              </code>
            </p>
            <p>
              My default route is named <code>executiveHome</code>, link to me
              with `<Link to={routes.executiveHome()}>ExecutiveHome</Link>`
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExecutiveHomePage
