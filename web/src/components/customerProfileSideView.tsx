/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react'
import '../styles/myStyles.css'
import { Menu } from '@headlessui/react'
import {
  BadgeCheckIcon,
  CheckIcon,
  CheckCircleIcon,
  DocumentIcon,
  EyeIcon,
  ViewBoardsIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/solid'
import { v4 as uuidv4 } from 'uuid'
import {
  ArrowRightIcon,
  PhoneIcon,
  DeviceMobileIcon,
  MailIcon,
} from '@heroicons/react/outline'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import SortComp from './sortComp'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Listbox, Transition } from '@headlessui/react'
import { SelectorIcon, DownloadIcon } from '@heroicons/react/solid'
import { useAuth } from 'src/context/firebase-auth-context'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'src/context/firebaseConfig'
import toast from 'react-hot-toast'
import LogSkelton from './shimmerLoaders/logSkelton'

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
  updateLeadRemarks_NotIntrested,
  updateLeadRemarks_VisitDone,
  undoSchLog,
  editTaskDB,
  editAddTaskCommentDB,
} from 'src/context/dbQueryFirebase'
import { useDropzone } from 'react-dropzone'
import PlusCircleIcon from '@heroicons/react/solid/PlusCircleIcon'
import ClockIcon from '@heroicons/react/solid/ClockIcon'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'
import {
  getDifferenceInDays,
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
import {
  ArrowBackRounded,
  DriveEtaOutlined,
  VerticalAlignBottom,
} from '@mui/icons-material'
import ProjPhaseHome from './ProjPhaseHome/ProjPhaseHome'
import AddBookingForm from './bookingForm'
import { useSnackbar } from 'notistack'
import { async } from '@firebase/util'
import SelectDropDownComp from './comps/dropDownhead'

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
  // { label: 'Select Reason', value: '' },
  { label: 'Budget Issue', value: 'budget_issue' },
  {
    label: 'Looking for Different Area & Property',
    value: 'differeent_area_options',
  },
  { label: 'Looking for Different Area', value: 'differeent_area' },
  { label: 'Looking for Different Property', value: 'differeent_options' },

  { label: 'Others', value: 'others' },

  // { label: 'Follow Up', value: 'followup' },
  // { label: 'RNR', value: 'rnr' },
  // { label: 'Dead', value: 'Dead' },
]

