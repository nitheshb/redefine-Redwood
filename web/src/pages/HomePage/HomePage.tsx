import { useState, useEffect } from 'react'
import HeadNavBar from '../../components/HeadNavBar/HeadNavBar'
import DummyBodyLayout from '../../components/DummyBodyLayout/DummyBodyLayout'
import HeadSideBar from '../../components/HeadSideBar/HeadSideBar'
import SiderForm from '../../components/SiderForm/SiderForm'
import ProjectsMHomeBody from '../../components/ProjectsMHomeBody/ProjectsMHomeBody'
import HeadSideBarDetailView from 'src/components/HeadDetailSideBar'
import { MetaTags } from '@redwoodjs/web'
import { getAllProjects } from 'src/context/dbQueryFirebase'

const HomePage = () => {
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false)
  const [project, setProject] = useState({})
  const handleNewProjectClose = () => setIsNewProjectOpen(false)
  const handleEditProjectClose = () => setIsEditProjectOpen(false)
  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    const unsubscribe = getAllProjects(
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setProjects(projects)
      },
      () => setProjects([])
    )
    return unsubscribe
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <>
      <div className="flex w-screen h-screen text-gray-700">
        <div className="flex flex-col flex-grow">
          <HeadNavBar />
          <div className="flex flex-row overflow-auto  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <HeadSideBar pgName={'home'} />
            <HeadSideBarDetailView
              pgName={'leadsManager'}
              sourceLink={'projectsScreen'}
              showSideView1={undefined}
              setViewable={undefined}
            />
            <div className="flex-grow mx-4  my-2 items-center overflow-y-auto  h-screen  px-300  py-300">
              <div className="">
                <div className="flex items-center justify-between py-2  ">
                  <span className="relative z-10 flex items-center w-auto text-2xl font-bold leading-none pl-0">
                    Projects
                  </span>
                  <button
                    onClick={() => setIsNewProjectOpen(true)}
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
                    <span className="ml-2 leading-none">Add Project</span>
                  </button>
                </div>
              </div>

              {projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectsMHomeBody
                    key={project.uid}
                    project={project}
                    onSliderOpen={() => {
                      setProject(project)
                      setIsEditProjectOpen(true)
                    }}
                    isEdit={false}
                  />
                ))
              ) : (
                <DummyBodyLayout />
              )}
              <SiderForm
                open={isNewProjectOpen}
                setOpen={handleNewProjectClose}
                title="Create Project"
                data={{}}
              />
              <SiderForm
                open={isEditProjectOpen}
                setOpen={handleEditProjectClose}
                title="Edit Project"
                data={project}
              />
            </div>
          </div>
          <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />
        </div>
      </div>
    </>
  )
}

export default HomePage
