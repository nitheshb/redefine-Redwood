import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import ExecutiveHomeViewerPage from 'src/components/ExecutiveHomeViewerPage'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import HeadSideBar from 'src/components/HeadSideBar/HeadSideBar'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'
import UserAccessTable from 'src/components/UserAccessTable/UserAccessTable'
import TodayLeadsHomePage from 'src/components/TodayLeadsHomePage'
import LeadsManagementHome from 'src/components/LeadsManagement'
import LeadsTeamReportBody from 'src/components/LeadsTeamReportBody'
import MyAttedanceHomeBody from 'src/components/myAttedanceHomeBody'
import MyPayHomeBody from 'src/components/myPayHomeBody'
import MyLeadsReportHome from 'src/components/myLeadsReportHome'

const LeadsManagerPage = () => {
  const [showSideBar, setShowSideBar] = useState(true)
  const [viewable, setViewable] = useState('Today1')

  const showSideView1 = () => {
    console.log('iam clicked', showSideBar)
    setShowSideBar(!showSideBar)
  }
  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        {/* {showSideBar && <HeadSideBar pgName={'leadsManager'} />}
        <HeadSideBarDetailView
          pgName={'leadsManager'}
          sourceLink={'leadsScreen'}
          showSideBar={showSideBar}
          showSideView1={showSideView1}
          setViewable={setViewable}
        /> */}

        <div className="flex flex-col flex-grow">
          <HeadNavBar />
          <div className="flex flex-row overflow-auto  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            {showSideBar && <HeadSideBar pgName={'leadsManager'} />}
            <HeadSideBarDetailView
              pgName={'leadsManager'}
              sourceLink={'leadsScreen'}
              showSideBar={showSideBar}
              showSideView1={showSideView1}
              setViewable={setViewable}
              viewable={viewable}
            />
            <div className="flex-grow mx-4  my-2 items-center overflow-y-auto  px-300  py-300">
              {viewable === 'inProgress' && (
                <ExecutiveHomeViewerPage leadsTyper={'inProgress'} />
              )}
              {viewable === 'archieveLeads' && (
                <ExecutiveHomeViewerPage leadsTyper={'archieveLeads'} />
              )}
              {viewable === 'Today1' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'Upcoming' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'Today1Team' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'UpcomingTeam' && (
                <TodayLeadsHomePage taskType={viewable} />
              )}
              {viewable === 'LeadsManagerHome' && <LeadsManagementHome />}
              {viewable === 'Team Lead Report' && (
                <LeadsTeamReportBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Team Leads Report',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'My Lead Report' && (
                <MyLeadsReportHome
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'My Leads Report',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'Attendance' && (
                <MyAttedanceHomeBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Attendance',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'Pay' && (
                <MyPayHomeBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Pay',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
              {viewable === 'LinkWhatsApp' && (
                <LeadsTeamReportBody
                  project={{
                    area: 1000,
                    builderName: 'hello',
                    location: 'local',
                    projectName: 'Pay',
                    projectType: 'aprtment',
                  }}
                  isEdit={false}
                />
              )}
            </div>
            {/* <div className="flex-grow mx-4  my-2 items-center overflow-y-auto  h-screen  px-300  py-300"> */}
            {/* {viewable === 'Today' && <ExecutiveHomeViewerPage />} */}
            {/* {viewable === 'Today1' && <TodayLeadsHomePage />} */}
            {/* {viewable === 'LeadsManagerHome' && <LeadsManagementHome />} */}
            {/* </div> */}
            {/* <div
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
              {viewable === 'LeadsManagerHome' && <LeadsManagementHome />}
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default LeadsManagerPage
//