const siteVisitFeedbackOptions = [
  // { label: 'Visit Feedback', value: '' },
  { label: 'Happy', value: 'happy' },
  {
    label: 'Sad',
    value: 'sad',
  },
  { label: 'Neutral', value: 'neutral' },
  { label: 'Want more options', value: 'more_options' },

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
  const { user } = useAuth()
  const { orgId } = user
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])

  // const [leadStatus, setLeadStatus] = useState([])
  const [selFeature, setFeature] = useState('appointments')
  const [myStatus, setMyStatus] = useState('')
  const [tempLeadStatus, setLeadStatus] = useState('')
  const [assignerName, setAssignerName] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [showNotInterested, setShowNotInterested] = useState(false)

  const [leadsActivityFetchedData, setLeadsFetchedActivityData] = useState([])
  const [leadSchLoading, setLeadsSchLoading] = useState(true)

  const [leadSchFetchedData, setLeadsFetchedSchData] = useState([])
  const [leadNotesFetchedData, setLeadsFetchedNotesData] = useState([])
  const [showVisitFeedBackStatus, setShowVisitFeedBackStatus] = useState(false)
  const [leadSchFilteredData, setLeadsFilteredSchData] = useState([])
  const [takTitle, setTakTitle] = useState('')
  const [takNotes, setNotesTitle] = useState('')
  const [fbTitle, setFbTitle] = useState('')
  const [fbNotes, setfbNotes] = useState('')
  const [attachType, setAttachType] = useState('')
  const [notInterestType, setNotInterestType] = useState('')
  const [attachTitle, setAttachTitle] = useState('')
  const [filterData, setFilterData] = useState([])
  const [docsList, setDocsList] = useState([])
  const [progress, setProgress] = useState(0)
  const [editTaskObj, setEditTaskObj] = useState({})

  const d = new window.Date()
  const [value, setValue] = useState(d)

  // const [startDate, setStartDate] = useState(d)
  const [startDate, setStartDate] = useState(d)
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
  const [statusTimeLineA, setStatusTimeLineA] = useState(['new'])
  const [selSchGrpO, setSelSchGrpO] = useState({})
  const [closeTask, setCloseTask] = useState(false)

  const [selProjectIs, setSelProjectIs] = useState({
    projectName: '',
    uid: '',
  })

  const [leadDetailsObj, setLeadDetailsObj] = useState({})
  const [addTaskCommentObj, setAddTaskCommentObj] = useState({})
  const [addCommentPlusTask, setAddCommentPlusTask] = useState(false)
  const [addCommentTitle, setAddCommentTitle] = useState('')
  // const [addCommentTime, setAddCommentTime] = useState(
  //   setHours(setMinutes(d, 30), 16)
  // )
  const [addCommentTime, setAddCommentTime] = useState(d)
  const {
    id,
    Name,
    Project,
    ProjectId,
    Source,
    // Status,
    by,
    Mobile,
    Date,
    Email,
    Assigned,
    AssignedBy,
    Notes,
    Timeline,
    documents,
    Remarks,
    notInterestedReason,
    notInterestedNotes,
    stsUpT,
    assignT,
    CT,
  } = customerDetails

  const { enqueueSnackbar } = useSnackbar()
  const [hover, setHover] = useState(false)
  const [hoverId, setHoverID] = useState(1000)
  const [hoverTasId, setHoverTasId] = useState(2000)
  const [streamCoveredA, setStreamCoveredA] = useState([])
  const [streamCurrentStatus, setStreamCurrentStatus] = useState('new')
  const [streamfrom, setStreamFrom] = useState('')

  const [closePrevious, setClosePrevious] = useState(false)

  useEffect(() => {
    console.log('customer detail sare', customerDetails)
  }, [customerDetails])

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
    const { coveredA, Status, from } = leadDetailsObj
    if (coveredA) {
      setStreamCoveredA(coveredA)
    } else {
      setStreamCoveredA([])
    }
    setStreamCurrentStatus(Status)
    setStreamFrom(from || '')
  }, [leadDetailsObj])

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
    console.log('xo xo xo', x)
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
    setStatusTimeLineA(
      [...statusTimeLineA, ...(customerDetails?.coveredA || [])] || ['new']
    )

    // setLeadStatus(Status)
    console.log('this is the macho ', customerDetails)
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
      leadsActivityFetchedData?.map((data) => {
        console.log('value of filtered feature count before', data)
      })
      let x = []
      if (selFeature != 'timeline') {
        x = leadsActivityFetchedData?.filter((data) => data.type === fet)
      } else {
        x = leadsActivityFetchedData
      }
      console.log(
        'value of filtered feature count is wow it ',
        leadsActivityFetchedData,
        x?.length
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
    // setLeadStatus(Status?.toLowerCase())
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

  const setShowNotInterestedFun = (scheduleData, value) => {
    setSelSchGrpO(scheduleData)
    cancelResetStatusFun()
    setLeadStatus('notinterested')
    setShowVisitFeedBackStatus(false)
    setShowNotInterested(true)

    // setFeature('appointments')
  }
  const setShowVisitFeedBackStatusFun = (scheduleData, value) => {
    setSelSchGrpO(scheduleData)
    cancelResetStatusFun()
    setLeadStatus('visitdone')
    setShowNotInterested(false)
    setShowVisitFeedBackStatus(true)
  }

  const setStatusFun = async (leadDocId, newStatus) => {
    cancelResetStatusFun()
    setLoader(true)
    setClosePrevious(true)
    console.log('is this triggered yo yo', newStatus)
    if (newStatus == 'visitdone') {
      console.log('is this triggered yo yo 1', newStatus)
      enqueueSnackbar(`Mark VISIT-DONE  from VISIT-FIXED Task`, {
        variant: 'error',
      })

      return
    }

    console.log('is this triggered yo yo 2', newStatus)
    setLeadStatus(newStatus)

    const arr = ['visitdone', 'visitcancel']
    if (newStatus === 'visitdone') {
      setFeature('visitDoneNotes')
    } else if (newStatus === 'visitcancel') {
      setFeature('visitCancelNotes')
    } else if (newStatus === 'notinterested') {
      setShowNotInterestedFun({}, '')
      console.log('is this triggered yo yo 2 checking it', newStatus)
    } else {
      arr.includes(newStatus) ? setFeature('notes') : setFeature('appointments')
      arr.includes(newStatus) ? setAddNote(true) : setAddSch(true)
      if (newStatus === 'followup') {
        await setTakTitle(
          `Make a followup Call to ${customerDetails?.Name || 'Customer'} `
        )
      } else if (newStatus === 'visitfixed') {
        await setTakTitle(
          `${customerDetails?.Project || 'Site'} visit @${
            customerDetails?.Name || 'Customer'
          }   `
        )
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
    const steamLeadLogs = await steamLeadActivityLog(
      orgId,
      'snap',
      {
        uid: id,
      },
      (error) => setLeadsFetchedActivityData([])
    )

    console.log('stream logs', steamLeadLogs)
    await setLeadsFetchedActivityData(steamLeadLogs)

    // const unsubscribe = steamLeadActivityLog(
    //   orgId,
    //   (doc) => {
    //     console.log('my total fetched list is yo yo ', doc.data())
    //     const usersList = doc.data()
    //     const usersListA = []

    //     Object.entries(usersList).forEach((entry) => {
    //       const [key, value] = entry
    //       usersListA.push(value)
    //       console.log('my total fetched list is 3', `${key}: ${value}`)
    //     })
    //     // for (const key in usersList) {
    //     //   if (usersList.hasOwnProperty(key)) {
    //     //     console.log(`${key} : ${usersList[key]}`)
    //     //     console.log(`my total fetched list is 2 ${usersList[key]}`)
    //     //   }
    //     // }

    //     console.log('my total fetched list is', usersListA.length)
    //     setLeadsFetchedActivityData(usersListA)
    //   },
    //   {
    //     uid: id,
    //   },
    //   (error) => setLeadsFetchedActivityData([])
    // )

    //  lead Schedule list
    steamLeadScheduleLog(
      orgId,
      (doc) => {
        console.log('my total fetched list is 1', doc.data())
        setLeadsSchLoading(true)
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

        console.log('my total fetched list is', usersListA.length, usersListA)

        setLeadsFetchedSchData(
          usersListA.sort((a, b) => {
            return b.schTime - a.schTime
          })
        )
        setLeadsSchLoading(false)
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

        Object?.entries(usersList)?.forEach((entry) => {
          const [key, value] = entry
          usersListA.push(value)
          console.log('my total fetched list is 3', `${key}: ${value}`)
        })
        console.log('my total notes list is ', usersListA)
        usersListA?.sort((a, b) => {
          return b.ct - a.ct
        })
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
    console.log(
      'what is this status setup  ',
      closePrevious,
      tempLeadStatus,
      streamCurrentStatus
    )

    console.log(
      'start time is ',
      startDate,
      'takti',
      takTitle,
      'nx',
      addCommentTitle
    )
    const y = takTitle === '' ? addCommentTitle : takTitle
    if (closePrevious) {
      closeAllPerviousTasks(`${y}`)
    }

    const data = {
      stsType: tempLeadStatus || 'none',
      assTo: user?.displayName || user?.email,
      assToId: user.uid,
      by: user?.displayName || user?.email,
      cby: user.uid,
      type: 'schedule',
      pri: selected?.name,
      notes: y === '' ? `Negotiate with customer` : y,
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
    if (streamCurrentStatus != tempLeadStatus) {
      updateLeadStatus(
        orgId,
        id,
        streamCurrentStatus,
        tempLeadStatus,
        user?.email,
        enqueueSnackbar
      )
    }
    await setTakTitle('')
    await setAddSch(false)
    await setLoader(false)
  }
  const cancelResetStatusFun = () => {
    setCloseTask(false)
    setClosePrevious(false)
    setEditTaskObj({})
    setAddTaskCommentObj({})
    setAddCommentTitle('')
    // setAddCommentTime('')
    setAddCommentPlusTask(false)
    setTakTitle('')
    setStartDate(setHours(setMinutes(d, 30), 16))
    setShowNotInterested(false)
    setShowVisitFeedBackStatus(false)
    setAddSch(false)
    setAddNote(false)
    // if its not edit mode ignore it
    setLeadStatus(streamCurrentStatus)
    setLoader(false)
  }
  const fUpdateSchedule = async (data, actionType, count) => {
    if (data?.sts != 'completed') {
      const tmId = data.ct
      const newTm = Timestamp.now().toMillis() + 10800000 + 5 * 3600000

      console.log('new one ', schStsA)
      await updateSch(
        orgId,
        id,
        tmId,
        newTm,
        schStsA,
        assignedTo,
        actionType,
        count
      )
      await setTakTitle('')
      await setAddSch(false)
    }
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
  const EditTaskOpenWindowFun = (data) => {
    console.log(
      'clicked schedule is',
      data,
      startDate,
      'max',
      setHours(setMinutes(data?.schTime, 30), 16)
    )
    cancelResetStatusFun()
    setEditTaskObj(data)
    setTakTitle(data?.notes || '')
    setStartDate(setHours(setMinutes(data?.schTime, 30), 16))

    // const inx = schStsMA.indexOf(data.ct)
    // const x = schStsA
    // x[inx] = 'completed'
    // setschStsA(x)

    // updateSchLog(orgId, id, data.ct, 'completed', schStsA)
  }
  const editTaskFun = (data) => {
    console.log('clicked schedule is', data)

    const inx = schStsMA.indexOf(data.ct)
    data.schTime = startDate.getTime()
    data.notes = takTitle
    const x = schStsA
    x[inx] = 'pending'
    setschStsA(x)

    editTaskDB(orgId, id, data.ct, 'pending', schStsA, data)
    cancelResetStatusFun()
  }
  const addTaskCommentFun = async (data) => {
    await setTakTitle(addCommentTitle)
    console.log('clicked schedule is', data, addCommentPlusTask, takTitle)

    const inx = schStsMA.indexOf(data.ct)

    data.comments = [
      {
        c: addCommentTitle,
        t: Timestamp.now().toMillis() + 21600000,
      },
      ...(data?.comments || []),
    ]
    const x = schStsA
    x[inx] = 'pending'
    setschStsA(x)

    if (addCommentPlusTask) {
      await setTakTitle(addCommentTitle)
      await fAddSchedule()
      // mark current task as done

      await editAddTaskCommentDB(orgId, id, data.ct, 'pending', schStsA, data)
      if (data?.stsType != 'visitfixed') {
        await doneFun(data)
      }

      await cancelResetStatusFun()
    } else {
      if (closeTask) {
        doneFun(data)
      }
      await editAddTaskCommentDB(orgId, id, data.ct, 'pending', schStsA, data)
      await cancelResetStatusFun()
    }
  }

  const notInterestedFun = async () => {
    await closeAllPerviousTasks('closed by Not-Interested')
    //3) set status as not interested
    await fAddNotes()
    await cancelResetStatusFun()
    return
    data.comments = [
      {
        c: `${fbTitle}-${fbNotes}`,
        t: Timestamp.now().toMillis() + 21600000,
      },
      ...(data?.comments || []),
    ]
    await setTakTitle('Negotiate with customer')

    await editAddTaskCommentDB(orgId, id, data.ct, 'pending', schStsA, data)

    await doneFun(data)
    await fAddSchedule()

    // update status + remarks + fbTitle + fbNotes
    await fAddNotes()
    await setSelSchGrpO({})

    await cancelResetStatusFun()

    const x = schStsA
    x[inx] = 'pending'
    setschStsA(x)
  }
  const closeAllPerviousTasks = async (closingComments) => {
    const pendingTaskAObj = leadSchFetchedData.filter(
      (d) => d?.schTime != undefined && d?.sts === 'pending'
    )
    // const inx = schStsMA.indexOf(data.ct)
    console.log('come is pending tasks ', pendingTaskAObj)
    pendingTaskAObj?.map(async (pendObj) => {
      //1)add comment on task

      //2) mark the tasks as done
      //3) set status as not interested

      // 1) add comment on task
      pendObj.comments = [
        {
          c: closingComments,
          t: Timestamp.now().toMillis() + 21600000,
        },
        ...(pendObj?.comments || []),
      ]
      await editAddTaskCommentDB(
        orgId,
        id,
        pendObj.ct,
        'pending',
        schStsA,
        pendObj
      )
      //2) mark the tasks as done
      await doneFun(pendObj)
    })
  }
  const closeTaskFun = async (data) => {
    if (data?.stsType === 'visitfixed') {
      setShowVisitFeedBackStatusFun(data, 'visitdone')
    } else {
      setAddTaskCommentObj(data)
      setCloseTask(true)
    }
  }
  const addFeedbackFun = async (data) => {
    const inx = schStsMA.indexOf(data.ct)

    data.comments = [
      {
        c: `${fbTitle}-${fbNotes}`,
        t: Timestamp.now().toMillis() + 21600000,
      },
      ...(data?.comments || []),
    ]

    await setTakTitle('Negotiate with customer')

    // await editAddTaskCommentDB(orgId, id, data.ct, 'pending', schStsA, data)
    closeAllPerviousTasks(`${fbTitle}-${fbNotes}`)

    await doneFun(data)
    await fAddSchedule()

    // update status + remarks + fbTitle + fbNotes
    await fAddNotes()
    await setSelSchGrpO({})

    await cancelResetStatusFun()

    const x = schStsA
    x[inx] = 'pending'
    setschStsA(x)
  }
  const undoFun = (data) => {
    console.log('clicked schedule is', data)
    const inx = schStsMA.indexOf(data.ct)
    const x = schStsA
    x[inx] = 'pending'
    setschStsA(x)

    undoSchLog(orgId, id, data.ct, 'pending', schStsA, data)
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

    deleteSchLog(orgId, id, data.ct, 'completed', schStsA, schStsMA, data)
  }

  const selFun = () => {
    console.log('i was selcted')
    setAddNote(true)
  }

  const showAddAttachF = () => {
    setAttach(true)
  }

  const activieLogNamer = (dat) => {
    const { type, from, to, by } = dat
    let tex = type

    switch (type) {
      case 'l_ctd':
        return (tex = 'Lead Created')
      case 'sts_change':
        return (tex = ` completed --> updated `)
      default:
        return (tex = type)
    }
    return tex
  }

  const fAddNotes = async () => {
    //  make it as notInterested if source is from NotInterestedd Page
    console.log(
      'start time is temp ',
      startDate,
      tempLeadStatus,
      tempLeadStatus === 'notinterested'
    )
    const data = {
      by: user.email,
      type: 'notes',
      notes: takNotes,
      ct: Timestamp.now().toMillis(),
    }

    await addLeadNotes(orgId, id, data)
    if (tempLeadStatus === 'notinterested') {
      console.log('am i here', takTitle, takNotes)
      const dat = {
        from: streamCurrentStatus,
        Status: tempLeadStatus,
        notInterestedReason: takTitle === '' ? fbTitle : takTitle,
        notInterestedNotes: takNotes === '' ? fbNotes : takNotes,
        stsUpT: Timestamp.now().toMillis(),
        Remarks: `${fbTitle}-${fbNotes}`,
      }
      updateLeadRemarks_NotIntrested(
        orgId,
        id,
        dat,
        user.email,
        enqueueSnackbar
      )
      setLeadStatus('notinterested')
      cancelResetStatusFun()
    } else if (tempLeadStatus === 'visitdone') {
      console.log('am i here', takTitle, takNotes)

      const covA = [
        ...(customerDetails?.coveredA || []),
        ...['visitfixed', 'visitdone'],
      ]

      const dat = {
        coveredA: covA,
        from: streamCurrentStatus,
        Status: 'negotiation',
        VisitDoneReason: fbTitle,
        VisitDoneNotes: fbNotes,
        stsUpT: Timestamp.now().toMillis(),
        Remarks: `${fbTitle}-${fbNotes}`,
      }
      updateLeadRemarks_VisitDone(orgId, id, dat, user.email, enqueueSnackbar)
      doneFun(selSchGrpO)
      setSelSchGrpO({})
      setLeadStatus('negotiation')
      cancelResetStatusFun()
    }

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
  const initialState1 = {
    notesText: '',
  }
  const validateSchema1 = Yup.object({
    notesText: Yup.string()
      .max(180, 'Must be 180 characters or less')
      .required('Notes Text is  Required'),
  })
  const initialState = {
    taskTitle: takTitle || '',
  }
  const initialCommentState = {
    commentTitle: addCommentTitle || '',
  }
  const validateCommentsSchema = Yup.object({
    commentTitle: Yup.string()
      .max(180, 'Must be 180 characters or less')
      .required('Comment Title Required'),
  })
  const validateSchema = Yup.object({
    taskTitle: Yup.string()
      .max(180, 'Must be 180 characters or less')
      .required('Task Title Required'),
  })
  const StatusListA = [
    { label: 'New', value: 'new', logo: 'FireIcon', color: ' bg-violet-500' },
    {
      label: 'FollowUp',
      value: 'followup',
      logo: 'RefreshIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Visit Fixed',
      value: 'visitfixed',
      logo: 'FireIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Visit Done',
      value: 'visitdone',
      logo: 'DuplicateInactiveIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Negotiation',
      value: 'negotiation',
      logo: 'CurrencyRupeeIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Booked',
      value: 'booked',
      logo: 'BadgeCheckIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Not Interested',
      value: 'notinterested',
      logo: 'XCircleIcon',
      color: ' bg-violet-500',
    },
  ]
  // const styles = {
  //   .blockHead:after {
  //     color: "#4D81BF",
  //     borderLeft: "20px solid"
  //     borderTop: 20px solid transparent;
  //     borderBottom: 20px solid transparent;
  //     display: inline-block;
  //     content: '';
  //     position: absolute;
  //     right: -20px;
  //     top: 0;
  //   }
  //   .blockHead {
  //     backgroundColor: "#4D81BF",
  //     /*width: 150px; */
  //     height: "40px",
  //     lineHeight: "40px",
  //     display: inline-block;
  //     position: relative;
  //   }
  //   .blocktext {
  //     color: white;
  //     fontWeight: bold;
  //     paddingLeft: 10px;
  //     fontFamily: Arial;
  //     fontSize: 11;
  //   }
  // }
  const hoverEffectFun = (id) => {
    setHoverID(id)
  }
  const hoverEffectTaskFun = (id) => {
    setHoverTasId(id)
  }
  const styleO = {
    normal: {
      width: '100%',
      height: '28px',
      borderWidth: '3px 10px 3px 3px',
      boxSizing: 'border-box',
      borderStyle: 'solid',
      verticalAlign: 'middle',
      cursor: 'pointer',
      textOverflow: 'ellipsis',
      transition: 'all 250ms ease',
      position: 'relative',
      overflow: 'hidden',
      whiteSpace: 'nowrap',

      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%23d3d7dc%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%2347E4C2%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',

      color: 'rgb(51, 51, 51)',
      dataBaseColor: '#2fc6f6',
    },
    completed: {
      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%237BD500%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%237BD500%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',
    },

    hover: {
      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%2347E4C2%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%2347E4C2%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',
    },
  }
  return (
    <div
      className={`bg-white   h-screen    ${openUserProfile ? 'hidden' : ''} `}
    >
      <div className="">
        <div className="p-3 flex justify-between">
          <span className="text-md mt-1 font-semibold font-Playfair text-xl mr-auto ml-2 text-[#053219] tracking-wide">
            Lead Details
          </span>
          {/* <XIcon className="w-5 h-5 mt-[2px]" /> */}
        </div>
      </div>
      <div className="h-screen overflow-y-auto">
        <div className=" pb-[2px] px-3 m-4 mt-0 rounded-xs  mb-1  bg-[#F5F8FA]">
          <div className="-mx-3 flex  sm:-mx-4 px-3">
            <div className="w-full px-3 sm:px-4 xl:w-4/12  ">
              <div className="">
                <div className="font-semibold text-[#053219]  text-sm  mt-3 mb-1  tracking-wide font-bodyLato">
                  <span className="mb-[4px] text-xl uppercase">{Name}</span>

                  <div className="mt-1">
                    <div className="font-md text-sm text-gray-500 mb-[2] tracking-wide">
                      <MailIcon className="w-4 h-4 inline text-[#058527] " />{' '}
                      {Email}
                    </div>
                    <div className="font-md text-sm text-gray-500 mb-[2] tracking-wide ">
                      <DeviceMobileIcon className="w-4 h-4 inline text-[#058527] " />{' '}
                      {Mobile?.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-1  xl:w-8/12 mt-1 mb-1 bg-white  pl-3 pt-2 ">
              <div className="relative z-10 my-1 bg-white">
                <div className="grid grid-cols-3 gap-5">
                  <section className="">
                    <div
                      className="flex flex-row  cursor-pointer"
                      onClick={() => setUnitsViewMode(!unitsViewMode)}
                    >
                      <div className="font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4">
                        Project {}
                      </div>
                      {selProjectIs?.uid?.length > 4 &&
                        (unitsViewMode ? (
                          <XIcon
                            className="h-4 w-4 mr-1 mb-[2px] inline text-blue-600"
                            aria-hidden="true"
                          />
                        ) : (
                          // <ViewGridIcon
                          //   className="h-4 w-4 mr-1 mb-[2px] inline text-blue-600"
                          //   aria-hidden="true"
                          // />
                          <span className="px-[3px] py-[1px]  text-[#FF8C02] hover:border-b-1 hover:border-[#FF8C02] text-[10px] text-[#] font-semibold">
                            {' '}
                            View Units
                          </span>
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

                  <section>
                    <div className="font-md text-xs text-gray-500 mb-[px] tracking-wide mr-4">
                      Assined To {}
                    </div>
                    <div>
                      <AssigedToDropComp
                        assignerName={assignerName}
                        id={id}
                        setAssigner={setAssigner}
                        usersList={usersList}
                        align={undefined}
                      />
                    </div>
                  </section>
                  <section>
                    <div className="font-md text-xs text-gray-500 mb-[0px] tracking-wide mr-4">
                      Current Status {}
                    </div>
                    <div className="font-semibold text-[#053219] text-sm  mt- px-[3px] py-[px] rounded ">
                      {leadDetailsObj?.Status}{' '}
                      {/* {leadDetailsObj?.Status != tempLeadStatus
                        ? `--> ${' '}${tempLeadStatus}`
                        : ''} */}
                    </div>
                  </section>
                </div>
                <div className="w-full border-b border-[#ebebeb] mt-4"></div>
                <div className=" w-full  pt-1 font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4 grid grid-cols-3 gap-5">
                  {' '}
                  <section>
                    <span className="font-thin   font-bodyLato text-[9px]  py-[6px]">
                      Created On
                      <span className="text-[#867777] ck ml-2">
                        {CT != undefined ? prettyDateTime(CT) : 'NA'}
                      </span>
                    </span>
                  </section>
                  <section>
                    <span className="font-thin   font-bodyLato text-[9px]  py-[6px]">
                      Updated On :
                      <span className="text-[#867777] ck ml-2">
                        {prettyDateTime(stsUpT) || 'NA'}
                      </span>
                    </span>
                  </section>
                  <section>
                    <span className="font-thin text-[#867777]   font-bodyLato text-[9px]  py-[6px]">
                      Assigned On
                      <span className="text-[#867777] ck ml-2">
                        {assignT != undefined ? prettyDateTime(assignT) : 'NA'}
                      </span>
                    </span>
                  </section>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="px-3 py-2 flex flex-row  text-xs  border-t border-[#ebebeb] font-thin   font-bodyLato text-[12px]  py-[6px] ">
              Remarks:{' '}
              <span className="text-[#867777] ml-1 ">
                {' '}
                {leadDetailsObj?.Remarks || 'NA'}
              </span>
            </div>
            <div
              className="relative flex flex-col  group"
              // style={{ alignItems: 'end' }}
            >
              <div
                className="absolute bottom-0 right-0 flex-col items-center hidden mb-6 group-hover:flex"
                // style={{  width: '300px' }}
                style={{ zIndex: '9999' }}
              >
                <span
                  className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                  style={{
                    color: 'black',
                    background: '#e2c062',
                    maxWidth: '300px',
                  }}
                >
                  <div className="italic flex flex-col">
                    <div className="font-bodyLato">
                      {Source?.toString() || 'NA'}
                    </div>
                  </div>
                </span>
                <div
                  className="w-3 h-3  -mt-2 rotate-45 bg-black"
                  style={{ background: '#e2c062', marginRight: '12px' }}
                ></div>
              </div>
              <span className="font-bodyLato text-[#867777] text-xs">
                {/* <HighlighterStyle
                            searchKey={searchKey}
                            source={row.Source.toString()}
                          /> */}

                <img
                  className="w-[18px] h-[18px] inline"
                  alt={Source?.toString() || 'NA'}
                  src={`../${Source?.toString()}.svg`}
                />
              </span>
            </div>
          </div>
        </div>
        {/* <div>
          <span className="mx-[11px]">
            <span className="font-bold text-xs">Remarks : </span>
            <span>{Remarks}</span>
          </span>
        </div>
        <div>
          <span className="mx-[11px]">
            <span className="font-bold text-xs">
              Not Interested Reason : {notInterestedReason}
            </span>
            <span>{Remarks}</span>
          </span>
        </div>
        <div>
          <span className="mx-[11px]">
            <span className="font-bold text-xs">
              {' '}
              Not Interested Notes : {notInterestedNotes}{' '}
            </span>
            <span>{Remarks}</span>
          </span>
        </div> */}

        <div
          className="flex flex-row justify-between   py-3 px-3 m-4 mt-0 mb-0 rounded-xs bg-[#F5F8FA]"
          style={{ flex: '4 0 100%' }}
        >
          {StatusListA.map((statusFlowObj, i) => (
            <span
              key={i}
              className="font-bodyLato text-sm font-normal px-[2px] py-[1px] mr-1 "
              onClick={() => setStatusFun(id, statusFlowObj.value)}
              // style={{
              //   width: '100%',
              //   height: '32px',
              //   borderWidth: '3px 10px 3px 3px',
              //   boxSizing: 'border-box',
              //   borderStyle: 'solid',
              //   verticalAlign: 'middle',
              //   cursor: 'pointer',
              //   textOverflow: 'ellipsis',
              //   transition: 'all 250ms ease',
              //   position: 'relative',
              //   overflow: 'hidden',
              //   whiteSpace: 'nowrap',
              //   borderImage:
              //     'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%232FC6F6%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%232FC6F6%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',
              //   borderImage:
              //     'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%23d3d7dc%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%2347E4C2%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',

              //   color: 'rgb(51, 51, 51)',
              //   dataBaseColor: '#2fc6f6',
              // }}
              //{leadDetailsObj?.Remarks
              style={{
                ...styleO.normal,
                ...(statusFlowObj.value === streamCurrentStatus
                  ? styleO.hover
                  : null),
                ...(streamCoveredA.includes(statusFlowObj.value)
                  ? styleO.completed
                  : null),

                ...(statusFlowObj.value === tempLeadStatus
                  ? styleO.hover
                  : null),
                ...(statusFlowObj.value === streamfrom
                  ? styleO.completed
                  : null),
                ...(hover && hoverId === i ? styleO.hover : null),
              }}
              onMouseEnter={() => {
                hoverEffectFun(i)
                setHover(true)
              }}
              onMouseLeave={() => {
                hoverEffectFun(1000)
                setHover(false)
              }}
            >
              <div>{statusFlowObj.label} </div>\
            </span>
          ))}
        </div>
        {/* <div
          className="flex flex-row justify-between mb-6 "
          style={{ flex: '4 0 100%' }}
        >
          {StatusListA.map((statusFlowObj, i) => (
            <div
              key={i}
              className="blockHead font-bodyLato text-sm font-normal px-[2px] py-[4px] mr-1 "
            >
              <span className="blocktext">{statusFlowObj.label}</span>
            </div>
          ))}
        </div> */}

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
              source={undefined}
              unitDetails={undefined}
            />
          </>
        )}
        {!unitsViewMode && (
          <>
            <section className=" pb-8 py-3 px-3 m-4 mt-1 rounded-xs bg-[#F5F8FA]">
              <div className="">
                <div className="">
                  {/* <div className="font-md font-medium text-xs  text-gray-800">
                          Notes
                        </div> */}

                  <div className=" border-gray-200">
                    <ul
                      className="flex   rounded-t-lg border-b mx-2"
                      id="myTab"
                      data-tabs-toggle="#myTabContent"
                      role="tablist"
                    >
                      {[
                        { lab: 'Tasks', val: 'appointments' },
                        // { lab: 'Tasks', val: 'tasks' },
                        { lab: 'Notes', val: 'notes' },
                        // { lab: 'Documents', val: 'documents' },
                        // { lab: 'Phone', val: 'phone' },
                        { lab: 'Email', val: 'email' },
                        { lab: 'Activity Log', val: 'timeline' },
                      ].map((d, i) => {
                        return (
                          <li key={i} className="mr-4" role="presentation">
                            <button
                              className={`inline-block pb-1 mr-3 text-sm font-medium text-center text-black rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${
                                selFeature === d.val
                                  ? 'border-black'
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
                        <Formik
                          initialValues={initialState1}
                          validationSchema={validateSchema1}
                          onSubmit={(values, { resetForm }) => {
                            console.log('values of form is ', values)
                            fAddNotes()
                          }}
                        >
                          {(formik1) => (
                            <Form>
                              <div className=" form flex flex-col pt-0 my-10 mt-[10px] rounded bg-[#FFF9F2] mx-4 p-4">
                                {/*
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
                          </div> */}

                                <div className="  outline-none border  rounded p-4 mt-4">
                                  <ErrorMessage
                                    component="div"
                                    name="notesText"
                                    className="error-message text-red-700 text-xs p-1"
                                  />
                                  <textarea
                                    name="notesText"
                                    value={takNotes}
                                    onChange={(e) => {
                                      console.log(
                                        'what the matter',
                                        e.target.value
                                      )
                                      formik1.setFieldValue(
                                        'notesText',
                                        e.target.value
                                      )
                                      setNotesTitle(e.target.value)
                                    }}
                                    placeholder="Type & make a notes"
                                    className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFF9F2] "
                                  ></textarea>
                                </div>
                                <div className="flex flex-row mt-1">
                                  <button
                                    type="submit"
                                    className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                  >
                                    <span className="ml-1 ">Save</span>
                                  </button>
                                  <button
                                    onClick={() => cancelResetStatusFun()}
                                    type="submit"
                                    className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                  >
                                    <span className="ml-1 ">
                                      Save & Whats App
                                    </span>
                                  </button>
                                  <button
                                    // onClick={() => fSetLeadsType('Add Lead')}
                                    onClick={() => cancelResetStatusFun()}
                                    className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white `}
                                  >
                                    <span className="ml-1 ">Cancel</span>
                                  </button>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      )}
                      {leadNotesFetchedData.length > 0 && (
                        <div className="px-4">
                          <div className="flex justify-between">
                            <div className="font-md font-medium text-xl mb-4 text-[#053219]">
                              Notes
                            </div>

                            <button onClick={() => selFun()}>
                              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                                <span className="text-blue-600">
                                  {' '}
                                  Add Notes
                                </span>
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
                              options={siteVisitFeedbackOptions}
                            />
                          </div>

                          <div className="  outline-none border  rounded p-4 mt-4">
                            <textarea
                              value={takNotes}
                              onChange={(e) => setNotesTitle(e.target.value)}
                              placeholder="Type & make a notes"
                              className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFF9F2] "
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
                              className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white  `}
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
                                <span className="text-blue-600">
                                  {' '}
                                  Add Notes
                                </span>
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
                  {filterData?.length === 0 && (
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
                      {filterData?.map((data, i) => (
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
                            <div className="text-sm font-normal">
                              {data?.txt}
                            </div>
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
                  <div className=" h-screen ">
                    {(showNotInterested || showVisitFeedBackStatus) &&
                      selSchGrpO?.ct === undefined && (
                        <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-[#FFF9F2] mx-4 p-4">
                          {showNotInterested && (
                            <div className="w-full flex flex-col mb-3 mt-2">
                              <CustomSelect
                                name="source"
                                label={`Why  ${
                                  customerDetails?.Name?.toLocaleUpperCase() ||
                                  'Customer'
                                } is  not Interested *`}
                                className="input mt-3"
                                onChange={(value) => {
                                  // formik.setFieldValue('source', value.value)
                                  setNotInterestType(value.value)
                                }}
                                value={notInterestType}
                                options={notInterestOptions}
                              />
                            </div>
                          )}
                          {showVisitFeedBackStatus && (
                            <div className="w-full flex flex-col mb-3 mt-2">
                              <CustomSelect
                                name="source"
                                label="Sitess Visit Feedback*"
                                className="input mt-3"
                                onChange={(value) => {
                                  // formik.setFieldValue('source', value.value)
                                  setNotInterestType(value.value)
                                }}
                                value={notInterestType}
                                options={siteVisitFeedbackOptions}
                              />
                            </div>
                          )}

                          <div className="  outline-none border  rounded p-4 mt-4">
                            <textarea
                              value={takNotes}
                              onChange={(e) => setNotesTitle(e.target.value)}
                              placeholder="Type & make a notes"
                              className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFF9F2] "
                            ></textarea>
                          </div>
                          <div className="flex flex-row mt-1">
                            <button
                              onClick={() => notInterestedFun()}
                              className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                            >
                              <span className="ml-1 ">Save</span>
                            </button>
                            <button
                              onClick={() => notInterestedFun()}
                              className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                            >
                              <span className="ml-1 ">Save & Whats App</span>
                            </button>
                            <button
                              // onClick={() => fSetLeadsType('Add Lead')}
                              onClick={() => cancelResetStatusFun()}
                              className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white  `}
                            >
                              <span className="ml-1 ">Cancel</span>
                            </button>
                          </div>
                        </div>
                      )}

                    <div className="font-md font-medium text-xs  ml-2 text-gray-800 flex flex-row justify-between mr-4 py-2">
                      {/* <section> Schedule</section> */}
                      <section className="flex flex-row py-1">
                        <div
                          className="text-blue-600  mr-4  cursor-pointer"
                          onClick={() => setAddSch(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mb-1 inline"
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
                          <div className="inline boder-b ">Add Task</div>
                        </div>

                        <div className="mx-2 inline">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            className="mr-1 inline"
                          >
                            <g fill="none" fillRule="evenodd">
                              <g fill="currentColor" fillRule="nonzero">
                                <g>
                                  <g>
                                    <path
                                      d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 1c-4.418 0-8 3.582-8 8 0 .702.09 1.383.26 2.031l2.886-2.885c.196-.195.512-.195.708 0l2.646 2.647 4.793-4.794L13 9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h3.52l.052.005L16.5 8c.036 0 .071.004.105.011l.046.012.04.015c.014.005.027.012.04.019.013.006.025.013.036.02l.035.025c.014.01.027.02.04.033l.012.011.011.013c.012.012.023.025.033.039l-.044-.052c.026.027.05.056.069.087l.02.034.02.042.014.04c.005.015.009.03.012.046l.006.033.005.051V12c0 .276-.224.5-.5.5s-.5-.224-.5-.5V9.706l-5.146 5.148c-.196.195-.512.195-.708 0L7.5 12.207 4.618 15.09C5.827 17.974 8.677 20 12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8z"
                                      transform="translate(-564 -480) translate(528 444) translate(36 36)"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          {
                            leadSchFetchedData?.filter(
                              (d) => d?.sts === 'completed'
                            ).length
                          }
                          /
                          {
                            leadSchFetchedData.filter(
                              (d) => d?.schTime != undefined
                            ).length
                          }
                        </div>

                        {/* <SortComp
                          selFilterVal={selFilterVal}
                          setSelFilterVal={setSelFilterVal}
                        /> */}
                      </section>
                      <div className="flex flex-row ">
                        {/* <div className="font-md font-semibold inline text-wider text-[14px] font-bodyLato text-[#053219]">
                          {selFilterVal.toUpperCase()} Tasks
                        </div> */}

                        <div className="flex flex-row bg-white rounded-xl border ">
                          <div
                            className={` py-1 pr-4 pl-4 min-w-[62px] ${
                              selFilterVal === 'all' ? 'bg-red-300' : ''
                            } rounded-xl rounded-r-none`}
                            onClick={() => setSelFilterVal('all')}
                          >
                            <span className="mr-1 text-[10px] ">All</span>

                            {
                              leadSchFetchedData.filter(
                                (d) => d?.schTime != undefined
                              ).length
                            }
                          </div>
                          <div
                            className={` py-1 pr-4 pl-4 min-w-[62px] border-x ${
                              selFilterVal === 'pending' ? 'bg-red-300' : ''
                            } `}
                            onClick={() => setSelFilterVal('pending')}
                          >
                            <CheckCircleIcon className="w-4 h-3  inline text-[#cdcdcd]" />
                            <span className="mr-1 text-[10px] ">Pending</span>
                            <span
                              className=" text-[11
                              px] "
                            >
                              {' '}
                              {
                                leadSchFetchedData?.filter(
                                  (d) => d?.sts === 'pending'
                                ).length
                              }
                            </span>
                          </div>
                          <div
                            className={` py-1 pr-4 pl-4 min-w-[62px] ${
                              selFilterVal === 'completed' ? 'bg-red-300' : ''
                            }  rounded-xl rounded-l-none`}
                            onClick={() => setSelFilterVal('completed')}
                          >
                            <CheckCircleIcon className="w-4 h-3 inline text-[#058527]" />
                            <span className="mr-1 text-[10px] ">Completed</span>

                            {
                              leadSchFetchedData?.filter(
                                (d) => d?.sts === 'completed'
                              ).length
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {loader && (
                      <div
                        id="toast-success"
                        className="flex items-center w-[95%] mx-4  p-2 text-white
                     bg-[#516F90]"
                        role="alert"
                      >
                        {/* {loader && (
                        <span className="pl-3 pr-3">
                          {' '}

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
                      )} */}

                        <div className=" text-sm font-normal font-bodyLato tight-wider">
                          {/* <div className=" text-sm font-normal font-bodyLato tight-wider">
                          Create Task
                        </div> */}
                          Hey, Plan your{' '}
                          <span className="text-xs  tight-wider ">
                            {tempLeadStatus.toLocaleUpperCase()}{' '}
                          </span>
                          ..!
                        </div>
                        <button
                          type="button"
                          className="ml-auto -mx-0.5 -my-0.5  text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
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
                      <div className="flex flex-col pt-0 my-10 mx-4 mt-[0px] ">
                        <Formik
                          enableReinitialize={true}
                          initialValues={initialState}
                          validationSchema={validateSchema}
                          onSubmit={(values, { resetForm }) => {
                            fAddSchedule()
                          }}
                        >
                          {(formik) => (
                            <Form>
                              <div className=" form outline-none border  py-4">
                                <section className=" px-4">
                                  {/* {['visitfixed'].includes(tempLeadStatus) && (
                            <div className="flex flex-row  border-b mb-4 ">
                              <div className=" mb-3 flex justify-between">
                                <section>
                                  <span
                                    className={`cursor-pointer  items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                    onClick={() => setTakTitle('Call again')}
                                  >
                                    Call again {addSch.toString()}
                                  </span>
                                  <span
                                    className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                    onClick={() =>
                                      setTakTitle('Get more details')
                                    }
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
                                    onClick={() =>
                                      setTakTitle('Share Quotation')
                                    }
                                  >
                                    Share Quotation
                                  </span>
                                </section>
                              </div>
                            </div>
                          )} */}
                                  <div className="text-xs font-bodyLato text-[#516f90]">
                                    Task Title
                                    <ErrorMessage
                                      component="div"
                                      name="taskTitle"
                                      className="error-message text-red-700 text-xs p-1"
                                    />
                                  </div>
                                  <input
                                    // onChange={setTakTitle()}
                                    autoFocus
                                    name="taskTitle"
                                    type="text"
                                    value={takTitle}
                                    onChange={(e) => {
                                      formik.setFieldValue(
                                        'taskTitle',
                                        e.target.value
                                      )
                                      setTitleFun(e)
                                    }}
                                    placeholder="Enter a short title"
                                    className="w-full h-full pb-1 outline-none text-sm font-bodyLato focus:border-blue-600 hover:border-blue-600  border-b border-[#cdcdcd] text-[33475b] bg-[#F5F8FA] "
                                  ></input>
                                  <div className="flex flex-row mt-3">
                                    <section>
                                      <span className="text-xs font-bodyLato text-[#516f90]">
                                        <span className="">
                                          {tempLeadStatus
                                            .charAt(0)
                                            .toUpperCase() +
                                            tempLeadStatus.slice(1)}{' '}
                                        </span>
                                        Due Date
                                      </span>
                                      <div className="bg-green   pl-   flex flex-row ">
                                        {/* <CalendarIcon className="w-4  ml-1 inline text-[#058527]" /> */}
                                        <span className="inline">
                                          <DatePicker
                                            className=" mt-[2px] pl- px- min-w-[240px] inline text-xs text-[#0091ae] bg-[#F5F8FA]"
                                            selected={startDate}
                                            onChange={(date) =>
                                              setStartDate(date)
                                            }
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
                                    </section>
                                  </div>
                                </section>
                                <div className="flex flex-row mt-4 justify-between pr-4 border-t">
                                  <section>
                                    <span>{''}</span>
                                  </section>
                                  <section className="flex">
                                    <button
                                      type="submit"
                                      // onClick={() => fAddSchedule()}
                                      className={`flex mt-2 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                    >
                                      <span className="ml-1 ">
                                        Create{' '}
                                        {tempLeadStatus !=
                                          streamCurrentStatus &&
                                          tempLeadStatus}{' '}
                                        Task
                                      </span>
                                    </button>
                                    <button
                                      // onClick={() => fSetLeadsType('Add Lead')}
                                      onClick={() => cancelResetStatusFun()}
                                      className={`flex mt-2 ml-4 rounded items-center text-bodyLato pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white `}
                                    >
                                      <span className="ml-1 ">Cancel</span>
                                    </button>
                                  </section>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    )}
                    {/* {addSch && (
                    <div className="flex flex-col pt-0 my-10 mx-4 mt-[10px] rounded">
                      <div className="  outline-none border  rounded p-4">
                        <div className=" text-sm font-normal">
                          Set{' '}
                          <span className="text-xs  text-orange-600">
                            {tempLeadStatus.toLocaleUpperCase()}{' '}
                          </span>
                          Time
                        </div>
                        {['visitfixed'].includes(tempLeadStatus) && (
                          <div className="flex flex-row  border-b mb-4">
                            <div className=" mb-3 flex justify-between">
                              <section>
                                <span
                                  className={`cursor-pointer  items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                  onClick={() => setTakTitle('Call again')}
                                >
                                  Call again {addSch.toString()}
                                </span>
                                <span
                                  className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                  onClick={() =>
                                    setTakTitle('Get more details')
                                  }
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
                        )}

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
                  )} */}

                    {leadSchLoading &&
                      [1, 2, 3].map((data, i) => <LogSkelton key={i} />)}

                    {!leadSchLoading &&
                      leadSchFetchedData.length == 0 &&
                      !addSch && (
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

                    <div className="max-h-[60%]">
                      <ol className="relative  border-gray-200 ">
                        {leadSchFilteredData.map((data, i) => (
                          <section key={i} className=" mx-2 bg-[#FFF] mb-[1px]">
                            {editTaskObj?.ct === data?.ct ? (
                              <div className="flex flex-col mx-4 py-5 ">
                                <Formik
                                  enableReinitialize={true}
                                  initialValues={initialState}
                                  validationSchema={validateSchema}
                                  onSubmit={(values, { resetForm }) => {
                                    editTaskFun(editTaskObj)
                                  }}
                                >
                                  {(formik) => (
                                    <Form>
                                      <div className=" form outline-none border  py-4">
                                        <section className=" px-4">
                                          <div className="text-xs font-bodyLato text-[#516f90]">
                                            Edit Title
                                            <ErrorMessage
                                              component="div"
                                              name="taskTitle"
                                              className="error-message text-red-700 text-xs p-1"
                                            />
                                          </div>
                                          <input
                                            // onChange={setTakTitle()}
                                            autoFocus
                                            name="taskTitle"
                                            type="text"
                                            value={takTitle}
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                'taskTitle',
                                                e.target.value
                                              )
                                              setTitleFun(e)
                                            }}
                                            placeholder="Enter a short title"
                                            className="w-full h-full pb-1 outline-none text-sm font-bodyLato focus:border-blue-600 hover:border-blue-600  border-b border-[#cdcdcd] text-[33475b] bg-[#F5F8FA] "
                                          ></input>
                                          <div className="flex flex-row mt-3">
                                            <section>
                                              <span className="text-xs font-bodyLato text-[#516f90]">
                                                Edit Due Date
                                              </span>
                                              <div className="bg-green   pl-   flex flex-row ">
                                                {/* <CalendarIcon className="w-4  ml-1 inline text-[#058527]" /> */}
                                                <span className="inline">
                                                  <DatePicker
                                                    className=" mt-[2px] pl- px-  inline text-xs text-[#0091ae] bg-[#F5F8FA]"
                                                    selected={startDate}
                                                    onChange={(date) =>
                                                      setStartDate(date)
                                                    }
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    injectTimes={[
                                                      setHours(
                                                        setMinutes(d, 1),
                                                        0
                                                      ),
                                                      setHours(
                                                        setMinutes(d, 5),
                                                        12
                                                      ),
                                                      setHours(
                                                        setMinutes(d, 59),
                                                        23
                                                      ),
                                                    ]}
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                  />
                                                </span>
                                              </div>
                                            </section>
                                          </div>
                                        </section>
                                        <div className="flex flex-row mt-4 justify-between pr-4 border-t">
                                          <section>
                                            <span>{''}</span>
                                          </section>
                                          <section className="flex">
                                            <button
                                              type="submit"
                                              // onClick={() => fAddSchedule()}
                                              className={`flex mt-2 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                            >
                                              <span className="ml-1 ">
                                                Edit Task
                                              </span>
                                            </button>
                                            <button
                                              // onClick={() => fSetLeadsType('Add Lead')}
                                              onClick={() =>
                                                cancelResetStatusFun()
                                              }
                                              className={`flex mt-2 ml-4 rounded items-center text-bodyLato pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white `}
                                            >
                                              <span className="ml-1 ">
                                                Cancel
                                              </span>
                                            </button>
                                          </section>
                                        </div>
                                      </div>
                                    </Form>
                                  )}
                                </Formik>
                              </div>
                            ) : (
                              <a
                                href="#"
                                className={`${
                                  data?.sts === 'completed'
                                    ? ''
                                    : 'hover:bg-gray-100'
                                }block items-center px-3 sm:flex  `}
                              >
                                {/* <PlusCircleIcon className="mr-3 mb-3 w-10 h-10 rounded-full sm:mb-0" /> */}

                                {data?.type != 'ph' && (
                                  <>
                                    {/* <span
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
                                </span> */}
                                    <div
                                      className="text-gray-600  my-2 w-screen"
                                      onMouseEnter={() => {
                                        hoverEffectTaskFun(data?.ct)
                                        // setHover(true)
                                      }}
                                      onMouseLeave={() => {
                                        hoverEffectTaskFun(2000)
                                        // setHover(false)
                                      }}
                                    >
                                      <section className="flex flex-row justify-between">
                                        <div className="block w-full">
                                          <div
                                            className={`${
                                              data?.sts === 'completed'
                                                ? 'cursor-not-allowed '
                                                : 'cursor-pointer'
                                            }  mt-1`}
                                            onClick={() => {
                                              if (data?.sts === 'pending') {
                                                setAddTaskCommentObj(data)
                                              }
                                            }}
                                          >
                                            <label className="inline-flex items-center">
                                              {data?.sts != 'completed' && (
                                                <span
                                                  className="px-[2px] py-[2px]  rounded-full border border-2 cursor-pointer text-[#cdcdcd]"
                                                  // onClick={() => doneFun(data)}
                                                  onClick={() =>
                                                    closeTaskFun(data)
                                                  }
                                                >
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-2 w-2"
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
                                                </span>
                                              )}
                                              {data?.sts === 'completed' && (
                                                <CheckCircleIcon className="w-4 h-4 inline text-[#058527]" />
                                              )}
                                              <div
                                                className={`${
                                                  data?.sts === 'completed'
                                                    ? 'line-through'
                                                    : 'cursor-pointer'
                                                }  ml-2 text-[14px] inline font-bodyLato font-brand tracking-wider text-[#0091ae]`}
                                                onClick={() => {
                                                  if (data?.sts === 'pending') {
                                                    setAddTaskCommentObj(data)
                                                  }
                                                }}
                                              >
                                                {data?.notes}
                                              </div>
                                            </label>

                                            {data?.comments?.map(
                                              (commentObj, k) => {
                                                return (
                                                  <li
                                                    key={k}
                                                    className={`ml-6 text-[13px] text-[#7E92A2] tracking-wide ${
                                                      data?.comments?.length -
                                                        1 ===
                                                      k
                                                        ? 'mb-1'
                                                        : ''
                                                    }`}
                                                  >
                                                    <svg
                                                      viewBox="0 0 12 12"
                                                      className="notes_icon inline w-2 h-2 mr-1"
                                                      aria-label="2 comments"
                                                    >
                                                      <g
                                                        fill="none"
                                                        fillRule="evenodd"
                                                      >
                                                        <path
                                                          fill="currentColor"
                                                          fillRule="nonzero"
                                                          d="M9.5 1A1.5 1.5 0 0 1 11 2.5v5A1.5 1.5 0 0 1 9.5 9H7.249L5.28 10.97A.75.75 0 0 1 4 10.44V9H2.5A1.5 1.5 0 0 1 1 7.5v-5A1.5 1.5 0 0 1 2.5 1h7zm0 1h-7a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5H5v1.836L6.835 8H9.5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z"
                                                        ></path>
                                                      </g>
                                                    </svg>{' '}
                                                    {commentObj?.c}
                                                  </li>
                                                )
                                              }
                                            )}
                                          </div>
                                        </div>
                                        {data?.sts == 'completed' &&
                                          hoverTasId === data?.ct && (
                                            <span
                                              className="font-thin text-[#e91313] cursor-pointer text-[12px]  font-bodyLato text-[10px] ml-2  border-b hover:border-[#0091ae]  "
                                              onClick={() => undoFun(data)}
                                            >
                                              UNDO
                                            </span>
                                          )}

                                        {data?.sts != 'completed' && (
                                          <section className="flex flex-row">
                                            <span
                                              onClick={() => {
                                                setAddTaskCommentObj(data)
                                              }}
                                              className="inline-flex  placeholder:font-thin text-[#0091ae]  cursor-pointer font-bodyLato text-[12px] ml-2 pt-1 text-[#867777] hover:text-green-900"
                                            >
                                              <svg
                                                viewBox="0 0 12 12"
                                                className="notes_icon inline w-4 h-4 mr-1 text-[#0091ae] "
                                                aria-label="2 comments"
                                              >
                                                <g
                                                  fill="none"
                                                  fillRule="evenodd"
                                                >
                                                  <path
                                                    fill="currentColor"
                                                    fillRule="nonzero"
                                                    d="M9.5 1A1.5 1.5 0 0 1 11 2.5v5A1.5 1.5 0 0 1 9.5 9H7.249L5.28 10.97A.75.75 0 0 1 4 10.44V9H2.5A1.5 1.5 0 0 1 1 7.5v-5A1.5 1.5 0 0 1 2.5 1h7zm0 1h-7a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5H5v1.836L6.835 8H9.5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z"
                                                  ></path>
                                                </g>
                                              </svg>
                                            </span>
                                            {data?.stsType === 'visitfixed' &&
                                              data?.sts != 'completed' && (
                                                <span
                                                  className=" mt-[3px]  ml-4 text-green-900 hover:border-[#7BD500] text-[12px] ml-2"
                                                  onClick={() =>
                                                    setShowVisitFeedBackStatusFun(
                                                      data,
                                                      'visitdone'
                                                    )
                                                  }
                                                >
                                                  VISITDONE
                                                </span>
                                              )}
                                          </section>
                                        )}

                                        {/* <span className="mt-2 block ext-xs text-xs font-bodyLato  font-normal text-red-900  text-gray-500 ml-1">
                                      {Math.abs(
                                        getDifferenceInMinutes(
                                          data?.schTime,
                                          ''
                                        )
                                      ) > 60
                                        ? `${getDifferenceInHours(
                                            data?.schTime,
                                            ''
                                          )} Hours `
                                        : `${getDifferenceInMinutes(
                                            data?.schTime,
                                            ''
                                          )} Min`}
                                    </span> */}
                                      </section>
                                      {addTaskCommentObj?.ct === data?.ct ? (
                                        <div className="flex flex-col mx-4 py-5 ">
                                          <Formik
                                            enableReinitialize={true}
                                            initialValues={initialCommentState}
                                            validationSchema={
                                              validateCommentsSchema
                                            }
                                            onSubmit={(
                                              values,
                                              { resetForm }
                                            ) => {
                                              console.log(
                                                'am i submitted comments',
                                                addCommentPlusTask
                                              )
                                              addTaskCommentFun(data)
                                            }}
                                          >
                                            {(formik) => (
                                              <Form>
                                                <div className=" form outline-none border  py-2">
                                                  <section className=" px-4">
                                                    <div className="flex flex-row  border-b mb-4 ">
                                                      <div className=" mb-3 flex justify-between">
                                                        <section>
                                                          {[
                                                            {
                                                              type: 'reschedule',
                                                              label: 'RNR',
                                                              desc: 'RNR',
                                                            },
                                                            {
                                                              type: 'reschedule',
                                                              label: 'Busy',
                                                              desc: 'Call again as customer is busy now.',
                                                            },
                                                            {
                                                              type: 'reschedule',
                                                              label:
                                                                'Switched Off',
                                                              desc: 'Phone Switched Off',
                                                            },

                                                            {
                                                              type: 'textHelp',
                                                              label:
                                                                'Project Details',
                                                              desc: 'Asked for Project details like broucher e.t.c',
                                                            },
                                                            {
                                                              type: 'textHelp',
                                                              label:
                                                                'Quotation',
                                                              desc: 'Share Quotation',
                                                            },
                                                            // {
                                                            //   type: "textHelp",

                                                            //   label: 'Book Cab',
                                                            //   desc: 'Book Cab',
                                                            // },
                                                            {
                                                              type: 'notinterested',

                                                              label:
                                                                'Not Interested',
                                                              desc: 'Not Interested',
                                                            },
                                                            {
                                                              type: 'visitfixed',
                                                              label:
                                                                'Visit Done',
                                                              desc: 'Visit Done',
                                                            },
                                                          ].map(
                                                            (dataObj, i) =>
                                                              (dataObj?.type ===
                                                                'reschedule' ||
                                                                dataObj?.type ===
                                                                  'textHelp' ||
                                                                dataObj?.type ===
                                                                  'notinterested' ||
                                                                (data?.stsType ===
                                                                  'visitfixed' &&
                                                                  dataObj?.type ===
                                                                    'visitfixed')) && (
                                                                <span>
                                                                  <span
                                                                    key={i}
                                                                    className={`cursor-pointer   mr-2 items-center h-4 px-3 py-1 mt-1 text-xs ${
                                                                      [
                                                                        'notinterested',
                                                                        'visitfixed',
                                                                      ].includes(
                                                                        dataObj?.type
                                                                      )
                                                                        ? 'text-[#333333] bg-[#7BD500]'
                                                                        : [
                                                                            'reschedule',
                                                                          ].includes(
                                                                            dataObj?.type
                                                                          )
                                                                        ? 'text-blue-500 bg-blue-100'
                                                                        : 'text-pink-500 bg-pink-100'
                                                                    }  rounded-full
                      `}
                                                                    onClick={() => {
                                                                      // setTakTitle(
                                                                      //   data?.desc
                                                                      // )
                                                                      if (
                                                                        dataObj?.type ===
                                                                        'visitfixed'
                                                                      ) {
                                                                        setShowVisitFeedBackStatusFun(
                                                                          data,
                                                                          'visitdone'
                                                                        )
                                                                      } else if (
                                                                        dataObj?.type ===
                                                                        'notinterested'
                                                                      ) {
                                                                        setShowNotInterestedFun(
                                                                          data,
                                                                          'notinterested'
                                                                        )
                                                                      } else {
                                                                        setAddCommentTitle(
                                                                          dataObj?.desc
                                                                        )
                                                                      }

                                                                      formik.setFieldValue(
                                                                        'commentTitle',
                                                                        dataObj?.desc
                                                                      )
                                                                    }}
                                                                  >
                                                                    {
                                                                      dataObj?.label
                                                                    }{' '}
                                                                  </span>
                                                                </span>
                                                              )
                                                          )}
                                                        </section>
                                                      </div>
                                                    </div>
                                                    <div className="flex flex-row justify-between">
                                                      <section className="w-full">
                                                        <div className="text-xs font-bodyLato text-[#516f90]">
                                                          Enter{' '}
                                                          <span className="text-red-800">
                                                            {closeTask &&
                                                              'Task Closing'}
                                                          </span>{' '}
                                                          Comment
                                                          <ErrorMessage
                                                            component="div"
                                                            name="commentTitle"
                                                            className="error-message text-red-700 text-xs p-1"
                                                          />
                                                        </div>
                                                        <input
                                                          // onChange={setTakTitle()}
                                                          // autoFocus
                                                          name="commentTitle"
                                                          type="text"
                                                          value={
                                                            addCommentTitle
                                                          }
                                                          onChange={(e) => {
                                                            console.log(
                                                              'any error ',
                                                              e,
                                                              e.target.value
                                                            )
                                                            formik.setFieldValue(
                                                              'commentTitle',
                                                              e.target.value
                                                            )
                                                            setAddCommentTitle(
                                                              e.target.value
                                                            )
                                                          }}
                                                          placeholder="Type here"
                                                          className="w-full  pb-1 pt-1 outline-none text-sm font-bodyLato focus:border-blue-600 hover:border-blue-600  border-b border-[#cdcdcd] text-[33475b] bg-white"
                                                        ></input>
                                                      </section>
                                                      <section>
                                                        <div className="flex flex-row  ml-8">
                                                          <section>
                                                            <span className="text-xs font-bodyLato text-[#516f90]">
                                                              Set Due Date
                                                            </span>
                                                            <div className="bg-green   pl-   flex flex-row ">
                                                              {/* <CalendarIcon className="w-4  ml-1 inline text-[#058527]" /> */}
                                                              <span className="inline">
                                                                <DatePicker
                                                                  className=" mt-[1px] pl- px- min-w-[151px] inline text-xs text-[#0091ae] bg-white"
                                                                  selected={
                                                                    addCommentTime
                                                                  }
                                                                  onChange={(
                                                                    date
                                                                  ) =>
                                                                    setAddCommentTime(
                                                                      date
                                                                    )
                                                                  }
                                                                  showTimeSelect
                                                                  timeFormat="HH:mm"
                                                                  injectTimes={[
                                                                    setHours(
                                                                      setMinutes(
                                                                        d,
                                                                        1
                                                                      ),
                                                                      0
                                                                    ),
                                                                    setHours(
                                                                      setMinutes(
                                                                        d,
                                                                        5
                                                                      ),
                                                                      12
                                                                    ),
                                                                    setHours(
                                                                      setMinutes(
                                                                        d,
                                                                        59
                                                                      ),
                                                                      23
                                                                    ),
                                                                  ]}
                                                                  dateFormat="MMMM d, yyyy h:mm aa"
                                                                />
                                                              </span>
                                                            </div>
                                                          </section>
                                                        </div>
                                                      </section>
                                                    </div>
                                                  </section>
                                                  <div className="flex flex-row mt-4 justify-between pr-4 border-t">
                                                    <section className="ml-2 mt-2">
                                                      <span className="text-xs text-xs font-bodyLato  font-normal text-red-900  text-gray-500  font-thin text-[#0091ae] cursor-pointer  font-bodyLato text-[10px] ">
                                                        {/* {data?.stsType ===
                                                          'visitfixed' &&
                                                          data?.sts !=
                                                            'completed' && (
                                                            <span
                                                              className=" border-b text-green-900 hover:border-[#7BD500] text-[12px] ml-2"
                                                              onClick={() =>
                                                                setShowVisitFeedBackStatusFun(
                                                                  data,
                                                                  'visitdone'
                                                                )
                                                              }
                                                            >
                                                              VISIT CANCEL
                                                            </span>
                                                          )} */}
                                                      </span>
                                                    </section>

                                                    <section className="flex">
                                                      <button
                                                        type="submit"
                                                        onClick={() => {
                                                          setClosePrevious(
                                                            false
                                                          )
                                                        }}
                                                        className={`flex mt-2 ml-4 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[28px] pr-4 py-1 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                                      >
                                                        <span className="ml-1 text-md">
                                                          {closeTask &&
                                                            'Close Task &'}{' '}
                                                          Add Comment{' '}
                                                        </span>
                                                      </button>

                                                      <button
                                                        type="submit"
                                                        onClick={() => {
                                                          setAddCommentPlusTask(
                                                            true
                                                          )
                                                          setClosePrevious(
                                                            false
                                                          )
                                                        }}
                                                        className={`flex mt-2 ml-2 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[28px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                                      >
                                                        <span className="ml-1 text-md">
                                                          Close & Add New Task
                                                        </span>
                                                      </button>

                                                      <button
                                                        // onClick={() => fSetLeadsType('Add Lead')}
                                                        onClick={() =>
                                                          cancelResetStatusFun()
                                                        }
                                                        className={`flex mt-2 ml-2 rounded-xs items-center text-bodyLato pl-2 h-[28px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white `}
                                                      >
                                                        <span className="ml-1 ">
                                                          Cancel
                                                        </span>
                                                      </button>
                                                    </section>
                                                  </div>
                                                </div>
                                              </Form>
                                            )}
                                          </Formik>
                                        </div>
                                      ) : null}
                                      {(showNotInterested ||
                                        showVisitFeedBackStatus) &&
                                        selSchGrpO?.ct === data?.ct && (
                                          <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-[#FFF9F2] mx-4 p-4">
                                            {showNotInterested && (
                                              <div className="w-full flex flex-col mb-3 mt-2">
                                                <SelectDropDownComp
                                                  label={`Why  ${
                                                    customerDetails?.Name?.toLocaleUpperCase() ||
                                                    'Customer'
                                                  } is  not Interested *`}
                                                  options={notInterestOptions}
                                                  value={fbTitle}
                                                  onChange={(value) => {
                                                    // formik.setFieldValue('source', value.value)
                                                    setFbTitle(value.value)
                                                  }}
                                                />
                                                {/* <CustomSelect
                                                  name="source"
                                                  label={`Why  ${
                                                    customerDetails?.Name?.toLocaleUpperCase() ||
                                                    'Customer'
                                                  } is  not Interested *`}
                                                  className="input mt-3"
                                                  onChange={(value) => {
                                                    // formik.setFieldValue('source', value.value)
                                                    setNotInterestType(
                                                      value.value
                                                    )
                                                  }}
                                                  value={notInterestType}
                                                  options={notInterestOptions}
                                                /> */}
                                              </div>
                                            )}
                                            {showVisitFeedBackStatus && (
                                              <div className="w-full flex flex-col mb-3 mt-2">
                                                <SelectDropDownComp
                                                  label="Sites Visit Feedback*"
                                                  options={
                                                    siteVisitFeedbackOptions
                                                  }
                                                  value={fbTitle}
                                                  onChange={(value) => {
                                                    // formik.setFieldValue('source', value.value)
                                                    setFbTitle(value.value)
                                                  }}
                                                />
                                                {/* <CustomSelect
                                                  id={selSchGrpO?.ct}
                                                  name="source"
                                                  label="Sites Visit Feedback*"
                                                  className="input mt-3"
                                                  onChange={(value) => {
                                                    // formik.setFieldValue('source', value.value)
                                                    setNotInterestType(
                                                      value.value
                                                    )
                                                  }}
                                                  value={notInterestType}
                                                  options={
                                                    siteVisitFeedbackOptions
                                                  }
                                                /> */}
                                              </div>
                                            )}

                                            <div className="  outline-none border  rounded p-4 mt-4">
                                              <textarea
                                                value={fbNotes}
                                                onChange={(e) =>
                                                  setfbNotes(e.target.value)
                                                }
                                                placeholder="Type & make a notes"
                                                className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFF9F2] "
                                              ></textarea>
                                            </div>
                                            <div className="flex flex-row mt-1">
                                              <button
                                                onClick={() => {
                                                  setLeadStatus('visitdone')
                                                  if (showNotInterested) {
                                                    notInterestedFun()
                                                    return
                                                  }
                                                  addFeedbackFun(data)
                                                }}
                                                className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                              >
                                                <span className="ml-1 ">
                                                  Save
                                                </span>
                                              </button>
                                              <button
                                                onClick={() => {
                                                  setLeadStatus('visitdone')
                                                  if (showNotInterested) {
                                                    notInterestedFun()
                                                    return
                                                  }
                                                  addFeedbackFun(data)
                                                }}
                                                className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                              >
                                                <span className="ml-1 ">
                                                  Save & Whats App
                                                </span>
                                              </button>
                                              <button
                                                // onClick={() => fSetLeadsType('Add Lead')}
                                                onClick={() =>
                                                  cancelResetStatusFun()
                                                }
                                                className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white  `}
                                              >
                                                <span className="ml-1 ">
                                                  Cancel
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                        )}

                                      <section className="flex flex-row justify-between">
                                        <section className="flex flex-row">
                                          <span className="text-xs text-xs font-bodyLato  font-normal text-[#b03d32] text-gray-500 ml-6">
                                            {/* <CalendarIcon className="w-3 inline text-[#058527]" />{' '} */}

                                            {/* {prettyDateTime(data?.schTime)} || */}

                                            {data?.sts === 'completed' && (
                                              <span className="text-[#4c1d95] flex flex-row">
                                                <div
                                                  className="relative flex flex-col  group"
                                                  // style={{ alignItems: 'end' }}
                                                >
                                                  <div
                                                    className="absolute bottom-0 right-0 flex-col items-center hidden mb-6 group-hover:flex"
                                                    // style={{  width: '300px' }}
                                                    style={{ zIndex: '9999' }}
                                                  >
                                                    <span
                                                      className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                                                      style={{
                                                        color: 'black',
                                                        background: '#e2c062',
                                                        maxWidth: '100%',
                                                      }}
                                                    >
                                                      <div className="italic flex flex-col">
                                                        <div className="font-bodyLato">
                                                          Due on:{' '}
                                                          {prettyDateTime(
                                                            data?.schTime
                                                          )}{' '}
                                                        </div>
                                                      </div>
                                                    </span>
                                                    <div
                                                      className="w-3 h-3  -mt-2 rotate-45 bg-black"
                                                      style={{
                                                        background: '#e2c062',
                                                        marginRight: '12px',
                                                      }}
                                                    ></div>
                                                  </div>
                                                  <span className="font-bodyLato">
                                                    {/* <HighlighterStyle
                            searchKey={searchKey}
                            source={row.Source.toString()}
                          /> */}
                                                    <svg
                                                      width="12"
                                                      height="12"
                                                      viewBox="0 0 12 12"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      className="calendar_icon inline mr-1"
                                                    >
                                                      <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"
                                                        fill="currentColor"
                                                      ></path>
                                                    </svg>{' '}
                                                    {prettyDateTime(
                                                      data?.schTime
                                                    )}{' '}
                                                  </span>
                                                </div>
                                                <div className="relative flex flex-col  group">
                                                  <div
                                                    className="absolute bottom-0 right-0 flex-col items-center hidden mb-6 group-hover:flex"
                                                    style={{ zIndex: '9999' }}
                                                  >
                                                    <span
                                                      className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                                                      style={{
                                                        color: 'black',
                                                        background: '#e2c062',
                                                        maxWidth: '100%',
                                                      }}
                                                    >
                                                      <div className="italic flex flex-col">
                                                        <div className="font-bodyLato">
                                                          Completed on{' '}
                                                          {prettyDateTime(
                                                            data?.comT
                                                          )}
                                                        </div>
                                                      </div>
                                                    </span>
                                                    <div
                                                      className="w-3 h-3  -mt-2 rotate-45 bg-black"
                                                      style={{
                                                        background: '#e2c062',
                                                        marginRight: '12px',
                                                      }}
                                                    ></div>
                                                  </div>
                                                  <span className="font-bodyLato">
                                                    {/* <HighlighterStyle
                                      searchKey={searchKey}
                                      source={row.Source.toString()}
                                                /> */}

                                                    <span className="text-green-900 ml-2">
                                                      <CheckIcon className="w-4 h-4 inline text-[#058527]" />{' '}
                                                      {'   '}
                                                      {prettyDateTime(
                                                        data?.comT
                                                      )}{' '}
                                                    </span>
                                                  </span>
                                                </div>
                                              </span>
                                            )}

                                            {data?.sts != 'completed' && (
                                              <div className="flex flex-row">
                                                <div
                                                  className="relative flex flex-col  group"
                                                  // style={{ alignItems: 'end' }}
                                                >
                                                  <div
                                                    className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex z-100000"
                                                    // style={{  width: '300px' }}
                                                    // style={{
                                                    //   zIndex: '1',
                                                    // }}
                                                  >
                                                    <span
                                                      className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                                                      style={{
                                                        color: 'black',
                                                        background: '#e2c062',
                                                        width: '100%',
                                                      }}
                                                    >
                                                      <div className="italic flex flex-col">
                                                        <div className="font-bodyLato">
                                                          {prettyDateTime(
                                                            data?.schTime
                                                          )}
                                                        </div>
                                                      </div>
                                                    </span>
                                                    <div
                                                      className="w-3 h-3  -mt-2 rotate-45 bg-black"
                                                      style={{
                                                        background: '#e2c062',
                                                        marginRight: '12px',
                                                      }}
                                                    ></div>
                                                  </div>
                                                  <span
                                                    className={`font-bodyLato flex flex-row ${
                                                      getDifferenceInMinutes(
                                                        data?.schTime,
                                                        ''
                                                      ) >= 0
                                                        ? 'text-violet-900'
                                                        : 'text-[#b03d32]'
                                                    }`}
                                                  >
                                                    {/* <HighlighterStyle
                            searchKey={searchKey}
                            source={row.Source.toString()}
                          /> */}
                                                    <svg
                                                      width="12"
                                                      height="12"
                                                      viewBox="0 0 12 12"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      className="calendar_icon inline mr-1 mt-[2px]"
                                                    >
                                                      <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M9.5 1h-7A1.5 1.5 0 001 2.5v7A1.5 1.5 0 002.5 11h7A1.5 1.5 0 0011 9.5v-7A1.5 1.5 0 009.5 1zM2 2.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7zM8.75 8a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM3.5 4a.5.5 0 000 1h5a.5.5 0 000-1h-5z"
                                                        fill="currentColor"
                                                      ></path>
                                                    </svg>
                                                    <div className="italic mr-2 inline">
                                                      <div className="font-bodyLato">
                                                        {prettyDateTime(
                                                          data?.schTime
                                                        )}
                                                      </div>
                                                    </div>
                                                    {getDifferenceInMinutes(
                                                      data?.schTime,
                                                      ''
                                                    ) >= 0
                                                      ? 'Complete in'
                                                      : 'Delayed by'}{' '}
                                                    {'  '}
                                                    {Math.abs(
                                                      getDifferenceInMinutes(
                                                        data?.schTime,
                                                        ''
                                                      )
                                                    ) > 60
                                                      ? Math.abs(
                                                          getDifferenceInMinutes(
                                                            data?.schTime,
                                                            ''
                                                          )
                                                        ) > 8640
                                                        ? `${Math.abs(
                                                            getDifferenceInDays(
                                                              data?.schTime,
                                                              ''
                                                            )
                                                          )} Days `
                                                        : `${Math.abs(
                                                            getDifferenceInHours(
                                                              data?.schTime,
                                                              ''
                                                            )
                                                          )} Hours `
                                                      : `${Math.abs(
                                                          getDifferenceInMinutes(
                                                            data?.schTime,
                                                            ''
                                                          )
                                                        )} Min`}{' '}
                                                  </span>
                                                </div>
                                              </div>
                                            )}
                                          </span>
                                          <div className="relative flex flex-col  group">
                                            <div
                                              className="absolute bottom-0 right-0 flex-col items-center hidden mb-6 group-hover:flex"
                                              style={{ zIndex: '9999' }}
                                            >
                                              <span
                                                className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                                                style={{
                                                  color: 'black',
                                                  background: '#e2c062',
                                                  maxWidth: '100%',
                                                }}
                                              >
                                                <div className="italic flex flex-col">
                                                  <div className="font-bodyLato">
                                                    Assigned To {data?.by}
                                                  </div>
                                                </div>
                                              </span>
                                              <div
                                                className="w-3 h-3  -mt-2 rotate-45 bg-black"
                                                style={{
                                                  background: '#e2c062',
                                                  marginRight: '12px',
                                                }}
                                              ></div>
                                            </div>

                                            <span className="font-thin text-[#867777]   font-bodyLato text-[12px]  ml-2">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                className="inline mr-1"
                                              >
                                                <path
                                                  d="M9.357 1C10.264 1 11 1.736 11 2.643V6.07c0 .436-.173.854-.481 1.162L7.232 10.52a1.643 1.643 0 01-2.323 0L1.48 7.09c-.64-.64-.64-1.68.001-2.322L4.768 1.48C5.076 1.173 5.494 1 5.93 1h3.427zm-.07.91H5.93a.805.805 0 00-.569.235L2.145 5.362a.805.805 0 000 1.138L5.5 9.855a.805.805 0 001.138 0l3.217-3.217a.805.805 0 00.236-.569V2.713a.804.804 0 00-.804-.804zM7.364 3.726a.91.91 0 110 1.818.91.91 0 010-1.818z"
                                                  fill="currentColor"
                                                  fillRule="evenodd"
                                                ></path>
                                              </svg>
                                              {data?.by}
                                            </span>
                                          </div>
                                        </section>
                                        {data?.sts != 'completed' &&
                                          hoverTasId === data?.ct && (
                                            <section className="flex flex-row">
                                              <span
                                                className="inline-flex  font-thin text-[#0091ae]   font-bodyLato text-[12px] ml-2  text-[#867777] hover:text-green-900"
                                                onClick={() =>
                                                  EditTaskOpenWindowFun(data)
                                                }
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
                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                  />
                                                </svg>
                                              </span>
                                              <span
                                                onClick={() => delFun(data)}
                                                className="inline-flex  placeholder:font-thin text-[#0091ae]  cursor-pointer font-bodyLato text-[12px] ml-2  text-[#867777] hover:text-green-900"
                                              >
                                                <svg
                                                  className="h-4 w-4"
                                                  viewBox="0 0 21 21"
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
                                              </span>
                                            </section>
                                          )}
                                        {/* <span>
                                      <span
                                        className=" text-[12px]  text-[#FF8C02] "
                                        onClick={() => fUpdateSchedule(data)}
                                      >
                                        Busy
                                      </span>
                                      <span
                                        className=" text-[12px] ml-4  text-[#FF8C02] "
                                        onClick={() => fUpdateSchedule(data)}
                                      >
                                        RNR
                                      </span>
                                    </span> */}
                                      </section>
                                    </div>
                                  </>
                                )}
                              </a>
                            )}
                          </section>
                        ))}
                      </ol>
                    </div>
                  </div>
                </>
              )}
              {selFeature === 'timeline' && (
                <div className="py-8 px-8  border">
                  {filterData?.length == 0 && (
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
                    {filterData?.map((data, i) => (
                      <section key={i} className=" mx-2 bg-white mb-2">
                        <a
                          href="#"
                          className="block items-center px-3 sm:flex hover:bg-gray-100 "
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
                            <div className="text-gray-600 font-bodyLato mx-3 my-1">
                              <div className="text-base font-normal">
                                {data?.type === 'sts_change' && (
                                  <span className="text-xs text-red-900 ">
                                    {data?.from?.toUpperCase()} {'  '}
                                  </span>
                                )}
                                <span className="text-sm text-green-900 mx-2 ">
                                  {activieLogNamer(data)}
                                </span>{' '}
                                {data?.type === 'sts_change' && (
                                  <span className="text-xs text-red-900 ">
                                    {'  '} {data?.to?.toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm font-normal">
                                {data?.txt}
                              </div>
                              <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                                <ClockIcon className=" w-3 h-3 text-gray-300" />

                                <span className="text-gray-400 ml-1 mr-4">
                                  {data?.type == 'ph'
                                    ? timeConv(
                                        Number(data?.time)
                                      ).toLocaleString()
                                    : timeConv(data?.T).toLocaleString()}
                                </span>
                                <span className="text-green-900 ml-2">by:</span>
                                <span className="text-gray-400 ml-1 mr-4">
                                  {data?.by}
                                </span>
                              </span>
                            </div>
                          )}
                        </a>
                      </section>
                    ))}
                  </ol>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}
