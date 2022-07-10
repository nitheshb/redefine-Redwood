/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Fragment, useState, useEffect } from 'react'
import LLeadsTableView from 'src/components/LLeadsTableView/LLeadsTableView'

// import { XIcon } from '@heroicons/react/outline'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { useAuth } from 'src/context/firebase-auth-context'
import { USER_ROLES } from 'src/constants/userRoles'
import {
  getAllProjects,
  getLeadsByStatus,
  getLeadsByStatusUser,
  updateLeadAssigTo,
  updateLeadStatus,
} from 'src/context/dbQueryFirebase'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import SiderForm from '../SiderForm/SiderForm'
import CardItem from '../leadsCard'
import FinanceTableView from './financeTableView'

// import CustomerProfileSideView from './customerProfileSideView'
// import CardItem from '../../components/leadsCard'
// import BoardData from '../../components/board-data.json'
const BoardData = [
  {
    name: 'New',
    items: [
      {
        id: 1,
        priority: 2,
        title: 'Chiranjeevi',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 1,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 2,
        priority: 1,
        title: 'Pawan Kalyan',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 10,
        attachment: 4,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/67.jpg',
          },
        ],
      },
    ],
  },

  {
    name: 'Followup',
    items: [
      {
        id: 4,
        priority: 1,
        title: 'Raana',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 0,
        attachment: 3,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/79.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Visit Fixed',
    items: [
      {
        id: 5,
        priority: 1,
        title: 'Bala Krishna',
        mobile: 9000000001,
        project: 'Esparnza',
        chat: 0,
        attachment: 3,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/79.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Visit Done',
    items: [
      {
        id: 6,
        priority: 2,
        title: 'Mahesh Babu',
        mobile: 9000000001,
        project: 'Nakshatra Township',
        chat: 13,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 7,
        priority: 0,
        title: 'Shoban Babu',
        mobile: 9000000001,
        project: 'Projech High',
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/68.jpg',
          },
        ],
      },
    ],
  },
  {
    name: 'Negotiation',
    items: [
      {
        id: 8,
        priority: 0,
        title: 'NTR',
        mobile: 9000000001,
        project: 'Project High',
        chat: 13,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/75.jpg',
          },
        ],
      },
      {
        id: 9,
        priority: 1,
        title: 'Nagrjuna',
        mobile: 9000000001,
        project: 'Esparanza',
        chat: 0,
        attachment: 0,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/68.jpg',
          },
        ],
      },
      {
        id: 10,
        priority: 2,
        title: 'Ram Charan',
        mobile: 9000000001,
        project: 'Nakshatra Township',
        chat: 5,
        attachment: 2,
        assignees: [
          {
            avt: 'https://randomuser.me/api/portraits/men/64.jpg',
          },
        ],
      },
    ],
  },
]
// function createGuidId() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     const r = (Math.random() * 16) | 0,
//       v = c == 'x' ? r : (r & 0x3) | 0x8
//     return v.toString(16)
//   })
// }
const FinanceTransactionsHome = ({ leadsTyper }) => {
  const { user } = useAuth()
  const isImportLeads =
    user?.role?.includes(USER_ROLES.ADMIN) ||
    user?.role?.includes(USER_ROLES.SALES_MANAGER)
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)

  // kanban board
  const [ready, setReady] = useState(false)
  const [boardData, setBoardData] = useState(BoardData)
  // const [showForm, setShowForm] = useState(false)
  // const [selectedBoard, setSelectedBoard] = useState(0)
  const [openUserProfile, setopenUserProfile] = useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = useState('')
  const [selUserProfile, setSelUserProfile] = useState({})
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [serialLeadsData, setSerialLeadsData] = useState([])
  const [projectList, setprojectList] = useState([])
  const [selProjectIs, setSelProject] = useState('all')

  const statusFields = [
    'new',
    'followup',
    'visitfixed',
    'visitdone',
    'negotiation',
    'reassign',
    'RNR',
    'booked',
  ]
  const archieveFields = ['Dead', 'RNR', 'blocked', 'notinterested']
  useEffect(() => {
    getLeadsDataFun()
  }, [])

  useEffect(() => {
    if (leadsTyper == 'archieveLeads') {
      const archieveFields1 = ['Review', 'Cleared', 'rejected']
      setGetStatus(archieveFields1)
    } else if (leadsTyper == 'inProgress') {
      const archieveFields2 = [
        'new',
        'followup',
        'unassigned',
        'visitfixed',
        '',
        'visitdone',
        'negotiation',
        'reassign',
        'RNR',
      ]
      setGetStatus(archieveFields2)
    }
  }, [leadsTyper])

  useEffect(() => {
    const unsubscribe = getAllProjects(
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )

        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        console.log('fetched users list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setprojectList([])
    )

    return unsubscribe
  }, [])
  const [getStatus, setGetStatus] = useState([])
  const getLeadsDataFun = async () => {
    console.log('login role detials', user)
    const { access, uid } = user

    if (access?.includes('manage_leads')) {
      const unsubscribe = getLeadsByStatus(
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // setBoardData
          console.log('my Array data is ', usersListA)
          await serealizeData(usersListA)
          await setLeadsFetchedData(usersListA)
        },
        {
          status:
            leadsTyper === 'inProgress'
              ? [
                  'new',
                  'followup',
                  'unassigned',
                  'visitfixed',
                  '',
                  'visitdone',
                  'visitcancel',
                  'negotiation',
                  'reassign',
                  'RNR',
                  // 'booked',
                ]
              : leadsTyper === 'booked'
              ? ['booked']
              : archieveFields,
        },
        (error) => setLeadsFetchedData([])
      )
      return unsubscribe
    } else {
      const unsubscribe = getLeadsByStatusUser(
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // setBoardData
          console.log('my Array data is ', usersListA)
          await serealizeData(usersListA)
          await setLeadsFetchedData(usersListA)
        },
        {
          uid: uid,
          status:
            leadsTyper === 'inProgress'
              ? [
                  'new',
                  'followup',
                  'unassigned',
                  'visitfixed',
                  'visitcancel',
                  '',
                  'visitdone',
                  'negotiation',
                  'reassign',
                  'RNR',
                  // 'booked',
                ]
              : leadsTyper === 'booked'
              ? ['booked']
              : archieveFields,
        },
        (error) => setLeadsFetchedData([])
      )
      return unsubscribe
    }

    // await console.log('leadsData', leadsData)
  }

  const serealizeData = (array) => {
    // let newData =
    const x = statusFields.map((status) => {
      const items = array.filter((data) => data.Status.toLowerCase() == status)

      return { name: status, items }
    })
    setSerialLeadsData(x)
  }
  const onDragEnd = (re) => {
    console.log('re is', re)
    if (!re.destination) return
    const newBoardData = serialLeadsData
    const dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index]
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    )
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    )

    updateLeadStatus(
      re.draggableId,
      statusFields[parseInt(re.destination.droppableId)]
    )
    setBoardData(newBoardData)
  }

  // const onTextAreaKeyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     //Enter
  //     const val = e.target.value
  //     if (val.length === 0) {
  //       setShowForm(false)
  //     } else {
  //       const boardId = e.target.attributes['data-id'].value
  //       const item = {
  //         id: createGuidId(),
  //         title: val,
  //         priority: 0,
  //         chat: 0,
  //         attachment: 0,
  //         assignees: [],
  //       }
  //       const newBoardData = boardData
  //       newBoardData[boardId].items.push(item)
  //       setBoardData(newBoardData)
  //       setShowForm(false)
  //       e.target.value = ''
  //     }
  //   }
  // }

  const fSetLeadsType = (type) => {
    setAddLeadsTypes(type)
    setisImportLeadsOpen(true)
  }
  const selUserProfileF = (title, data) => {
    setAddLeadsTypes(title)
    setisImportLeadsOpen(true)
    setSelUserProfile(data)
  }
  return (
    <>
      <div className="">
        <div className="">
          <div
            className="
            p-6"
          >
            <div className="flex items-center justify-between py-2 ">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 leading-light">
                  Accounts Transactions Space
                </h2>
              </div>
              <div className="flex">
                {leadsTyper == 'inProgress' && (
                  <span className="inline-flex p-1 border bg-gray-200 rounded-md">
                    <button
                      className={`px-2 py-1  rounded ${
                        ready ? 'bg-white shadow' : ''
                      }`}
                      onClick={() => setReady(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                        />
                      </svg>
                    </button>
                    <button
                      className={`px-2 py-1  rounded ${
                        !ready ? 'bg-white shadow' : ''
                      }`}
                      onClick={() => setReady(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </span>
                )}
                <></>
              </div>
            </div>

            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />

            {!ready && (
              <div className="container overflow-hidden rounded-2xl">
                <div className="flex flex-col app-bg-white-1  pb-10">
                  <div className="flex flex-row py-5">
                    <span className="text-lg font-bold app-color-black"></span>
                  </div>

                  <div className="flex flex-row">
                    <div className="flex flex-col w-40 h-[60px] bg-white pl-5 py-1 mr-3 rounded-tl-2xl rounded-tr-2xl bg-white active">
                      <span className="text-xl app-color-blue-1 font-bold">
                        20
                      </span>
                      <span className="text-md app-color-blue-1 font-semibold">
                        All Transactions
                      </span>
                    </div>
                    <div className="flex flex-col w-40 h-[60px] bg-white pl-5 py-1 mr-3  rounded-tl-2xl rounded-tr-2xl bg-[#3569E7] ">
                      <span className="text-xl text-white font-bold">05</span>
                      <span className="text-md text-white font-semibold">
                        Latest
                      </span>
                    </div>

                    <div className="flex flex-col w-40 h-[60px] bg-white pl-5 py-1 mr-3  rounded-tl-2xl rounded-tr-2xl bg-[#3569E7] ">
                      <span className="text-xl text-white font-bold">05</span>
                      <span className="text-md text-white font-semibold">
                        Reviewing
                      </span>
                    </div>
                    <div className="flex flex-col w-40 h-[60px] bg-white pl-5 py-1 mr-3  rounded-tl-2xl rounded-tr-2xl bg-[#3569E7] ">
                      <span className="text-xl text-white font-bold">05</span>
                      <span className="text-md text-white font-semibold">
                        Cleared
                      </span>
                    </div>
                    <div className="flex flex-col w-40 h-[60px] bg-white pl-5 py-1 mr-3 rounded-tl-2xl rounded-tr-2xl bg-[#3569E7] ">
                      <span className="text-xl text-white font-bold">05</span>
                      <span className="text-md text-white font-semibold">
                        Rejected
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row bg-white p-10 relative">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="w-28"></th>
                          <th className="text-left text-xs app-color-black pb-5">
                            <span className="ml-4">FROM</span>
                          </th>
                          <th className="text-left text-xs app-color-black pb-5">
                            <span className="ml-4">To</span>
                          </th>
                          <th className="text-left text-xs app-color-black pb-5">
                            TRANSACTION DETAILS
                          </th>
                          <th className="text-right text-xs app-color-black pb-5">
                            <span className="mr-10">AMOUNT</span>
                          </th>

                          <th className="text-left text-xs app-color-black pb-5">
                            COMMENTS
                          </th>

                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            fromObj: {
                              name: 'Vikram Bose',
                              accountNo: '52346673647',
                              bankName: 'Andhara Bank',
                              branch: 'Hsr layout',
                            },
                            toAccount: {
                              name: 'Vertex Apartment',
                              accountNo: '52346673647',
                              bankName: 'Andhara Bank',
                              branch: 'Hsr layout',
                            },
                            projDetails: {
                              projName: 'Vertex Apartments',
                              projId: 123456,
                              unitId: 9876,
                            },
                            amount: 123000,
                            mode: 'Neft/Imps',
                            transactionNo: 12334,
                            demandNo: 3456,
                            transactionDate: '12-july-2022',
                            dated: '12-july-2022',
                            status: 'inreveiw',
                          },
                          {
                            fromObj: {
                              name: 'Varun Bose',
                              accountNo: '52346673647',
                              bankName: 'Andhara Bank',
                              branch: 'Hsr layout',
                            },
                            toAccount: {
                              name: 'Green Plots pvt',
                              accountNo: '52346673647',
                              bankName: 'HSBC  Bank',
                              branch: 'silk board layout',
                            },
                            projDetails: {
                              projName: 'Vertex Apartments',
                              projId: 123456,
                              unitId: 9876,
                            },
                            amount: 120003000,
                            mode: 'Neft/Imps',
                            transactionNo: 12334,
                            demandNo: 3456,
                            transactionDate: '12-july-2022',
                            dated: '12-july-2022',
                            status: 'inreview',
                          },
                          {
                            fromObj: {
                              name: 'Sujith',
                              accountNo: '52346673647',
                              bankName: 'Andhara Bank',
                              branch: 'Hsr layout',
                            },
                            toAccount: {
                              name: 'SRR Homes pvt',
                              accountNo: '52346673647',
                              bankName: 'ICICI  Bank',
                              branch: 'Hsr layout',
                            },
                            projDetails: {
                              projName: 'Vertex Apartments',
                              projId: 123456,
                              unitId: 9876,
                            },
                            amount: 123000,
                            mode: 'Neft/Imps',
                            transactionNo: 12334,
                            demandNo: 3456,
                            transactionDate: '12-july-2022',
                            dated: '12-july-2022',
                            status: 'cleared',
                          },
                          {
                            fromObj: {
                              name: 'Smitha Raj',
                              accountNo: '52346673647',
                              bankName: 'Andhara Bank',
                              branch: 'Hsr layout',
                            },
                            toAccount: {
                              name: 'Vertex Apartments Pvt',
                              accountNo: '52346673647',
                              bankName: 'Andhara Bank',
                              branch: 'Hsr layout',
                            },
                            projDetails: {
                              projName: 'Vertex Apartments',
                              projId: 123456,
                              unitId: 9876,
                            },
                            amount: 123000,
                            mode: 'Neft/Imps',
                            transactionNo: 12334,
                            demandNo: 3456,
                            transactionDate: '12-july-2022',
                            dated: '12-july-2022',
                            status: 'rejected',
                          },
                        ].map((dat, i) => (
                          <tr
                            className="app-border-1 border-y border-slate-200 my-2 py-2 h-[120px]"
                            key={i}
                          >
                            <td>
                              <div className="flex justify-center text-right items-center rounded-md w-8 h-8 app-bg-yellow-2 app-color-yellow-1 text-lg font-semibold">
                                {i + 1}
                              </div>
                              <div
                                className={`${
                                  dat?.status === 'cleared'
                                    ? 'bg-green-700'
                                    : dat?.status === 'rejected'
                                    ? 'bg-yellow-600'
                                    : 'bg-violet-600'
                                }   w-24 text-xs font-semibold px-3 py-0.5 rounded-br-md rounded-tl-md text-white`}
                              >
                                {dat?.status?.toLocaleUpperCase()}
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-row py-3 ml-4">
                                <div className="mr-2 w-[3px] rounded-2xl  bg-violet-300 "></div>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-sm app-color-black">
                                    {dat?.fromObj.name}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.fromObj.accountNo}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.fromObj.bankName}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.fromObj.branch}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-row ml-4 py-3">
                                <div className="mr-2 w-[3px] rounded-2xl bg-violet-300  "></div>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-sm app-color-black">
                                    {dat?.toAccount.name}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.toAccount.accountNo}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.toAccount.bankName}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.toAccount.branch}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex flex-row py-3">
                                {/* <div className="mr-2 w-[3px]  bg-gray-100 "></div> */}
                                <div className="flex flex-col">
                                  <span className="font-semibold text-sm app-color-black">
                                    {dat?.mode}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.transactionNo}
                                  </span>
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {dat?.dated}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="text-right">
                              <span className="text-right font-semibold text-sm app-color-gray-1 mr-10">
                                Rs {dat?.amount}
                              </span>
                            </td>

                            <td>
                              <span className="ml-3 font-semibold text-md app-color-gray-1">
                                NA
                              </span>
                            </td>
                            <td>
                              <svg
                                className="w-6 h-6 app-color-blue-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                ></path>
                              </svg>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* {!ready && (
              <FinanceTableView
                leadsFetchedData={leadsFetchedData}
                setisImportLeadsOpen={setisImportLeadsOpen}
                selUserProfileF={selUserProfileF}
                leadsTyper={leadsTyper}
              />
            )} */}
          </div>
        </div>
      </div>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={addLeadsTypes}
        customerDetails={selUserProfile}
      />
    </>
  )
}

export default FinanceTransactionsHome
