/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'

import { ArrowRightIcon } from '@heroicons/react/outline'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import {
  steamLeadActivityLog,
  steamUsersList,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import { useDropzone } from 'react-dropzone'
import PlusCircleIcon from '@heroicons/react/solid/PlusCircleIcon'
import ClockIcon from '@heroicons/react/solid/ClockIcon'
import { timeConv } from 'src/util/dateConverter'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DateTimePicker } from '@mui/lab'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import { TextField } from '@mui/material'
import TimePicker from '@mui/lab/TimePicker'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'

// interface iToastInfo {
//   open: boolean
//   message: string
//   severity: AlertColor
// }
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
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [leadStatus, setLeadStatus] = useState([])
  const [selFeature, setFeature] = useState('appointments')
  const [leadsActivityFetchedData, setLeadsFetchedActivityData] = useState([])
  const [filterData, setFilterData] = useState([])
  const d = new window.Date()
  const [value, setValue] = useState(d)
  // const [startDate, setStartDate] = useState(d)
  const [startDate, setStartDate] = useState(setHours(setMinutes(d, 30), 16))

  const {
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
  }, [leadsActivityFetchedData, selFeature])

  useEffect(() => {
    getLeadsDataFun()
  }, [])
  useEffect(() => {
    setLeadStatus(Status?.toLowerCase())
  }, [customerDetails])
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
      (error) => setLeadsFetchedActivityData([])
    )
    return unsubscribe
  }
  const handleColor = (time) => {
    return time.getHours() > 12 ? 'text-success' : 'text-error'
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
                onChange={(value) =>
                  // formik.setFieldValue('myRole', value.value)
                  console.log('i was changed', value)
                }
                value={leadStatus}
                options={statuslist}
              />
            </div>
          </div>
        </div>
        <div className="border-b mt-3">
          <div className="py-2 px-1">
            <div className="px-3  font-md font-medium text-sm mb-3  text-gray-800">
              Assinger Details
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
                    onChange={(value) =>
                      // formik.setFieldValue('myRole', value.value)
                      console.log('i was changed', value)
                    }
                    value={''}
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
                  Last Activitys
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
                <div className="flex flex-row h-24 pt-0 my-10 mt-[150px] rounded">
                  <textarea
                    placeholder="Type & make a notes"
                    className="w-full h-full pb-10 outline-none border focus:border-blue-600 hover:border-blue-600 rounded p-4 shadow-lg"
                  ></textarea>

                  {/* <span className="text-[#0091ae]">
                    Save
                    <ArrowRightIcon className="w-5 ml-5" />
                  </span> */}
                  <div className="flex flex-col">
                    <button
                      // onClick={() => fSetLeadsType('Add Lead')}
                      className={`flex rounded items-center  pl-2 h-[36px] pr-4 py-6 text-sm font-medium text-white bg-green-500  hover:bg-gray-700  `}
                    >
                      <span className="ml-1 ">WhatsApp it </span>
                      {/* <ArrowRightIcon className="w-4 ml-1 inline" /> */}
                    </button>
                    <button
                      // onClick={() => fSetLeadsType('Add Lead')}
                      className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#F77B9D]  hover:bg-gray-700  `}
                    >
                      <span className="ml-1 ">SAVE</span>
                      <ArrowRightIcon className="w-4 ml-1 inline" />
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
          <div className="py-8 px-8 flex flex-col items-center">
            {/* <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            /> */}
            <DatePicker
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

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue)
                }}
              />
            </LocalizationProvider>
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
