/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react'
import { Menu } from '@headlessui/react'
import {
  BadgeCheckIcon,
  DocumentIcon,
  EyeIcon,
  ViewBoardsIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/solid'
import { v4 as uuidv4 } from 'uuid'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import SortComp from './sortComp'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, DownloadIcon } from '@heroicons/react/solid'
import { useAuth } from 'src/context/firebase-auth-context'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'src/context/firebaseConfig'
import toast from 'react-hot-toast'

import {
  addLeadScheduler,
  updateSch,
  deleteSchLog,
  steamLeadActivityLog,
  steamLeadScheduleLog,
  steamUsersListByRole,
  updateLeadAssigTo,
  updateLeadStatus,
  updateSchLog,
  addLeadNotes,
  steamLeadNotes,
  createAttach,
  getCustomerDocs,
  getAllProjects,
  updateLeadProject,
  steamLeadById,
} from 'src/context/dbQueryFirebase'
import { useDropzone } from 'react-dropzone'
import PlusCircleIcon from '@heroicons/react/solid/PlusCircleIcon'
import ClockIcon from '@heroicons/react/solid/ClockIcon'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'
import {
  getDifferenceInHours,
  getDifferenceInMinutes,
  prettyDate,
  prettyDateTime,
  timeConv,
} from 'src/util/dateConverter'

import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import StatusDropComp from './statusDropComp'
import AssigedToDropComp from './assignedToDropComp'
import Loader from './Loader/Loader'
import { VerticalAlignBottom } from '@mui/icons-material'
import ProjPhaseHome from './ProjPhaseHome/ProjPhaseHome'
import AddBookingForm from './bookingForm'

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
  // { label: 'Follow Up', value: 'followup' },
  { label: 'Visit Fixed', value: 'visitfixed' },
  { label: 'Visit Done', value: 'visitdone' },
  { label: 'Negotiation', value: 'Negotiation' },
  // { label: 'RNR', value: 'rnr' },
  { label: 'Booked', value: 'booked' },
  { label: 'Not Interested', value: 'notinterested' },
  // { label: 'Dead', value: 'Dead' },
]

const attachTypes = [
  { label: 'Select Document', value: '' },
  { label: 'Bank Cheque', value: 'bank_cheque' },
  { label: 'Booking Form', value: 'booking_form' },
  { label: 'Customer Aadhar', value: 'customer_aadhar' },
  { label: 'Co-Applicant Aadhar', value: 'co-applicant_Aadhar' },
  { label: 'Cancellation Form', value: 'cancellation_form' },
  { label: 'Cost Sheet', value: 'cost_sheet' },
  // { label: 'Follow Up', value: 'followup' },
  { label: 'Estimation Sheet', value: 'estimation_sheet' },
  { label: 'Payment Screenshot (IMPS/RTGS/NEFT)', value: 'payment_screenshot' },
  { label: 'Payment Receipt', value: 'payment_receipt' },
  { label: 'Others', value: 'others' },

  // { label: 'RNR', value: 'rnr' },
  // { label: 'Dead', value: 'Dead' },
]

