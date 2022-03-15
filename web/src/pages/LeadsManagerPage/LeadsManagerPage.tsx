import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import ExecutiveHomeViewerPage from 'src/components/ExecutiveHomeViewerPage'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import HeadSideBar from 'src/components/HeadSideBar/HeadSideBar'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'
import UserAccessTable from 'src/components/UserAccessTable/UserAccessTable'
import TodayLeadsHomePage from 'src/components/TodayLeadsHomePage'

const LeadsManagerPage = () => {
  const [showSideBar, setShowSideBar] = useState(true)
  const [viewable, setViewable] = useState('Today')

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
          setViewable={setViewable}
        />

        <div className="flex flex-col flex-grow">
          <HeadNavBar />
          <div
            flex-grow
            p-6
            overflow-auto
            h-screen
            text-gray-700
            bg-gradient-to-tr
            from-blue-200
            via-indigo-200
            to-pink-200
          >
            {viewable === 'Today' && <ExecutiveHomeViewerPage />}
            {viewable === 'Today1' && <TodayLeadsHomePage />}
          </div>
        </div>
      </div>
    </>
  )
}

export default LeadsManagerPage
//
