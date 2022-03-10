/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { EyeIcon, PencilIcon, PlusCircleIcon } from '@heroicons/react/outline'

import { ClockIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  deleteUser,
  getLedsData1,
  getUsersList,
  steamUsersActivityLog,
  steamUsersList,
} from 'src/context/dbQueryFirebase'
import { TrashIcon } from '@heroicons/react/outline'
import { camalize } from 'src/util/camelCaseConv'
import { prettyDate, timeConv } from 'src/util/dateConverter'

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper1@gmail.com',
    reporting: 'nithe.nithesh@gmail.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@gmail.com',
    reporting: 'nithe.nithesh@gmail.com',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]
const MyActivityHome = ({ source }) => {
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [selDept, setSelDept] = useState('')
  useEffect(() => {
    getLeadsDataFun()
    setSelDept('all')
  }, [])

  useEffect(() => {}, [source])

  useEffect(() => {
    let filData
    console.log('what is this', leadsFetchedData)
    setFilterData(leadsFetchedData)
    return
    if (selDept === 'all') {
      setFilterData(leadsFetchedData)
    } else {
      console.log(
        ' what am i ',
        selDept,
        leadsFetchedData.filter((userD) => userD.department === selDept)
      )
      setFilterData(
        leadsFetchedData.filter(
          (userD) =>
            userD.department === selDept || userD?.department?.includes(selDept)
        )
      )
    }
  }, [selDept, leadsFetchedData])
  const getLeadsDataFun = async () => {
    // const leadsData = await getUsersList()
    // setLeadsFetchedData(leadsData)
    // await console.log('leadsData', leadsData)

    const unsubscribe = steamUsersActivityLog(
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setLeadsFetchedData(usersListA)
      },
      (error) => setLeadsFetchedData([])
    )
    return unsubscribe
  }

  const showOnlyDept = async (category) => {
    setSelDept(category)
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <section className="flex ml-auto mt-[18px]  bg-white  py-4">
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'all'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('all')}
            >
              <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
              All
            </span>
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'admin'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('admin')}
            >
              ADMIN
            </span>

            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'crm'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('crm')}
            >
              CRM
            </span>
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'HR'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('HR')}
            >
              HR
            </span>
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'legal'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('legal')}
            >
              LEGAL
            </span>
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'project'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('project')}
            >
              PROJECT
            </span>
            <span
              className={`flex ml-2 items-center h-6 px-3 text-xs font-semibold cursor-pointer  active:bg-pink-200 active:text-pink-800 rounded-full ${
                selDept === 'sales'
                  ? 'text-pink-800 bg-pink-200 border-pink-200'
                  : 'border border-pink-400 text-pink-500'
              } `}
              onClick={() => showOnlyDept('sales')}
            >
              SALES
            </span>
          </section>
          <div className="">
            <div className="p-5 mb-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              {/* <time className="text-lg font-semibold text-gray-900 dark:text-white">
                January 13th, 2022
              </time> */}
              {filterData.map((activity, ind) => (
                <>
                  <time className="text-lg font-semibold text-gray-900 dark:text-white">
                    {prettyDate(filterData[ind - 1]?.time) ===
                    prettyDate(activity?.time)
                      ? ''
                      : prettyDate(activity?.time)}
                  </time>
                  <section key={ind} className="border-b">
                    <a
                      href="#"
                      className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <PlusCircleIcon className="mr-3 mb-3 w-10 h-10 rounded-full sm:mb-0" />
                      <div className="text-gray-600 dark:text-gray-400">
                        <div className="text-base font-normal">
                          <span className="font-medium text-green-900 dark:text-white">
                            {activity?.type?.toUpperCase()}
                          </span>{' '}
                          by{' '}
                          <span className="text-sm text-red-900 dark:text-white">
                            {activity?.by}
                          </span>{' '}
                        </div>
                        <div className="text-sm font-normal">
                          {activity?.txt}
                        </div>
                        <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                          {/* <svg
                          className="mr-1 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                            clipRule="evenodd"
                          ></path>
                        </svg> */}

                          <ClockIcon className="mr-1 w-3 h-3" />
                          {timeConv(activity?.time).toLocaleString()}
                        </span>
                      </div>
                    </a>
                  </section>
                </>
              ))}
            </div>
            <div className="p-5 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <time className="text-lg font-semibold text-gray-900 dark:text-white">
                January 12th, 2022
              </time>
              <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                <li>
                  <a
                    href="#"
                    className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <img
                      className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                      alt="Laura Romeros image"
                    />
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Laura Romeros
                        </span>{' '}
                        likes{' '}
                        <span className="font-medium text-gray-900 dark:text-white">
                          Bonnie Green's
                        </span>{' '}
                        post in{' '}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {' '}
                          How to start with Flowbite library
                        </span>
                      </div>
                      <div className="text-sm font-normal">
                        "I wanted to share a webinar zeroheight."
                      </div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <svg
                          className="mr-1 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          ></path>
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
                        </svg>
                        Private
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <img
                      className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                      src="/docs/images/people/profile-picture-2.jpg"
                      alt="Mike Willi image"
                    />
                    <div>
                      <div className="text-base font-normal text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Mike Willi
                        </span>{' '}
                        react to{' '}
                        <span className="font-medium text-gray-900 dark:text-white">
                          Thomas Lean's
                        </span>{' '}
                        comment
                      </div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <svg
                          className="mr-1 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Public
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <img
                      className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                      src="/docs/images/people/profile-picture-5.jpg"
                      alt="Jese Leos image"
                    />
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Jese Leos
                        </span>{' '}
                        likes{' '}
                        <span className="font-medium text-gray-900 dark:text-white">
                          Bonnie Green's
                        </span>{' '}
                        post in{' '}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {' '}
                          How to start with Flowbite library
                        </span>
                      </div>
                      <div className="text-sm font-normal">
                        "I wanted to share a webinar zeroheight."
                      </div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <svg
                          className="mr-1 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Public
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <img
                      className="mr-3 mb-3 w-12 h-12 rounded-full sm:mb-0"
                      src="/docs/images/people/profile-picture-3.jpg"
                      alt="Bonnie Green image"
                    />
                    <div className="text-gray-600 dark:text-gray-400">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Bonnie Green
                        </span>{' '}
                        likes{' '}
                        <span className="font-medium text-gray-900 dark:text-white">
                          Bonnie Green's
                        </span>{' '}
                        post in{' '}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {' '}
                          Top figma designs
                        </span>
                      </div>
                      <div className="text-sm font-normal">
                        "I wanted to share a webinar zeroheight."
                      </div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <svg
                          className="mr-1 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          ></path>
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"></path>
                        </svg>
                        Private
                      </span>
                    </div>
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyActivityHome
