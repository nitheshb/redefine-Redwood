/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react'

import { ArrowRightIcon } from '@heroicons/react/outline'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useAuth } from 'src/context/firebase-auth-context'
import {
  addLeadScheduler,
  addSchedulerLog,
  deleteSchLog,
  steamLeadActivityLog,
  steamLeadScheduleLog,
  steamUsersList,
  steamUsersListByRole,
  updateLeadAssigTo,
  updateLeadStatus,
  updateSchLog,
} from 'src/context/dbQueryFirebase'
import { useDropzone } from 'react-dropzone'
import PlusCircleIcon from '@heroicons/react/solid/PlusCircleIcon'
import ClockIcon from '@heroicons/react/solid/ClockIcon'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'
import {
  getDifferenceInHours,
  getDifferenceInMinutes,
  timeConv,
} from 'src/util/dateConverter'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DateTimePicker } from '@mui/lab'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import { TextField } from '@mui/material'
import TimePicker from '@mui/lab/TimePicker'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

// interface iToastInfo {
//   open: boolean
//   message: string
//   severity: AlertColor
// }
const people = [
  { name: 'Priority 1' },
  { name: 'Priority 2' },
  { name: 'Priority 3' },
  { name: 'Priority 4' },
]
const statuslist = [
  { label: 'Select the Status', value: '' },
  { label: 'New', value: 'new' },
  { label: 'Follow Up', value: 'followup' },
  { label: 'Visit Fixed', value: 'visitfixed' },
  { label: 'Visit Done', value: 'visitdone' },
  { label: 'Negotiation', value: 'Negotiation' },
  { label: 'RNR', value: 'rnr' },
  { label: 'Booked', value: 'booked' },
  { label: 'Not Interested', value: 'notinterested' },
  { label: 'Dead', value: 'Dead' },
]
export default function CustomerProfileSideView({
  openUserProfile,
  customerDetails,
}) {
  console.log('customer Details', customerDetails)
  const { user } = useAuth()
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  // const [leadStatus, setLeadStatus] = useState([])
  const [selFeature, setFeature] = useState('appointments')
  const [leadStatus, setLeadStatus] = useState('')
  const [assignerName, setAssignerName] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [leadsActivityFetchedData, setLeadsFetchedActivityData] = useState([])
  const [leadSchFetchedData, setLeadsFetchedSchData] = useState([])
  const [takTitle, setTakTitle] = useState('')
  const [filterData, setFilterData] = useState([])
  const d = new window.Date()
  const [value, setValue] = useState(d)
  // const [startDate, setStartDate] = useState(d)
  const [startDate, setStartDate] = useState(setHours(setMinutes(d, 30), 16))
  const [selected, setSelected] = useState(people[0])
  const [taskDetails, setTaskDetails] = useState('')
  const [schPri, setSchPri] = useState(1)
  const [schTime, setSchTime] = useState()
  const [schStsA, setschStsA] = useState([])
  const [schStsMA, setschStsMA] = useState([])

  const {
    id,
    Name,
    Project,
    Source,
    Status,
    by,
    Mobile,
    Date,
    Email,
    Assigned,
    AssignedBy,
    Notes,
    Timeline,
    attachments,
  } = customerDetails
  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(usersListA)
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA)
        setusersList(usersListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    setAssignedTo(customerDetails?.assignedTo)
    setLeadStatus(Status)
    console.log('assinger to', assignedTo)
  }, [customerDetails])
  // adopt this
  useEffect(() => {
    // setFilterData
    let fet = 'notes'
    if (selFeature === 'notes') {
      fet = 'notes'
    } else if (selFeature === 'phone') {
      fet = 'ph'
    } else if (selFeature === 'attachments') {
      fet = 'attach'
    } else if (selFeature === 'appointments') {
      fet = 'appoint'
    } else if (selFeature === 'timeline') {
      fet = 'status'
    }

    if (fet === 'appoint') {
      return
    } else {
      leadsActivityFetchedData.map((data) => {
        console.log('value of filtered feature count before', data)
      })
      let x = []
      if (selFeature != 'timeline') {
        x = leadsActivityFetchedData.filter((data) => data.type === fet)
      } else {
        x = leadsActivityFetchedData
      }
      console.log(
        'value of filtered feature count is wow it ',
        leadsActivityFetchedData,
        x.length
      )
      setFilterData(x)
    }
  }, [leadsActivityFetchedData, selFeature])

  useEffect(() => {
    getLeadsDataFun()
  }, [])
  useEffect(() => {
    setLeadStatus(Status?.toLowerCase())
  }, [customerDetails])

  const setAssigner = (leadDocId, value) => {
    setAssignerName(value.name)
    setAssignedTo(value.value)
    // save assigner Details in db

    updateLeadAssigTo(leadDocId, value, by)
  }

  const setStatusFun = async (leadDocId, newStatus) => {
    setLeadStatus(newStatus)
    setFeature('appointments')
    if (newStatus === 'visitfixed') {
      setTakTitle('Schedule a cab ')
    } else if (newStatus === 'booked') {
      await setTakTitle('Share the Details with CRM team')
      await fAddSchedule()
    } else {
      setTakTitle(' ')
    }
    updateLeadStatus(leadDocId, newStatus)
  }
  const getLeadsDataFun = async () => {
    console.log('ami triggered')
    const unsubscribe = steamLeadActivityLog(
      (doc) => {
        console.log('my total fetched list is 1', doc.data())
        const usersList = doc.data()
        const usersListA = []

        Object.entries(usersList).forEach((entry) => {
          const [key, value] = entry
          usersListA.push(value)
          console.log('my total fetched list is 3', `${key}: ${value}`)
        })
        // for (const key in usersList) {
        //   if (usersList.hasOwnProperty(key)) {
        //     console.log(`${key} : ${usersList[key]}`)
        //     console.log(`my total fetched list is 2 ${usersList[key]}`)
        //   }
        // }

        console.log('my total fetched list is', usersListA.length)
        setLeadsFetchedActivityData(usersListA)
      },
      {
        uid: id,
      },
      (error) => setLeadsFetchedActivityData([])
    )

    //  lead Schedule list
    steamLeadScheduleLog(
      (doc) => {
        console.log('my total fetched list is 1', doc.data())
        const usersList = doc.data()
        const usersListA = []

        const sMapStsA = []
        const { staA, staDA } = usersList
        console.log('this is what we found', staA)
        setschStsA(staA)
        setschStsMA(staDA)
        // delete usersList['staA']
        // delete usersList['staDA']
        Object.entries(usersList).forEach((entry) => {
          const [key, value] = entry
          if (['staA', 'staDA'].includes(key)) {
            if (key === 'staA') {
              // setschStsA(value)
            } else if (key === 'staDA') {
              // sMapStsA = value
            }
          } else {
            usersListA.push(value)
            console.log('my total fetched list is 3', `${key}: ${value}`)
          }
        })
        // for (const key in usersList) {
        //   if (usersList.hasOwnProperty(key)) {
        //     console.log(`${key} : ${usersList[key]}`)
        //     console.log(`my total fetched list is 2 ${usersList[key]}`)
        //   }
        // }

        console.log('my total fetched list is', usersListA.length)
        usersListA.sort((a, b) => {
          return b.ct - a.cr
        })
        setLeadsFetchedSchData(
          usersListA.sort((a, b) => {
            return a.ct - b.ct
          })
        )
      },
      {
        uid: id,
      },
      (error) => setLeadsFetchedSchData([])
    )

    return unsubscribe
  }
  const fAddSchedule = async () => {
    console.log('start time is ', startDate)
    const data = {
      by: user.email,
      type: 'schedule',
      pri: selected?.name,
      notes: takTitle,
      sts: 'pending',
      schTime:
        leadStatus === 'booked'
          ? Timestamp.now().toMillis() + 10800000
          : startDate.getTime(),
      ct: Timestamp.now().toMillis(),
    }

    const x = schStsA

    console.log('new one ', schStsA, x)
    x.push('pending')
    setschStsA(x)
    // addSchedulerLog(id, data)
    console.log('new one ', schStsA)
    await addLeadScheduler(id, data, schStsA)
    await setTakTitle('')
  }
  const handleColor = (time) => {
    return time.getHours() > 12 ? 'text-success' : 'text-error'
  }

  const setTitleFun = (e) => {
    console.log('title value is', e.target.value)
    setTakTitle(e.target.value)
  }
  const doneFun = (data) => {
    console.log('clicked schedule is', data)
    const inx = schStsMA.indexOf(data.ct)
    const x = schStsA
    x[inx] = 'completed'
    setschStsA(x)

    updateSchLog(id, data.ct, 'completed', schStsA)
  }
  const delFun = (data) => {
    console.log('clicked schedule is', data)
    const inx = schStsMA.indexOf(data.ct)
    const x = schStsA
    const y = schStsMA
    x.splice(inx, 1)
    y.splice(inx, 1)
    setschStsA(x)
    setschStsMA(y)

    deleteSchLog(id, data.ct, 'completed', schStsA, schStsMA)
  }
  return (
    <div
      className={`bg-white   h-screen    ${
        openUserProfile ? 'hidden' : ''
      } overflow-y-auto`}
    >
      <div className="border-b">
        <div className="p-3 flex justify-between">
          <span className="text-md font-semibold">User Profile</span>
          {/* <XIcon className="w-5 h-5 mt-[2px]" /> */}
        </div>
      </div>
      <div className="py-3 px-3">
        <div className="px-3  font-md font-medium text-sm mt-3 mb-2 text-gray-800">
          Customer Details
        </div>
        <div className="p-3 flex justify-between">
          <section>
            <div className="font-md text-xs text-gray-500 mb-[2]">Name</div>
            <div className="font-semibold text-sm text-slate-900">{Name}</div>
          </section>

          <span
            className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
          >
            {Project}
          </span>
        </div>
        <div className="p-3 flex justify-between">
          <section>
            <div className="font-md text-xs text-gray-500 mb-[2]">Phone</div>
            <div className="font-semibold text-sm text-slate-900">{Mobile}</div>
          </section>

          <span
            className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-green-500 bg-green-100 rounded-full
                      `}
          >
            {'In-Progress'}
          </span>
        </div>
        <div className="border-b mb-2">
          <div className="px-3 mb-4 flex justify-between">
            <section>
              <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                Email
              </div>
              <div className="font-lg text-sm text-slate-900">{Email}</div>
            </section>
            <div className="font-lg text-sm text-slate-900 min-w-[30%]">
              {/* {Assigned || 'NA'} */}

              <div className="font-md text-xs mt-2 text-gray-500 mb-[1]">
                Status
              </div>
              <CustomSelect
                name="roleName"
                label=""
                className="input mt-1"
                onChange={(value) => {
                  // formik.setFieldValue('myRole', value.value)
                  console.log('i was changed', value)
                  setStatusFun(id, value.value)
                }}
                value={leadStatus}
                options={statuslist}
              />
            </div>
          </div>
        </div>
        <div className="border-b mt-3">
          <div className="py-2 px-1">
            <div className="px-3  font-md font-medium text-sm mb-3  text-gray-800">
              Assigner Details
            </div>
            <div className="px-3  flex justify-between">
              <section>
                <div className="font-md text-xs text-gray-500 mb-[2]">
                  Assigned To
                </div>
                <div className="font-lg text-sm text-slate-900 min-w-[200%] bg-red-50">
                  {/* {Assigned || 'NA'} */}
                  <CustomSelect
                    name="roleName"
                    label=""
                    className="input mt-3"
                    onChange={(value) => {
                      // formik.setFieldValue('myRole', value.value)
                      console.log('i was changed', value, usersList)
                      setAssigner(id, value)
                    }}
                    value={assignedTo}
                    options={usersList}
                  />
                </div>
              </section>
              <section>
                <div className="font-md text-xs text-gray-500 mb-[2]">
                  Assigned On
                </div>

                <div className="font-lg text-sm text-slate-900">26 July</div>
              </section>
            </div>

            <div className="px-3 py-1 mb-3 mt-3 flex justify-between">
              <div>
                <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                  Assigned By
                </div>
                <div className="font-lg text-sm text-slate-900">
                  {AssignedBy || 'NA'}
                </div>
              </div>
              <div>
                <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                  Last Activist
                </div>
                <div className="font-lg text-sm text-slate-900">3 days ago</div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="py-2 px-4 ">
            {/* <div className="font-md font-medium text-xs  text-gray-800">
                          Notes
                        </div> */}

            <div className="mb-4 border-gray-200 dark:border-gray-700">
              <ul
                className="flex justify-between -mb-px"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                {[
                  { lab: 'Schedules', val: 'appointments' },
                  { lab: 'Tasks', val: 'tasks' },
                  { lab: 'Notes', val: 'notes' },
                  { lab: 'Attachments', val: 'attachments' },
                  { lab: 'Phone', val: 'phone' },
                  { lab: 'Timeline', val: 'timeline' },
                ].map((d, i) => {
                  return (
                    <li key={i} className="mr-2" role="presentation">
                      <button
                        className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2  hover:text-gray-600 hover:border-blue-600 dark:text-gray-400 dark:hover:text-gray-300  ${
                          selFeature === d.val
                            ? 'border-blue-600 text-gray-800'
                            : 'border-transparent'
                        }`}
                        type="button"
                        role="tab"
                        onClick={() => setFeature(d.val)}
                      >
                        {`${d.lab} `}
                        {/* <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {selFeature === 'notes' && (
              <div className="flex flex-col justify-between ">
                <div className="py-8 px-8 flex flex-col items-center">
                  <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                    <img
                      className="w-[200px] h-[200px] inline"
                      alt=""
                      src="/note-widget.svg"
                    />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                    No Helpful Notes
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    Better always attach a string
                    <span className="text-blue-600"> Add Attachement</span>
                  </time>
                </div>
                {/* <div className=" font-md font-medium text-sm   text-gray-800">
                  Notes
                </div>
                <div className="max-h-96 h-96 overflow-y-auto">
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Interested in 2 bhk apartment.
                  </div>
                  <div className="font-lg text-xs mt-3">
                    * Call him at 10.00 pm tomorrow
                  </div>
                </div> */}

                <div className="flex flex-col pt-0 my-10 mt-[10px] rounded">
                  <div className="  outline-none border  rounded p-4">
                    <textarea
                      // value={takTitle}
                      // onChange={(e) => setTitleFun(e)}
                      placeholder="Type & make a notes"
                      className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded  "
                    ></textarea>
                  </div>
                  {/* <span className="text-[#0091ae]">
                    Save
                    <ArrowRightIcon className="w-5 ml-5" />
                  </span> */}
                  <div className="flex flex-row mt-1">
                    <button
                      onClick={() => fAddSchedule()}
                      className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                    >
                      <span className="ml-1 ">Save</span>
                    </button>
                    <button
                      onClick={() => fAddSchedule()}
                      className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                    >
                      <span className="ml-1 ">Save & Whats App</span>
                    </button>
                    <button
                      // onClick={() => fSetLeadsType('Add Lead')}
                      className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                    >
                      <span className="ml-1 ">Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {selFeature === 'attachments' && (
          <div className="py-8 px-8 flex flex-col items-center">
            <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
              <img
                className="w-[200px] h-[200px] inline"
                alt=""
                src="/empty-dashboard.svg"
              />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              No Attachments
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Better always attach a string
              <span className="text-blue-600"> Add Attachement</span>
            </time>
          </div>
        )}
        {selFeature === 'tasks' && (
          <div className="py-8 px-8 flex flex-col items-center">
            <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
              <img
                className="w-[200px] h-[200px] inline"
                alt=""
                src="/all-complete.svg"
              />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              You are clean
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Sitback & Relax <span className="text-blue-600">Add Task</span>
            </time>
          </div>
        )}
        {selFeature === 'phone' && (
          <>
            {filterData.length === 0 && (
              <div className="py-8 px-8 flex flex-col items-center">
                <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                  <img
                    className="w-[200px] h-[200px] inline"
                    alt=""
                    src="/all-complete.svg"
                  />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  You are clean
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Sitback & Relax{' '}
                  <span className="text-blue-600">Add Task</span>
                </time>
              </div>
            )}

            <div className="px-8">
              <div className="font-md font-medium text-xs mb-4 text-gray-800">
                Phone Calls
              </div>
              <ol className="relative border-l border-gray-200 dark:border-gray-700">
                {filterData.map((data, i) => (
                  <section key={i} className="">
                    <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-blue-600 dark:text-blue-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </span>
                    <div className="text-gray-600 dark:text-gray-400 m-3 ml-6">
                      <div className="text-base font-normal">
                        <span className="font-medium text-green-900 dark:text-white">
                          {'Rajiv'}
                        </span>{' '}
                        called{' '}
                        <span className="text-sm text-red-900 dark:text-white">
                          {Name}
                        </span>{' '}
                      </div>
                      <div className="text-sm font-normal">{data?.txt}</div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                        <ClockIcon className="mr-1 w-3 h-3" />
                        {data?.type == 'ph'
                          ? timeConv(Number(data?.time)).toLocaleString()
                          : timeConv(data?.T).toLocaleString()}
                        {'    '}
                        <span className="text-red-900 ml-4 mr-4">
                          {Number(data?.duration)} sec
                        </span>
                        or
                        <span className="text-red-900 ml-4">
                          {parseInt(data?.duration / 60)} min
                        </span>
                      </span>
                    </div>
                  </section>
                ))}
              </ol>
            </div>
          </>
        )}

        {selFeature === 'appointments' && (
          <>
            <div className="flex flex-col pt-0 my-10 mt-[10px] rounded">
              <div className="  outline-none border  rounded p-4">
                <div className="flex flex-row  border-b mb-4">
                  <div className=" mb-3 flex justify-between">
                    <section>
                      <span
                        className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                        onClick={() => setTakTitle('Call again')}
                      >
                        Call again
                      </span>
                      <span
                        className={`items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                        onClick={() => setTakTitle('Get more details')}
                      >
                        Get more details
                      </span>
                      <span
                        className={`items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                        onClick={() => setTakTitle('Book Cab')}
                      >
                        Book Cab
                      </span>
                    </section>
                  </div>
                </div>
                <textarea
                  // onChange={setTakTitle()}
                  value={takTitle}
                  onChange={(e) => setTitleFun(e)}
                  placeholder="Schedule Title"
                  className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded  "
                ></textarea>
                <div className="flex flex-row mt-1">
                  <div className="bg-green border  pl-4  rounded flex flex-row mt-2 h-[36px]">
                    <CalendarIcon className="w-4  ml-1 inline text-[#058527]" />
                    <span className="inline">
                      <DatePicker
                        className=" mt-[7px] pl- px-2  inline text-sm "
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        injectTimes={[
                          setHours(setMinutes(d, 1), 0),
                          setHours(setMinutes(d, 5), 12),
                          setHours(setMinutes(d, 59), 23),
                        ]}
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    </span>
                  </div>

                  <div className="flex ml-4 mt-1 h-[36px]">
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full w-[116px]  h-[36px] py-2 pl-3 pr-10 text-left border bg-white rounded  cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                          <span className="block truncate">
                            {selected.name}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                              className="w-5 h-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                    active
                                      ? 'text-amber-900 bg-amber-100'
                                      : 'text-gray-900'
                                  }`
                                }
                                value={person}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                      }`}
                                    >
                                      {person.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>
              </div>
              {/* <span className="text-[#0091ae]">
                    Save
                    <ArrowRightIcon className="w-5 ml-5" />
                  </span> */}
              <div className="flex flex-row mt-1">
                <button
                  onClick={() => fAddSchedule()}
                  className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                >
                  <span className="ml-1 ">Add Schedule</span>
                </button>
                <button
                  // onClick={() => fSetLeadsType('Add Lead')}
                  className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                >
                  <span className="ml-1 ">Cancel</span>
                </button>
              </div>
            </div>
            {leadSchFetchedData.length == 0 && (
              <div className="py-8 px-8 flex flex-col items-center">
                {/* <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            /> */}

                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue)
                }}
              />
            </LocalizationProvider> */}
                <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                  <img
                    className="w-[200px] h-[200px] inline"
                    alt=""
                    src="/target.svg"
                  />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  No Appointmentss
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  Appointments always bring more suprises{' '}
                  <span className="text-blue-600">Add new</span>
                </time>
              </div>
            )}

            <div className="font-md font-medium text-xs mb-4 ml-7 text-gray-800">
              Schedule
            </div>
            <ol className="relative border-l ml-7 border-gray-200 dark:border-gray-700">
              {leadSchFetchedData.map((data, i) => (
                <section key={i} className=" border-b">
                  <a
                    href="#"
                    className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {/* <PlusCircleIcon className="mr-3 mb-3 w-10 h-10 rounded-full sm:mb-0" /> */}

                    {data?.type != 'ph' && (
                      <>
                        <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                          <CalendarIcon className="w-3 inline text-[#058527]" />
                        </span>
                        <div className="text-gray-600 dark:text-gray-400 m-3 w-screen">
                          <div className="p-3 flex justify-between">
                            <section className="text-base font-normal">
                              {/* <span className="font-medium text-green-900 dark:text-white">
                            {data?.notes}
                            </span>{' '} */}

                              <span className="text-sm  dark:text-white">
                                {data?.notes}
                              </span>
                              {''}
                              <span className="text-xs font-normal text-gray-500 ml-2">
                                in
                              </span>
                              <span className="text-xs font-normal text-red-900  text-gray-500 ml-2">
                                {Math.abs(
                                  getDifferenceInMinutes(data?.schTime, '')
                                ) > 60
                                  ? `${getDifferenceInHours(
                                      data?.schTime,
                                      ''
                                    )} Hours `
                                  : `${getDifferenceInMinutes(
                                      data?.schTime,
                                      ''
                                    )} Min`}
                              </span>
                            </section>

                            {/* section 2 */}
                            {data?.sts != 'completed' && (
                              <section>
                                <button
                                  className="inline-flex items-center justify-center w-7 h-7 mr-2 text-pink-100 transition-colors duration-150 bg-green-500 rounded-full focus:shadow-outline  hover:bg-pink-800"
                                  onClick={() => doneFun(data)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </button>
                                <button className="inline-flex items-center justify-center w-7 h-7 mr-2 text-pink-100 transition-colors duration-150 bg-red-400 rounded-full focus:shadow-outline hover:bg-pink-800">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="inline-flex items-center justify-center w-7 h-7 mr-2 text-pink-100 transition-colors duration-150 bg-pink-700 rounded-full focus:shadow-outline hover:bg-pink-800"
                                  onClick={() => delFun(data)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                    />
                                  </svg>
                                </button>
                              </section>
                            )}
                          </div>
                          <div className="p-3 flex justify-between">
                            <section>
                              <span
                                className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                              >
                                {data?.pri}
                              </span>
                              <span
                                className={`items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                              >
                                {data?.sts}
                              </span>
                            </section>
                            <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                              <ClockIcon className="mr-1 w-3 h-3" />
                              {timeConv(data?.schTime).toLocaleString()}
                              {'    '}
                            </span>
                          </div>
                          <div className="text-sm font-normal">{data?.txt}</div>
                        </div>
                      </>
                    )}
                  </a>
                </section>
              ))}
            </ol>
          </>
        )}
        {selFeature === 'timeline' && (
          <div className="py-8 px-8 ">
            {filterData.length == 0 && (
              <div className="py-8 px-8 flex flex-col items-center">
                <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                  <img
                    className="w-[200px] h-[200px] inline"
                    alt=""
                    src="/templates.svg"
                  />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  Timeline is Empty
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  This scenario is very rare to view
                </time>
              </div>
            )}
            <div className="font-md font-medium text-xs mb-4 text-gray-800">
              Timelines
            </div>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              {filterData.map((data, i) => (
                <section key={i} className="">
                  <a
                    href="#"
                    className="block items-center p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {/* <PlusCircleIcon className="mr-3 mb-3 w-10 h-10 rounded-full sm:mb-0" /> */}
                    {data?.type == 'status' && (
                      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                        <svg
                          className="w-3 h-3 text-blue-600 dark:text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    )}
                    {data?.type == 'ph' && (
                      <>
                        <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-blue-600 dark:text-blue-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </span>
                        <div className="text-gray-600 dark:text-gray-400 m-3">
                          <div className="text-base font-normal">
                            <span className="font-medium text-green-900 dark:text-white">
                              {'Rajiv'}
                            </span>{' '}
                            called{' '}
                            <span className="text-sm text-red-900 dark:text-white">
                              {Name}
                            </span>{' '}
                          </div>
                          <div className="text-sm font-normal">{data?.txt}</div>
                          <span className="inline-flex items-center text-xs font-normal text-gray-500 dark:text-gray-400">
                            <ClockIcon className="mr-1 w-3 h-3" />
                            {data?.type == 'ph'
                              ? timeConv(Number(data?.time)).toLocaleString()
                              : timeConv(data?.T).toLocaleString()}
                            {'    '}
                            <span className="text-red-900 ml-4 mr-4">
                              {Number(data?.duration)} sec
                            </span>
                            or
                            <span className="text-red-900 ml-4">
                              {parseInt(data?.duration / 60)} min
                            </span>
                          </span>
                        </div>
                      </>
                    )}
                    {data?.type != 'ph' && (
                      <div className="text-gray-600 dark:text-gray-400 m-3">
                        <div className="text-base font-normal">
                          <span className="font-medium text-green-900 dark:text-white">
                            {data?.type?.toUpperCase()}
                          </span>{' '}
                          set by{' '}
                          <span className="text-sm text-red-900 dark:text-white">
                            {data?.by}
                          </span>{' '}
                        </div>
                        <div className="text-sm font-normal">{data?.txt}</div>
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
                          {data?.type == 'ph'
                            ? timeConv(Number(data?.time)).toLocaleString()
                            : timeConv(data?.T).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </a>
                </section>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}
