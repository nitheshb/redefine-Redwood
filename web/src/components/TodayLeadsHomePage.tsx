/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Fragment, useState, useEffect } from 'react'
import LLeadsTableView from 'src/components/LLeadsTableView/LLeadsTableView'

import { XIcon } from '@heroicons/react/outline'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import SiderForm from './SiderForm/SiderForm'
import CardItem from './leadsCard'
import { useAuth } from 'src/context/firebase-auth-context'
import { USER_ROLES } from 'src/constants/userRoles'
import TodayLeadsActivityListHomeView from './TodayLeadsAcivityListHome'
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
    name: 'In Progress',
    items: [
      {
        id: 3,
        priority: 2,
        title: 'Venkatesh',
        mobile: 9000000001,
        project: 'Nakshatra Township',
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
    name: 'Follow Up',
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
function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
const TodayLeadsHomePage = () => {
  const { user } = useAuth()
  const isSalesManager =
    user?.role?.includes(USER_ROLES.ADMIN) ||
    user?.role?.includes(USER_ROLES.SALES_MANAGER)
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)

  // kanban board
  const [ready, setReady] = useState(false)
  const [boardData, setBoardData] = useState(BoardData)
  const [showForm, setShowForm] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState(0)
  const [openUserProfile, setopenUserProfile] = useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = useState('')
  const [selUserProfile, setSelUserProfile] = useState({})

  const onDragEnd = (re) => {
    if (!re.destination) return
    const newBoardData = boardData
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
    setBoardData(newBoardData)
  }

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value
      if (val.length === 0) {
        setShowForm(false)
      } else {
        const boardId = e.target.attributes['data-id'].value
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        }
        const newBoardData = boardData
        newBoardData[boardId].items.push(item)
        setBoardData(newBoardData)
        setShowForm(false)
        e.target.value = ''
      }
    }
  }

  const fSetLeadsType = (type) => {
    setAddLeadsTypes(type)
    setisImportLeadsOpen(true)
  }
  const selUserProfileF = (title, data) => {
    setAddLeadsTypes(title)
    setisImportLeadsOpen(true)
  }
  return (
    <>
      <div className="flex  flex-row  text-gray-700">
        <div className="flex-1 overflow-auto">
          <div className="flex-grow p-6 overflow-auto h-screen text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="flex items-center justify-between py-2 ">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 leading-light">
                  Today Activity
                </h2>
              </div>
              <div className="flex">
                <h1> hello</h1>
              </div>
            </div>

            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />
            {!ready && (
              <TodayLeadsActivityListHomeView
                setisImportLeadsOpen={setisImportLeadsOpen}
                selUserProfileF={selUserProfileF}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TodayLeadsHomePage