const notInterestOptions = [
  { label: 'Select Document', value: '' },
  { label: 'Budget Issue', value: 'budget_issue' },
  { label: 'Looking for Different Property', value: 'differeent_options' },

  { label: 'Others', value: 'others' },

  // { label: 'Follow Up', value: 'followup' },
  // { label: 'RNR', value: 'rnr' },
  // { label: 'Dead', value: 'Dead' },
]
export default function CustomerProfileSideView({
  openUserProfile,
  customerDetails,
  unitViewerrr,
  unitsViewMode,
  setUnitsViewMode,
}) {
  console.log('customer Details', customerDetails)
  const { user } = useAuth()
  const { orgId } = user
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])

  // const [leadStatus, setLeadStatus] = useState([])
  const [selFeature, setFeature] = useState('appointments')
  const [tempLeadStatus, setLeadStatus] = useState('')
  const [assignerName, setAssignerName] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [leadsActivityFetchedData, setLeadsFetchedActivityData] = useState([])

  const [leadSchFetchedData, setLeadsFetchedSchData] = useState([])
  const [leadNotesFetchedData, setLeadsFetchedNotesData] = useState([])
  const [leadAttachFetchedData, setLeadsFetchedAttachData] = useState([])
  const [leadSchFilteredData, setLeadsFilteredSchData] = useState([])
  const [takTitle, setTakTitle] = useState('')
  const [takNotes, setNotesTitle] = useState('')
  const [attachType, setAttachType] = useState('')
  const [notInterestType, setNotInterestType] = useState('')
  const [attachTitle, setAttachTitle] = useState('')
  const [filterData, setFilterData] = useState([])
  const [docsList, setDocsList] = useState([])
  const [progress, setProgress] = useState(0)

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
  const [selFilterVal, setSelFilterVal] = useState('pending')
  const [addNote, setAddNote] = useState(false)
  const [addSch, setAddSch] = useState(false)
  const [attach, setAttach] = useState(false)
  const [loader, setLoader] = useState(false)
  const [projectList, setprojectList] = useState([])

  const [selProjectIs, setSelProjectIs] = useState({
    projectName: '',
    uid: '',
  })

  const [leadDetailsObj, setLeadDetailsObj] = useState({})
  const {
    id,
    Name,
    Project,
    ProjectId,
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
    documents,
  } = customerDetails
  useEffect(() => {
    //   get lead data by id
    streamLeadDataFun()
  }, [])

  const streamLeadDataFun = () => {
    const { id } = customerDetails
    const z = steamLeadById(
      orgId,
      (querySnapshot) => {
        const SnapData = querySnapshot.data()
        console.log('new customer object 1', SnapData)
        SnapData.id = id
        setLeadDetailsObj(SnapData)
      },
      { uid: id },
      () => {
        console.log('error')
      }
    )
  }

  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      orgId,
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
    let x = []
    if (selFilterVal === 'all') {
      x = leadSchFetchedData.filter((d) => d?.schTime != undefined)
    } else {
      x = leadSchFetchedData.filter(
        (d) => d?.schTime != undefined && d?.sts === selFilterVal
      )
    }
    setLeadsFilteredSchData(x)
  }, [leadSchFetchedData, selFilterVal])
  useEffect(() => {
    console.log(
      'assinger to yo yo',
      customerDetails,

      customerDetails?.assignedToObj?.label
    )
    setAssignedTo(customerDetails?.assignedTo)
    setAssignerName(customerDetails?.assignedToObj?.label)
    setSelProjectIs({ projectName: Project, uid: ProjectId })

    setLeadStatus(Status)
  }, [customerDetails])
  // adopt this
  useEffect(() => {
    // setFilterData
    let fet = 'notes'
    if (selFeature === 'notes') {
      getLeadNotesFun()
      fet = 'notes'
    } else if (selFeature === 'phone') {
      fet = 'ph'
    } else if (selFeature === 'documents') {
      fet = 'attach'
    } else if (selFeature === 'appointments') {
      fet = 'appoint'
    } else if (selFeature === 'timeline') {
      fet = 'status'
    }

    if (fet === 'appoint') {
      return
    }
    //  else if (fet === 'ph') {
    //   const unsubscribe = steamLeadPhoneLog(orgId,
    //     (doc) => {
    //       console.log('my total fetched list is yo yo 1', doc.data())
    //       const usersList = doc.data()
    //       const usersListA = []

    //       Object.entries(usersList).forEach((entry) => {
    //         const [key, value] = entry
    //         usersListA.push(value)
    //         console.log('my total fetched list is 3', `${key}: ${value}`)
    //       })
    //       console.log('my total fetched list is', usersListA.length)
    //       // setLeadsFetchedActivityData(usersListA)
    //     },
    //     {
    //       uid: id,
    //     },
    //     (error) => setLeadsFetchedActivityData([])
    //   )
    // }
    else {
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
    getCustomerDocsFun()
    getProjectsListFun()
  }, [])

  const getCustomerDocsFun = () => {
    const unsubscribe = getCustomerDocs(
      orgId,
      id,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        console.log('user docs list fetched are', projects)
        setDocsList(projects)
      },
      () => setDocsList([])
    )
    return unsubscribe
  }

  const getProjectsListFun = () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        console.log('fetched proejcts list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }
  useEffect(() => {
    setLeadStatus(Status?.toLowerCase())
  }, [customerDetails])

  const setAssigner = (leadDocId, value) => {
    setAssignerName(value.name)
    setAssignedTo(value.value)
    // save assigner Details in db

    updateLeadAssigTo(orgId, leadDocId, value, by)
  }
  const setNewProject = (leadDocId, value) => {
    console.log('sel pROJECT DETAILS ', value)

    // setProjectName(value.projectName)
    // setProjectId(value.uid)
    // save assigner Details in db
    // projectName
    const x = {
      Project: value.projectName,
      ProjectId: value.uid,
    }
    setSelProjectIs(value)
    updateLeadProject(orgId, leadDocId, x)
    // updateLeadAssigTo(leadDocId, value, by)
  }

  const setStatusFun = async (leadDocId, newStatus) => {
    setLoader(true)
    setLeadStatus(newStatus)

    const arr = ['notinterested', 'visitdone', 'visitcancel']
    if (newStatus === 'visitdone') {
      setFeature('visitDoneNotes')
    } else if (newStatus === 'visitcancel') {
      setFeature('visitCancelNotes')
    } else {
      arr.includes(newStatus) ? setFeature('notes') : setFeature('appointments')
      arr.includes(newStatus) ? setAddNote(true) : setAddSch(true)
      if (newStatus === 'visitfixed') {
        await setTakTitle('Schedule a cab ')
      } else if (newStatus === 'booked') {
        await setTakTitle('Share the Details with CRM team')
        await fAddSchedule()
      } else {
        setTakTitle(' ')
      }
    }

    //
    // updateLeadStatus(leadDocId, newStatus)
    // toast.success('Status Updated Successfully')
  }

  const downloadFile = (url) => {
    window.location.href = url
  }
  const getLeadsDataFun = async () => {
    console.log('ami triggered')
    const unsubscribe = steamLeadActivityLog(
      orgId,
      (doc) => {
        console.log('my total fetched list is yo yo ', doc.data())
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
      orgId,
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
            // console.log(
            //   'my total fetched list is 3',
            //   `${key}: ${JSON.stringify(value)}`
            // )
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
  const getLeadNotesFun = async () => {
    console.log('ami triggered')
    const unsubscribe = steamLeadNotes(
      orgId,
      (doc) => {
        console.log('my total fetched list is yo yo ', doc.data())
        const usersList = doc.data()
        const usersListA = []

        Object.entries(usersList).forEach((entry) => {
          const [key, value] = entry
          usersListA.push(value)
          console.log('my total fetched list is 3', `${key}: ${value}`)
        })
        console.log('my total notes list is ', usersListA)
        setLeadsFetchedNotesData(usersListA)
      },
      {
        uid: id,
      },
      (error) => setLeadsFetchedActivityData([])
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
        tempLeadStatus === 'booked'
          ? Timestamp.now().toMillis() + 10800000
          : startDate.getTime(),
      ct: Timestamp.now().toMillis(),
    }

    const x = schStsA

    console.log(
      'new one ',
      tempLeadStatus,
      startDate,
      startDate.getTime(),
      schStsA,
      x,
      data.schTime
    )

    x.push('pending')
    setschStsA(x)
    // addSchedulerLog(orgId,id, data)
    //  get assignedTo Led
    console.log('new one ', schStsA)
    await addLeadScheduler(orgId, id, data, schStsA, assignedTo)
    if (Status != tempLeadStatus) {
      updateLeadStatus(orgId, id, tempLeadStatus)
    }
    await setTakTitle('')
    await setAddSch(false)
    await setLoader(false)
  }
  const cancelResetStatusFun = () => {
    setAddSch(false)
    setAddNote(false)
    // if its not edit mode ignore it
    setLeadStatus(Status)
    setLoader(false)
  }
  const fUpdateSchedule = async (data) => {
    const tmId = data.ct
    const newTm = Timestamp.now().toMillis() + 10800000 + 5 * 3600000

    console.log('new one ', schStsA)
    await updateSch(orgId, id, tmId, newTm, schStsA, assignedTo)
    await setTakTitle('')
    await setAddSch(false)
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

    updateSchLog(orgId, id, data.ct, 'completed', schStsA)
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

    deleteSchLog(orgId, id, data.ct, 'completed', schStsA, schStsMA)
  }

  const selFun = () => {
    console.log('i was selcted')
    setAddNote(true)
  }

  const showAddAttachF = () => {
    setAttach(true)
  }

  const fAddNotes = async () => {
    console.log('start time is ', startDate)
    const data = {
      by: user.email,
      type: 'notes',
      notes: takNotes,
      ct: Timestamp.now().toMillis(),
    }

    await addLeadNotes(orgId, id, data)
    await setNotesTitle('')
    await setAddNote(false)
  }

  const docUploadHandler = async (e) => {
    e.preventDefault()
    console.log('filer upload stuff', e.target[0].files[0])
    uploadStuff(e.target[0].files[0])
  }

  const uploadStuff = async (file) => {
    if (!file) return
    try {
      const uid = uuidv4()
      const storageRef = ref(storage, `/spark_files/${Name}_${uid}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgress(prog)
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            createAttach(orgId, url, by, file.name, id, attachType)
            console.log('file url i s', url)
            //  save this doc as a new file in spark_leads_doc
          })
        }
      )
    } catch (error) {
      console.log('upload error is ', error)
    }
  }
  return (
    <div
      className={`bg-white   h-screen    ${openUserProfile ? 'hidden' : ''} `}
    >
      <div className="">
        <div className="p-3 flex justify-between">
          <span className="text-md mt-1 font-semibold text-xl mr-auto ml-1 text-[#053219] tracking-wide">
            Lead
          </span>
          {/* <XIcon className="w-5 h-5 mt-[2px]" /> */}
        </div>
      </div>
      <div className="py-3 px-3 m-4 mt-2 rounded-lg border border-gray-100 h-screen overflow-y-auto">
        <div className="flex flex-row justify-between">
          {/* <div className="px-3  font-md font-medium text-sm mt-3 mb-2 text-gray-800">
            Customer Details
          </div> */}

          <div className="inline mt-2 ml-2 mb-5">
            <div className="">
              <label className="font-semibold text-[#053219]  text-sm  mt-3 mb-1  tracking-wide ">
                Customer Details<abbr title="required"></abbr>
              </label>
            </div>

            <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>
          </div>
          <div className="p-3 flex flex-col">
            <span
              className={`items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-green-500 bg-green-100 rounded-full
                      `}
            >
              {'In-Progress'}
            </span>
          </div>
        </div>
        <div className="p-3 grid grid-cols-3">
          <section>
            <div className="font-md text-xs text-gray-500 mb-[2] tracking-wide">
              Name
            </div>
            <div className="font-semibold text-sm text-slate-900 tracking-wide overflow-ellipsis overflow-hidden">
              {Name}
            </div>
          </section>

          <section className="ml-8">
            <div className="font-md text-xs text-gray-500 mb-[2] tracking-wide">
              Phone
            </div>
            <div className="font-semibold text-sm text-slate-900">
              {Mobile?.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
            </div>
          </section>
          <section className="flex flex-col ml-[54px]">
            <div className="font-md text-xs  text-gray-500 mb-[2] flow-right tracking-wide">
              Email
            </div>
            <div className="font-lg text-sm text-slate-900 tracking-wide overflow-ellipsis overflow-hidden">
              <span className="overflow-ellipsis">{Email}</span>
            </div>
          </section>
        </div>

        <div className=" mt-2 pb-8">
          <div className="px-3 mb-4 grid grid-cols-3 gap-20 ">
            <div className="font-lg text-sm text-slate-900 min-w-[33%]">
              <div className="font-md text-xs mt-2 text-gray-500 mb-[1] tracking-wide">
                Assigned To
              </div>
              <AssigedToDropComp
                assignerName={assignerName}
                id={id}
                setAssigner={setAssigner}
                usersList={usersList}
              />
              {/* <CustomSelect
                name="roleName"
                label=""
                className="input mt-1 border-0"
                onChange={(value) => {
                  formik.setFieldValue('myRole', value.value)
                  console.log('i was changed', value, usersList)
                  setAssigner(id, value)
                }}
                value={assignedTo}
                options={usersList}
              /> */}
            </div>

            <div className="font-lg text-sm text-slate-900 min-w-[33%] ml-1">
              <div className="font-md text-xs mt-2 text-gray-500 mb-[1] tracking-wide">
                Status
              </div>
              <StatusDropComp
                leadStatus={tempLeadStatus}
                id={id}
                setStatusFun={setStatusFun}
              />
              {/* <CustomSelect
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
              /> */}
            </div>
            {/* <section className="min-w-[33%]"> */}
            {/* <div className="font-md text-xs text-gray-500 mb-[2]">
                Project
              </div>
              <div className="font-semibold text-sm text-slate-900">
                {Project}
              </div>
            </section>
            <section className="min-w-[33%]">
              <div className="font-md text-xs text-gray-500 mb-[2]">
                Project
              </div>
              <div className="font-semibold text-sm text-slate-900">
                {Project}
              </div>
            </section> */}
            <section className="min-w-[93%] max-w-[93%] mt-[9px]">
              <div
                className="flex flex-row justify-between cursor-pointer"
                onClick={() => setUnitsViewMode(!unitsViewMode)}
              >
                <div className="font-md text-xs text-gray-500 mb-[2] tracking-wide">
                  Project {}
                </div>
                {selProjectIs?.uid?.length > 4 &&
                  (unitsViewMode ? (
                    <XIcon
                      className="h-4 w-4 mr-1 mb-[2px] inline text-blue-600"
                      aria-hidden="true"
                    />
                  ) : (
                    <ViewGridIcon
                      className="h-4 w-4 mr-1 mb-[2px] inline text-blue-600"
                      aria-hidden="true"
                    />
                  ))}
              </div>
              <div className="font-semibold text-sm text-slate-900 tracking-wide overflow-ellipsis">
                {/* {Project} */}
                {/* projectList */}
                <AssigedToDropComp
                  assignerName={selProjectIs?.projectName || Project}
                  id={id}
                  align="right"
                  setAssigner={setNewProject}
                  usersList={projectList}
                />
              </div>
            </section>
          </div>
        </div>
        {/* <div className="border-b mt-3">
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
        </div> */}

        {unitsViewMode && (
          <>
            <ProjPhaseHome
              projectDetails={selProjectIs}
              leadDetailsObj={leadDetailsObj}
            />
          </>
        )}
        {!unitsViewMode && (
          <>
            <div className="">
              <div className="">
                {/* <div className="font-md font-medium text-xs  text-gray-800">
                          Notes
                        </div> */}

                <div className=" border-gray-200 ">
                  <ul
                    className="flex justify-between  bg-black rounded-t-lg"
                    id="myTab"
                    data-tabs-toggle="#myTabContent"
                    role="tablist"
                  >
                    {[
                      { lab: 'Schedules', val: 'appointments' },
                      // { lab: 'Tasks', val: 'tasks' },
                      { lab: 'Notes', val: 'notes' },
                      { lab: 'Documents', val: 'documents' },
                      // { lab: 'Phone', val: 'phone' },
                      { lab: 'Lead Logs', val: 'timeline' },
                    ].map((d, i) => {
                      return (
                        <li key={i} className="mr-2" role="presentation">
                          <button
                            className={`inline-block py-3 px-4 text-sm font-medium text-center text-white rounded-t-lg border-b-2  hover:text-white hover:border-gray-300   ${
                              selFeature === d.val
                                ? 'border-white text-white'
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
                  <div className="flex flex-col justify-between border pt-6">
                    {leadNotesFetchedData.length === 0 && !addNote && (
                      <div className="py-8 px-8 flex flex-col items-center mt-5">
                        <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                          <img
                            className="w-[180px] h-[180px] inline"
                            alt=""
                            src="/note-widget.svg"
                          />
                        </div>
                        <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                          No Helpful Notes {addNote}
                        </h3>
                        <button onClick={() => selFun()}>
                          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                            Better always attach a string
                            <span className="text-blue-600"> Add Notes</span>
                          </time>
                        </button>
                      </div>
                    )}
                    {addNote && (
                      <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-[#FFF9F2] mx-4 p-4">
                        <div className="w-full flex flex-col mb-3 mt-2">
                          <CustomSelect
                            name="source"
                            label="Not Interested Reason*"
                            className="input mt-3"
                            onChange={(value) => {
                              // formik.setFieldValue('source', value.value)
                              setNotInterestType(value.value)
                            }}
                            value={notInterestType}
                            options={notInterestOptions}
                          />
                        </div>

                        <div className="  outline-none border  rounded p-4 mt-4">
                          <textarea
                            value={takNotes}
                            onChange={(e) => setNotesTitle(e.target.value)}
                            placeholder="Type & make a notes"
                            className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded  "
                          ></textarea>
                        </div>
                        <div className="flex flex-row mt-1">
                          <button
                            onClick={() => fAddNotes()}
                            className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Save</span>
                          </button>
                          <button
                            onClick={() => fAddNotes()}
                            className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Save & Whats App</span>
                          </button>
                          <button
                            // onClick={() => fSetLeadsType('Add Lead')}
                            onClick={() => cancelResetStatusFun()}
                            className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Cancel</span>
                          </button>
                        </div>
                      </div>
                    )}
                    {leadNotesFetchedData.length > 0 && (
                      <div className="px-4">
                        <div className="flex justify-between">
                          <div className="font-md font-medium text-xl mb-4 text-[#053219]">
                            Notes
                          </div>

                          <button onClick={() => selFun()}>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                              <span className="text-blue-600"> Add Notes</span>
                            </time>
                          </button>
                        </div>
                        <ol className="relative border-l ml-3 border-gray-200  ">
                          {leadNotesFetchedData.map((data, i) => (
                            <section key={i} className="">
                              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white  ">
                                {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-blue-600 "
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg> */}
                                <DocumentIcon className=" w-3 h-3" />
                              </span>
                              <div className="text-gray-600  m-3 ml-6">
                                <div className="text-base font-normal">
                                  <span className="font-medium text-green-900 ">
                                    {data?.notes}
                                  </span>{' '}
                                </div>
                                <div className="text-sm font-normal">
                                  {data?.txt}
                                </div>
                                <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                                  <ClockIcon className=" w-3 h-3" />

                                  <span className="ml-1">added on:</span>
                                  <span className="text-red-900 ml-1 mr-4">
                                    {prettyDateTime(data?.ct)}
                                  </span>
                                  <span className="ml-2">added by:</span>
                                  <span className="text-red-900 ml-1 mr-4">
                                    {data?.by}
                                  </span>
                                </span>
                              </div>
                            </section>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
                {selFeature === 'visitDoneNotes' && (
                  <div className="flex flex-col justify-between border pt-6">
                    {leadNotesFetchedData.length === 0 && !addNote && (
                      <div className="py-8 px-8 flex flex-col items-center mt-5">
                        <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                          <img
                            className="w-[180px] h-[180px] inline"
                            alt=""
                            src="/note-widget.svg"
                          />
                        </div>
                        <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                          No Helpful Notes {addNote}
                        </h3>
                        <button onClick={() => selFun()}>
                          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                            Better always attach a string
                            <span className="text-blue-600"> Add Notes</span>
                          </time>
                        </button>
                      </div>
                    )}
                    {addNote && (
                      <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-[#FFF9F2] mx-4 p-4">
                        <div className="w-full flex flex-col mb-3 mt-2">
                          <CustomSelect
                            name="source"
                            label="Site Visit Feedback*"
                            className="input mt-3"
                            onChange={(value) => {
                              // formik.setFieldValue('source', value.value)
                              setNotInterestType(value.value)
                            }}
                            value={notInterestType}
                            options={notInterestOptions}
                          />
                        </div>

                        <div className="  outline-none border  rounded p-4 mt-4">
                          <textarea
                            value={takNotes}
                            onChange={(e) => setNotesTitle(e.target.value)}
                            placeholder="Type & make a notes"
                            className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded  "
                          ></textarea>
                        </div>
                        <div className="flex flex-row mt-1">
                          <button
                            onClick={() => fAddNotes()}
                            className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Save</span>
                          </button>
                          <button
                            onClick={() => fAddNotes()}
                            className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Save & Whats App</span>
                          </button>
                          <button
                            // onClick={() => fSetLeadsType('Add Lead')}
                            onClick={() => cancelResetStatusFun()}
                            className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Cancel</span>
                          </button>
                        </div>
                      </div>
                    )}
                    {leadNotesFetchedData.length > 0 && (
                      <div className="px-4">
                        <div className="flex justify-between">
                          <div className="font-md font-medium text-xl mb-4 text-[#053219]">
                            Notes
                          </div>

                          <button onClick={() => selFun()}>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                              <span className="text-blue-600"> Add Notes</span>
                            </time>
                          </button>
                        </div>
                        <ol className="relative border-l ml-3 border-gray-200  ">
                          {leadNotesFetchedData.map((data, i) => (
                            <section key={i} className="">
                              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white  ">
                                {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-blue-600 "
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg> */}
                                <DocumentIcon className=" w-3 h-3" />
                              </span>
                              <div className="text-gray-600  m-3 ml-6">
                                <div className="text-base font-normal">
                                  <span className="font-medium text-green-900 ">
                                    {data?.notes}
                                  </span>{' '}
                                </div>
                                <div className="text-sm font-normal">
                                  {data?.txt}
                                </div>
                                <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                                  <ClockIcon className=" w-3 h-3" />

                                  <span className="ml-1">added on:</span>
                                  <span className="text-red-900 ml-1 mr-4">
                                    {prettyDateTime(data?.ct)}
                                  </span>
                                  <span className="ml-2">added by:</span>
                                  <span className="text-red-900 ml-1 mr-4">
                                    {data?.by}
                                  </span>
                                </span>
                              </div>
                            </section>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {selFeature === 'documents' && (
              <div className="border px-4">
                {docsList.length === 0 && (
                  <div className="py-8 px-8 flex flex-col items-center mt-6">
                    <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                      <img
                        className="w-[200px] h-[200px] inline"
                        alt=""
                        src="/empty-dashboard.svg"
                      />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                      No Attachments
                    </h3>
                    <button onClick={() => showAddAttachF()}>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                        Better always attach a string
                        <span className="text-blue-600"> Add Dcoument</span>
                      </time>
                    </button>
                  </div>
                )}

                {attach && (
                  <div className="flex justify-center mt-4">
                    <div className="mb-3 w-96 px-10 bg-[#FFF9F2] rounded-md py-3 pb-6">
                      <div className="w-full flex flex-col mb-3 mt-2">
                        <CustomSelect
                          name="source"
                          label="Document Type *"
                          className="input mt-3"
                          onChange={(value) => {
                            // formik.setFieldValue('source', value.value)
                            setAttachType(value.value)
                          }}
                          value={attachType}
                          options={attachTypes}
                        />
                      </div>
                      <label
                        htmlFor="formFile"
                        className="form-label inline-block mb-2  font-regular text-sm "
                      >
                        Upload file
                      </label>
                      <form onSubmit={docUploadHandler}>
                        <input
                          className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          type="file"
                          id="formFile"
                        />
                        <div className="flex flex-row mt-3">
                          <button
                            // onClick={() => fAddSchedule()}
                            type="submit"
                            className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Upload</span>
                          </button>
                          <button
                            // onClick={() => fSetLeadsType('Add Lead')}
                            onClick={() => setAttach(false)}
                            className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                          >
                            <span className="ml-1 ">Cancel</span>
                          </button>
                        </div>
                      </form>

                      {/* <h3> {progress}</h3> */}
                    </div>
                  </div>
                )}

                {docsList.length > 0 && (
                  <div className="py-8">
                    <div className="flex justify-between">
                      <h2 className="text-xl font-semibold leading-tight">
                        Customer Documents
                      </h2>
                      <button onClick={() => showAddAttachF()}>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                          <span className="text-blue-600"> Add Dcoument</span>
                        </time>
                      </button>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Name
                              </th>

                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Created On / By
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                Status
                              </th>
                              {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {docsList.map((dat, i) => {
                              return (
                                <tr key={i} className=" border-b">
                                  <td className="px-5 py-5 bg-white text-sm ">
                                    <div className="flex">
                                      <div className="">
                                        <p className="text-gray-900 whitespace-no-wrap overflow-ellipsis">
                                          {dat.name}
                                        </p>
                                        <p className="text-blue-600 whitespace-no-wrap">
                                          {dat.type}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-5 py-5 bg-white text-sm ">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {prettyDate(dat.cTime)}
                                    </p>
                                    <p className="text-gray-600 whitespace-no-wrap overflow-ellipsis">
                                      {dat.by}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 bg-white text-sm">
                                    <>
                                      {/* <span className="relative inline px-3 py-1 font-semibold text-red-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">Approved</span>
                                  </span> */}

                                      <DownloadIcon
                                        onClick={() => downloadFile(dat.url)}
                                        className="w-5 h-5 text-gray-400 ml-3 cursor-pointer"
                                        aria-hidden="true"
                                      />
                                    </>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
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
                <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                  You are clean
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                  Sitback & Relax{' '}
                  <span className="text-blue-600">Add Task</span>
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
                    <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                      You are clean
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                      Sitback & Relax{' '}
                      <span className="text-blue-600">Add Task</span>
                    </time>
                  </div>
                )}

                <div className="px-4 mt-4">
                  <div className="font-md font-medium text-xl mb-4 text-[#053219]">
                    Phone Calls
                  </div>
                  <ol className="relative border-l border-gray-200 ml-3 ">
                    {filterData.map((data, i) => (
                      <section key={i} className="">
                        <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white  ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-blue-600 "
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </span>
                        <div className="text-gray-600  m-3 ml-6">
                          <div className="text-base font-normal">
                            <span className="font-medium text-green-900 ">
                              {'Rajiv'}
                            </span>{' '}
                            called{' '}
                            <span className="text-sm text-red-900  ">
                              {Name}
                            </span>{' '}
                          </div>
                          <div className="text-sm font-normal">{data?.txt}</div>
                          <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
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
                <div className=" pb-2 pt-7 h-screen border">
                  {loader && (
                    <div
                      id="toast-success"
                      className="flex items-center w-[95%] mx-4  p-2 mb-5 text-black
                  rounded shadow  bg-[#FDF7F1]"
                      role="alert"
                    >
                      {/* <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div> */}
                      {loader && (
                        <span className="pl-3 pr-3">
                          {' '}
                          {/* <Loader texColor="text-black" /> */}
                          <svg
                            height="21"
                            viewBox="0 0 21 21"
                            width="21"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              fill="none"
                              fillRule="evenodd"
                              transform="translate(1 1)"
                            >
                              <path
                                d="m9.5.5 9 16h-18z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="m9.5 10.5v-5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle
                                cx="9.5"
                                cy="13.5"
                                fill="currentColor"
                                r="1"
                              />
                            </g>
                          </svg>
                        </span>
                      )}
                      <div className=" text-sm font-normal">
                        Add a new schedule{' '}
                        <span className="text-orange-600">
                          {tempLeadStatus == 'visitfixed'
                            ? 'with visit info'
                            : 'with call again time'}{' '}
                        </span>{' '}
                        to make status as {tempLeadStatus.toLocaleUpperCase()}
                      </div>
                      <button
                        type="button"
                        className="ml-auto -mx-0.5 -my-0.5  text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                        data-dismiss-target="#toast-success"
                        aria-label="Close"
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  )}
                  {addSch && (
                    <div className="flex flex-col pt-0 my-10 mx-4 mt-[10px] rounded">
                      <div className="  outline-none border  rounded p-4">
                        <div className="flex flex-row  border-b mb-4">
                          <div className=" mb-3 flex justify-between">
                            <section>
                              <span
                                className={`cursor-pointer  items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                onClick={() => setTakTitle('Call again')}
                              >
                                Call again
                              </span>
                              <span
                                className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                onClick={() => setTakTitle('Get more details')}
                              >
                                Get more details
                              </span>
                              <span
                                className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                onClick={() => setTakTitle('Book Cab')}
                              >
                                Book Cab
                              </span>
                              <span
                                className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                onClick={() => setTakTitle('Share Quotation')}
                              >
                                Share Quotation
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
                                                selected
                                                  ? 'font-medium'
                                                  : 'font-normal'
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

                      <div className="flex flex-row mt-4">
                        <button
                          onClick={() => fAddSchedule()}
                          className={`flex mt-2 cursor-pointer rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                        >
                          <span className="ml-1 ">Add Schedule</span>
                        </button>
                        <button
                          // onClick={() => fSetLeadsType('Add Lead')}
                          onClick={() => cancelResetStatusFun()}
                          className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                        >
                          <span className="ml-1 ">Cancel</span>
                        </button>
                      </div>
                    </div>
                  )}

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
                      <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                        No Appointmentss
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                        Appointments always bring more suprises{' '}
                        <span
                          className="text-blue-600"
                          onClick={() => setAddSch(true)}
                        >
                          Add new
                        </span>
                      </time>
                    </div>
                  )}

                  <div className="font-md font-medium text-xs  ml-4 text-gray-800 flex justify-between mr-4 ">
                    {/* <section> Schedule</section> */}

                    <div className="inline ">
                      <div className="font-md font-medium text-xl mb-4 text-[#053219]">
                        Schedules
                      </div>
                    </div>
                    <section className="mt-2">
                      <span
                        className="text-blue-600 inline-block mr-2 cursor-pointer"
                        onClick={() => setAddSch(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mb-1 inline"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>{' '}
                        <div className="mt-2 inline">Add Schedule</div>
                      </span>
                      <SortComp
                        selFilterVal={selFilterVal}
                        setSelFilterVal={setSelFilterVal}
                      />
                    </section>
                  </div>

                  <div className="max-h-[60%] overflow-y-auto">
                    <ol className="relative border-l ml-7 border-gray-200 ">
                      {leadSchFilteredData.map((data, i) => (
                        <section key={i} className=" border-b">
                          <a
                            href="#"
                            className="block items-center px-3 sm:flex hover:bg-gray-100 "
                          >
                            {/* <PlusCircleIcon className="mr-3 mb-3 w-10 h-10 rounded-full sm:mb-0" /> */}

                            {data?.type != 'ph' && (
                              <>
                                <span
                                  className={`flex absolute -left-3 justify-center items-center w-6 h-6
                              ${
                                data?.sts === 'completed'
                                  ? 'bg-green-200'
                                  : 'bg-yellow-200'
                              }
                               rounded-full ring-8 ring-white`}
                                >
                                  {data?.sts === 'completed' ? (
                                    <BadgeCheckIcon className="w-4 h-4 inline text-[#058527]" />
                                  ) : (
                                    <CalendarIcon className="w-3 inline text-[#058527]" />
                                  )}
                                </span>
                                <div className="text-gray-600  m-3 w-screen">
                                  <div className="pl-3 flex justify-between mt-3">
                                    <section className="text-base font-normal max-w-[75%]">
                                      {/* <span className="font-medium text-green-900 dark:text-white">
                            {data?.notes}
                            </span>{' '} */}

                                      <span className="text-mx font-semibold font-brand tracking-wider  text-[#0091ae] ">
                                        {data?.notes}
                                      </span>
                                      {''}
                                      <span className="text-xs font-normal text-gray-500 ml-1">
                                        by
                                      </span>
                                      <span className="text-sm font-normal text-red-900  text-gray-500 ml-1">
                                        {/* {Math.abs(
                                    getDifferenceInMinutes(data?.schTime, '')
                                  ) > 60
                                    ? `${getDifferenceInHours(
                                        data?.schTime,
                                        ''
                                      )} Hours `
                                    : `${getDifferenceInMinutes(
                                        data?.schTime,
                                        ''
                                      )} Min`} */}
                                        {prettyDateTime(data?.schTime)}
                                      </span>
                                    </section>

                                    {/* section 2 */}
                                    {data?.sts === 'completed' && (
                                      <BadgeCheckIcon className="w-8 h-8 inline text-[#058527]" />
                                    )}
                                    {data?.sts != 'completed' && (
                                      <section className="mt-[6px]">
                                        <button className="inline-flex items-center ml-2 justify-center w-7 h-7 mr-2 text-[#ff7f50] transition-colors duration-150 bg-[#ffefe6] rounded-full focus:shadow-outline hover:bg-pink-800">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3 w-3"
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
                                          className="inline-flex items-center justify-center w-7 h-7 mr-2 text-[#FF8C02] transition-colors duration-150 bg-[#FFF9F2] rounded-full focus:shadow-outline hover:bg-pink-800"
                                          onClick={() => delFun(data)}
                                        >
                                          <svg
                                            height="16"
                                            viewBox="0 0 21 21"
                                            width="16"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <g
                                              fill="none"
                                              fillRule="evenodd"
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              transform="translate(3 2)"
                                            >
                                              <path d="m2.5 2.5h10v12c0 1.1045695-.8954305 2-2 2h-6c-1.1045695 0-2-.8954305-2-2zm5-2c1.0543618 0 1.91816512.81587779 1.99451426 1.85073766l.00548574.14926234h-4c0-1.1045695.8954305-2 2-2z" />
                                              <path d="m.5 2.5h14" />
                                              <path d="m5.5 5.5v8" />
                                              <path d="m9.5 5.5v8" />
                                            </g>
                                          </svg>
                                        </button>
                                        <button
                                          className="inline-flex items-center  justify-center w-7 h-7 text-[#248473] transition-colors duration-150 bg-[#eaf9f0] rounded-full focus:shadow-outline  hover:bg-pink-800"
                                          onClick={() => doneFun(data)}
                                        >
                                          <svg
                                            height="16"
                                            viewBox="0 0 21 21"
                                            width="16"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <g
                                              fill="none"
                                              fillRule="evenodd"
                                              stroke="currentColor"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              transform="translate(2 2)"
                                            >
                                              <circle cx="8.5" cy="8.5" r="8" />
                                              <path d="m5.5 9.5 2 2 5-5" />
                                            </g>
                                          </svg>
                                        </button>
                                      </section>
                                    )}

                                    {/* {data?.sts != 'completed' && (
                                <div className="flex flex-col">
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
                                </div>
                              )} */}
                                  </div>
                                  <div className="pl-2 flex">
                                    {data?.sts != 'completed' && (
                                      <section className="flex ">
                                        <button
                                          onClick={() =>
                                            setStatusFun(id, 'notinterested')
                                          }
                                          className={`inline-flex mt-2 rounded items-center  pl-2 h-[26px] pr-2 py-2 text-sm font- text-white  hover:bg-gray-700  `}
                                        >
                                          <span className=" text-[#FF8C02]">
                                            Not Interested
                                          </span>
                                        </button>
                                        <button
                                          onClick={() => fUpdateSchedule(data)}
                                          className={`inline-flex mt-2 ml-2 rounded items-center  pl-2 h-[26px] pr-2 py-2 text-sm font- text-white   hover:bg-gray-700  `}
                                        >
                                          <span className="ml-1 text-[#FF8C02] ">
                                            Busy
                                          </span>
                                        </button>
                                        <button
                                          onClick={() => fUpdateSchedule(data)}
                                          className={`inline-flex mt-2 ml-2 rounded items-center  pl-2 h-[26px] pr-2 py-2 text-sm font- text-white   hover:bg-gray-700  `}
                                        >
                                          <span className=" text-[#FF8C02]">
                                            RNR
                                          </span>
                                        </button>

                                        {/* <section className="mt-[6px]">
                                      <button className="inline-flex items-center ml-2 justify-center w-7 h-7 mr-2 text-[#ff7f50] transition-colors duration-150 bg-[#ffefe6] rounded-full focus:shadow-outline hover:bg-pink-800">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-3 w-3"
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
                                        className="inline-flex items-center justify-center w-7 h-7 mr-2 text-[#FF8C02] transition-colors duration-150 bg-[#FFF9F2] rounded-full focus:shadow-outline hover:bg-pink-800"
                                        onClick={() => delFun(data)}
                                      >
                                        <svg
                                          height="16"
                                          viewBox="0 0 21 21"
                                          width="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g
                                            fill="none"
                                            fillRule="evenodd"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            transform="translate(3 2)"
                                          >
                                            <path d="m2.5 2.5h10v12c0 1.1045695-.8954305 2-2 2h-6c-1.1045695 0-2-.8954305-2-2zm5-2c1.0543618 0 1.91816512.81587779 1.99451426 1.85073766l.00548574.14926234h-4c0-1.1045695.8954305-2 2-2z" />
                                            <path d="m.5 2.5h14" />
                                            <path d="m5.5 5.5v8" />
                                            <path d="m9.5 5.5v8" />
                                          </g>
                                        </svg>
                                      </button>
                                      <button
                                        className="inline-flex items-center  justify-center w-7 h-7 mr-2 text-[#248473] transition-colors duration-150 bg-[#eaf9f0] rounded-full focus:shadow-outline  hover:bg-pink-800"
                                        onClick={() => doneFun(data)}
                                      >
                                        <svg
                                          height="16"
                                          viewBox="0 0 21 21"
                                          width="16"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <g
                                            fill="none"
                                            fillRule="evenodd"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            transform="translate(2 2)"
                                          >
                                            <circle cx="8.5" cy="8.5" r="8" />
                                            <path d="m5.5 9.5 2 2 5-5" />
                                          </g>
                                        </svg>
                                      </button>
                                    </section> */}

                                        {/* <button
                                  onClick={() => fAddSchedule()}
                                  className={`inline-flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                >
                                  <span className="ml-1 ">Not Interested</span>
                                </button> */}
                                      </section>
                                    )}
                                  </div>
                                  <div className="text-sm font-normal">
                                    {data?.txt}
                                  </div>
                                </div>
                              </>
                            )}
                          </a>
                        </section>
                      ))}
                    </ol>
                  </div>
                </div>
              </>
            )}
            {selFeature === 'timeline' && (
              <div className="py-8 px-8  border">
                {filterData.length == 0 && (
                  <div className="py-8 px-8 flex flex-col items-center">
                    <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                      <img
                        className="w-[200px] h-[200px] inline"
                        alt=""
                        src="/templates.svg"
                      />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                      Timeline is Empty
                    </h3>
                    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                      This scenario is very rare to view
                    </time>
                  </div>
                )}
                <div className="font-md font-medium text-xs mb-4 text-gray-800">
                  Timelines
                </div>
                <ol className="relative border-l border-gray-200 ">
                  {filterData.map((data, i) => (
                    <section key={i} className="">
                      <a
                        href="#"
                        className="block items-center p-3 sm:flex hover:bg-gray-100 "
                      >
                        {/* <PlusCircleIcon className="mr-3 mb-3 w-10 h-10 rounded-full sm:mb-0" /> */}
                        {data?.type == 'status' && (
                          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white  ">
                            <svg
                              className="w-3 h-3 text-blue-600 \"
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
                            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-blue-600 "
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                            </span>
                            <div className="text-gray-600  m-3">
                              <div className="text-base font-normal">
                                <span className="font-medium text-green-900 ">
                                  {'Rajiv'}
                                </span>{' '}
                                called{' '}
                                <span className="text-sm text-red-900 ">
                                  {Name}
                                </span>{' '}
                              </div>
                              <div className="text-sm font-normal">
                                {data?.txt}
                              </div>
                              <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                                <ClockIcon className="mr-1 w-3 h-3" />
                                {data?.type == 'ph'
                                  ? timeConv(
                                      Number(data?.time)
                                    ).toLocaleString()
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
                          <div className="text-gray-600  m-3">
                            <div className="text-base font-normal">
                              <span className="font-medium text-green-900 ">
                                {data?.type?.toUpperCase()}
                              </span>{' '}
                              set by{' '}
                              <span className="text-sm text-red-900 ">
                                {data?.by}
                              </span>{' '}
                            </div>
                            <div className="text-sm font-normal">
                              {data?.txt}
                            </div>
                            <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
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
          </>
        )}
      </div>
    </div>
  )
}
