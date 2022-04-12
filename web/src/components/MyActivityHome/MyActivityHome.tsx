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
  steamUsersActivityOfUser,
  steamUsersList,
} from 'src/context/dbQueryFirebase'
import { TrashIcon } from '@heroicons/react/outline'
import { camalize } from 'src/util/camelCaseConv'
import { prettyDate, timeConv } from 'src/util/dateConverter'
import LeadsTeamReportBody from '../LeadsTeamReportBody'

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
    getLeadsDataFun(source)
    setSelDept('all')
  }, [source])

  useEffect(() => {
    console.log('what is the source', source)
  }, [source])

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
  const getLeadsDataFun = async (source) => {
    // const leadsData = await getUsersList()
    // setLeadsFetchedData(leadsData)
    // await console.log('leadsData', leadsData)
    if (source === 'team') {
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
    } else {
      const unsubscribe = steamUsersActivityOfUser(
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
  }

  const showOnlyDept = async (category) => {
    setSelDept(category)
  }
  return (

    <div className="flex flex-col">
     <LeadsTeamReportBody project={undefined} isEdit={undefined} />
    </div>
  )
}

export default MyActivityHome
