import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import ExecutiveHomeViewerPage from 'src/components/ExecutiveHomeViewerPage'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import HeadSideBar from 'src/components/HeadSideBar/HeadSideBar'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'

const LeadsManagerPage = () => {
  const [showSideBar, setShowSideBar] = useState(true)

  const showSideView1 = () => {
    console.log('iam clicked', showSideBar)
    setShowSideBar(!showSideBar)
  }
  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        {showSideBar && <HeadSideBar pgName={'leadsManager'} />}
        <HeadSideBarDetailView
          pgName={'leadsManager'}
          sourceLink={'leadsScreen'}
          showSideBar={showSideBar}
          showSideView1={showSideView1}
        />

        <div className="flex flex-col flex-grow">
          <HeadNavBar />
          <ExecutiveHomeViewerPage />
        </div>
      </div>
    </>
  )
}

export default LeadsManagerPage
//
