/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dialog } from '@headlessui/react'
import { useState, useEffect, createRef } from 'react'
import jsPDF from 'jspdf'
import { renderToString } from 'react-dom/server'
import { RadioGroup } from '@headlessui/react'
import { Label, InputField, TextAreaField, FieldError } from '@redwoodjs/forms'
import Select from 'react-select'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import NumberFormat from 'react-number-format'

import { TextField } from 'src/util/formFields/TextField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import Loader from './Loader/Loader'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import {
  addLead,
  addLeadScheduler,
  checkIfLeadAlreadyExists,
  getAllProjects,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { Timestamp } from 'firebase/firestore'
import { useRouterStateSetter } from '@redwoodjs/router/dist/router-context'
import {
  sendWhatAppMediaSms,
  sendWhatAppTextSms,
} from 'src/util/axiosWhatAppApi'
import AddBookingForm from './bookingForm'
import BlockingUnitForm from './BlockingUnitForm'
import UnitTransactionForm from './UnitBillTransactionForm'
import AddPaymentDetailsForm from './PaymentReceiptForm'
import { TextField2 } from 'src/util/formFields/TextField2'
import { TextFieldFlat } from 'src/util/formFields/TextFieldFlatType'
import { apartUnitChargesMock } from 'src/constants/projects'

const CostBreakUpSheet = ({
  selMode,
  title,
  leadDetailsObj,
  projectDetails,
  selPhaseObj,
  unitDetails,
  dialogOpen,
  setShowCostSheetWindow,
  selUnitDetails,
}) => {
  const { user } = useAuth()
  const ref = createRef()
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [costSheetA, setCostSheetA] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [initialValuesA, setInitialValuesA] = useState({})
  const [newSqftPrice, setNewSqftPrice] = useState(0)
  const [onStep, setOnStep] = useState('costsheet')

  useEffect(() => {
    console.log('phase details are ', selPhaseObj)
    const { additonalChargesObj, paymentScheduleObj } = selPhaseObj
    console.log('unit details', unitDetails)
    setNewSqftPrice(selUnitDetails?.rate_per_sqft)
    const x = [
      {
        myId: '1',
        units: {
          value: 'fixedcost',
          label: 'Fixed cost',
        },
        component: {
          value: 'unit_cost_charges',
          label: 'Unit Cost',
        },
        charges:
          selUnitDetails?.super_built_up_area * selUnitDetails?.rate_per_sqft,
        gst: {
          label: '0',
          value: '0',
        },
      },
    ]
    // const x = costSheetA
    const merged = [...x, ...additonalChargesObj]
    const initformValues = {}
    merged.map((d) => {
      const x = d['component']['value']
      console.log('initial values ', x, d?.charges)
      initformValues[`${x}`] = d?.charges
    })
    console.log('initial values ', initformValues)
    setInitialValuesA(initformValues)

    setCostSheetA(merged)
    console.log('phase details are ', merged, costSheetA)
  }, [selPhaseObj])

  // useEffect(() => {
  //   console.log('value os costsheet', costSheetA)
  // }, [costSheetA])

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
    const unsubscribe = getAllProjects(
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        console.log('fetched users list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
  }
  const colstyle = {}
  const tableStyle = {
    width: '100%',
  }
  const moveStep = (stepper) => {
    setOnStep(stepper)
  }
  const Prints = () => (
    <div>
      <h3 className="text-blue-600">
        Time & Materials Statement of Work (SOW)
      </h3>
      <h4>General Information</h4>
      <table
        id="tab_customers"
        className="table table-striped"
        style={tableStyle}
      >
        <colgroup>
          <col span={1} style={colstyle} />
          <col span={1} style={colstyle} />
        </colgroup>
        <thead>
          <tr className="warning">
            <th>SOW Creation Date</th>
            <th>SOW Start Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dec 13, 2017</td>
            <td>Jan 1, 2018</td>
          </tr>
        </tbody>
      </table>
      <p>
        This is a Time and Materials Statement of Work between Northwestern
        Mutual Life Insurance Company and Infosys with all general terms and
        conditions as described in the current Master Agreement and its related
        documents
      </p>
    </div>
  )
  const downloadPdf = () => {
    // const doc = new jsPDF('p', 'pt')
    // doc.text('This is default text', 20, 20)
    // doc.save('generated.pdf')
    const string = renderToString(<Prints />)
    const pdf = new jsPDF('p', 'pt', 'a4')
    pdf.text('This is default text', 20, 20)
    pdf.html(string)
    pdf.save('pdf')
  }

  const aquaticCreatures = [
    { label: 'Select the Project', value: '' },
    { label: 'Subha Ecostone', value: 'subhaecostone' },
    { label: 'Esperanza', value: 'esperanza' },
    { label: 'Nakshatra Township', value: 'nakshatratownship' },
  ]
  // const usersList = [
  //   { label: 'User1', value: 'User1' },
  //   { label: 'User2', value: 'User2' },
  //   { label: 'User3', value: 'User3' },
  // ]
  const budgetList = [
    { label: 'Select Customer Budget', value: '' },
    { label: '5 - 10 Lacs', value: 'Bangalore,KA' },
    { label: '10 - 20 Lacs', value: 'Cochin,KL' },
    { label: '20 - 30 Lacs', value: 'Mumbai,MH' },
    { label: '30 - 40 Lacs', value: 'Mumbai,MH' },
    { label: '40 - 50 Lacs', value: 'Mumbai,MH' },
    { label: '50 - 60 Lacs', value: 'Mumbai,MH' },
    { label: '60 - 70 Lacs', value: 'Mumbai,MH' },
    { label: '70 - 80 Lacs', value: 'Mumbai,MH' },
    { label: '80 - 90 Lacs', value: 'Mumbai,MH' },
    { label: '90 - 100 Lacs', value: 'Mumbai,MH' },
    { label: '1.0 Cr - 1.1 Cr', value: 'Mumbai,MH' },
    { label: '1.1 Cr - 1.2 Cr', value: 'Mumbai,MH' },
    { label: '1.2 Cr - 1.3 Cr', value: 'Mumbai,MH' },
    { label: '1.3 Cr - 1.4 Cr', value: 'Mumbai,MH' },
    { label: '1.4 Cr - 1.5 Cr', value: 'Mumbai,MH' },
    { label: '1.5 + Cr', value: 'Mumbai,MH' },
  ]

  const plans = [
    {
      name: 'Apartment',
      img: '/apart1.svg',
    },
    {
      name: 'Plots',
      img: '/plot.svg',
    },
    {
      name: 'WeekendVillas',
      img: '/weekend.svg',
    },
    {
      name: 'Villas',
      img: '/villa.svg',
    },
  ]

  const devTypeA = [
    {
      name: 'Outright',
      img: '/apart.svg',
    },
    {
      name: 'Joint',
      img: '/apart1.svg',
    },
  ]
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [devType, setdevType] = useState(devTypeA[0])
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

  const typeSel = async (sel) => {
    await console.log('value is', selected)
    await setSelected(sel)
    await console.log('thsi si sel type', sel, selected)
  }
  const devTypeSel = async (sel) => {
    await setdevType(sel)
  }
  const onSubmitFun = async (data, resetForm) => {
    console.log(data)
    setLoading(true)

    const {
      email,
      name,
      mobileNo,
      assignedTo,
      assignedToObj,
      source,
      project,
    } = data
    // updateUserRole(uid, deptVal, myRole, email, 'nitheshreddy.email@gmail.com')

    const foundLength = await checkIfLeadAlreadyExists('spark_leads', mobileNo)
    const leadData = {
      Date: Timestamp.now().toMillis(),
      Email: email,
      Mobile: mobileNo,
      Name: name,
      Note: '',
      Project: project,
      Source: source,
      Status: assignedTo === '' ? 'unassigned' : 'new',
      intype: 'Form',
      assignedTo: assignedToObj?.value || '',
      assingedToObj: {
        department: assignedToObj?.department || [],
        email: assignedToObj?.email || '',
        label: assignedToObj?.label || '',
        name: assignedToObj?.name || '',
        namespace: 'spark',
        roles: assignedToObj?.roles || [],
        uid: assignedToObj?.value || '',
        value: assignedToObj?.value || '',
      },
      by: user?.email,
    }
    console.log('user is ', user)
    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength)
      setFormMessage('User Already Exists with Ph No')
      setLoading(false)
    } else {
      console.log('foundLENGTH IS empty ', foundLength)

      // proceed to copy
      await addLead(
        leadData,
        user?.email,
        `lead created and assidged to ${assignedTo}`
      )

      await sendWhatAppTextSms(
        mobileNo,
        `Thank you ${name} for choosing the world className ${
          project || 'project'
        }`
      )

      // msg2
      await sendWhatAppMediaSms(mobileNo)
      const smg =
        assignedTo === ''
          ? 'You Interested will be addressed soon... U can contact 9123456789 mean while'
          : 'we have assigned dedicated manager to you. Mr.Ram as ur personal manager'

      // msg3
      sendWhatAppTextSms(mobileNo, smg)
      resetForm()
      setFormMessage('Saved Successfully..!')
      setLoading(false)
    }
  }

  const deptList = [
    { label: 'Select the Source', value: '' },
    { label: 'Google Adwords', value: 'googleadwords' },
    { label: 'Facebook Ad', value: 'facebookad' },
    { label: 'Instragram Ad', value: 'instragramad' },
    { label: 'Magic Bricks', value: 'magicbricks' },
    { label: 'Direct Contact', value: 'directcontact' },
    { label: 'CP Skagen', value: 'cpskagen' },
  ]
  const initialState = initialValuesA
  const validate = Yup.object({
    blockReason: Yup.number()
      .max(15, 'Must be 15 characters or less')
      .required('Name is Required'),
  })
  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }
  return (
    <>
      <section className="py-20  bg-black">
        <div className="max-w-5xl w-5xl mx-auto right-0 text-white flex flex-row justify-between">
          <span></span>
          <span onClick={() => setShowCostSheetWindow(false)}>Close</span>
        </div>
        <div className="max-w-5xl mx-auto py-16  px-10 bg-white">
          <article className="overflow-hidden">
            <div className="bg-[white] rounded-b-md">
              <div className="p-9 ">
                <div className=" text-slate-700 flex flex-row ">
                  <img
                    alt=""
                    className="object-cover h-12"
                    src="https://pbs.twimg.com/profile_images/1513243060834123776/dL8-d7zI_400x400.png"
                  />
                  <div className="">
                    <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                      {projectDetails?.projectName}
                    </p>
                    {projectDetails?.address}-{projectDetails?.state}-
                    {projectDetails?.pincode}
                  </div>
                </div>
              </div>
              <div className="px-9">
                <p className="text-md font-extrabold tracking-tight uppercase font-body">
                  Unit Details
                </p>
                <div className="flex w-full mt-4">
                  <div className="ml-1 grid grid-cols-7 gap-12">
                    {/* <div className="text-sm font-light text-slate-500">
                      <p className="text-sm font-normal text-slate-700">
                        Invoice Detail:
                      </p>
                      <p>Unwrapped</p>
                      <p>Fake Street 123</p>
                      <p>San Javier</p>
                      <p
                        onClick={() => setShowCostSheetWindow(false)}
                        className="text-blue-500 cursor-pointer"
                      >
                        Close
                      </p>
                    </div> */}

                    <div className="text-sm font-light text-slate-500">
                      <p className="text-sm font-normal text-slate-700">
                        Unit Number
                      </p>
                      <p>{selUnitDetails?.unit_no}</p>

                      <p className="mt-2 text-sm font-normal text-slate-700">
                        Unit Dim
                      </p>
                      <p>{selUnitDetails?.super_built_up_area}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                      <p className="text-sm font-normal text-slate-700">
                        Block
                      </p>
                      <p>{selUnitDetails?.Block || 'NA'}</p>

                      <p className="mt-2 text-sm font-normal text-slate-700">
                        Floor
                      </p>
                      <p>{selUnitDetails?.floor || 'NA'}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                      <p className="text-sm font-normal text-slate-700">
                        Unit Area
                      </p>
                      <p>{selUnitDetails?.super_built_up_area || 'NA'}</p>

                      <p className="mt-2 text-sm font-normal text-slate-700">
                        Built Up Area
                      </p>
                      <p>{selUnitDetails?.builtup_area}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                      <p className="text-sm font-normal text-slate-700">
                        Facing
                      </p>
                      <p>{selUnitDetails?.facing || 'NA'}</p>

                      <p className="mt-2 text-sm font-normal text-slate-700">
                        Rate Per Sqft
                      </p>
                      <p>{selUnitDetails?.rate_per_sqft || 'NA'}</p>
                    </div>

                    <div className="text-sm font-light text-slate-500">
                      <p className="text-sm font-normal text-slate-700">
                        Carpet Area
                      </p>
                      <p>{selUnitDetails?.carpet_area || 'NA'}</p>

                      <p className="mt-2 text-sm font-normal text-slate-700">
                        Car Parking
                      </p>
                      <p>{selUnitDetails?.carparking || 'NA'}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                      <p className="text-sm font-normal text-slate-700">
                        Bed Rooms
                      </p>
                      <p>{selUnitDetails?.bed_rooms || 'NA'}</p>

                      <p className="mt-2 text-sm font-normal text-slate-700">
                        Bath Rooms
                      </p>
                      <p>{selUnitDetails?.bath_rooms || 'NA'}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500">
                      <p className="text-sm font-normal text-slate-700">
                        Premium
                      </p>
                      <p>{selUnitDetails?.premium || 'NA'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="mx-4 p-4">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center  relative ${
                        ['costsheet'].includes(onStep)
                          ? 'text-white'
                          : 'text-teal-600'
                      }`}
                      onClick={() => moveStep('costsheet')}
                    >
                      <div
                        className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                          ['costsheet'].includes(onStep)
                            ? 'bg-teal-600 border-teal-600'
                            : 'border-teal-600'
                        } `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-bookmark "
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <div
                        className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                          ['costsheet'].includes(onStep)
                            ? 'text-teal-600'
                            : 'text-gray-500'
                        }`}
                      >
                        Cost sheet
                      </div>
                    </div>
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-teal-600"></div>
                    <div
                      className={`flex items-center  relative ${
                        ['customerDetails'].includes(onStep)
                          ? 'text-white'
                          : 'text-teal-600'
                      }`}
                      onClick={() => moveStep('customerDetails')}
                    >
                      <div
                        className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                          ['customerDetails'].includes(onStep)
                            ? 'bg-teal-600 border-teal-600'
                            : 'border-teal-600'
                        } `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-user-plus "
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="20" y1="8" x2="20" y2="14"></line>
                          <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                      </div>
                      <div
                        className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                          ['customerDetails'].includes(onStep)
                            ? 'text-teal-600'
                            : 'text-gray-500'
                        }`}
                      >
                        Customer details
                      </div>
                    </div>
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                    <div
                      className={`flex items-center  relative ${
                        ['booksheet'].includes(onStep)
                          ? 'text-white'
                          : 'text-teal-600'
                      }`}
                      onClick={() => moveStep('booksheet')}
                    >
                      <div
                        className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                          ['booksheet'].includes(onStep)
                            ? 'bg-teal-600 border-teal-600'
                            : 'border-teal-600'
                        } `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-mail "
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <div
                        className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                          ['booksheet'].includes(onStep)
                            ? 'text-teal-600'
                            : 'text-gray-500'
                        }`}
                      >
                        Book
                      </div>
                    </div>
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                    <div
                      className={`flex items-center  relative ${
                        ['blocksheet'].includes(onStep)
                          ? 'text-white'
                          : 'text-teal-600'
                      }`}
                      onClick={() => moveStep('blocksheet')}
                    >
                      <div
                        className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                          ['blocksheet'].includes(onStep)
                            ? 'bg-teal-600 border-teal-600'
                            : 'border-teal-600'
                        } `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-mail "
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <div
                        className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                          ['blocksheet'].includes(onStep)
                            ? 'text-teal-600'
                            : 'text-gray-500'
                        }`}
                      >
                        Block
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {['costsheet', 'allsheets'].includes(onStep) && (
                <div className="p-9">
                  <section className="flex flex-row">
                    <p className="text-md font-extrabold tracking-tight uppercase font-body pb-4">
                      COST SHEET
                    </p>
                    <div className="flex-auto flex flex-row-reverse">
                      <button
                        className="h-[30px] text-base hover:scale-110 focus:outline-none flex justify-center px-2  rounded font-bold cursor-pointer
                        hover:bg-teal-200
                        bg-teal-100
                        text-teal-700
                        border duration-200 ease-in-out
                        border-teal-100 transition"
                      >
                        {'>'}
                      </button>
                    </div>
                  </section>
                  <div className="flex flex-col mx-0 bg-[#F1F5F9] ">
                    <div className="px-9 py-10">
                      <Formik
                        enableReinitialize={true}
                        initialValues={initialState}
                        validationSchema={validate}
                        onSubmit={(values, { resetForm }) => {
                          // onSubmit(values, resetForm)
                        }}
                      >
                        {(formik) => (
                          <Form ref={ref}>
                            <table className="divide-y divide-slate-500 w-full overflow-x-auto ">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    className="py-3.5 pl-3 pr-4 text-left text-sm font-bold uppercase text-slate-700 sm:pr-6 md:pr-0 max-w-[100px] w-[49px]"
                                  >
                                    SNo
                                  </th>
                                  <th
                                    scope="col"
                                    colSpan={3}
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-bold uppercase text-slate-700 sm:pl-6 md:pl-0"
                                  >
                                    Description
                                  </th>

                                  <th
                                    scope="col"
                                    className="py-3.5 pl-3 pr-4 text-right text-sm font-bold uppercase text-slate-700 sm:pr-6 md:pr-0"
                                  >
                                    Amount
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {costSheetA?.map((d1, inx) => (
                                  <tr
                                    className="border-b border-slate-200"
                                    key={inx}
                                  >
                                    <td
                                      className="py-4 pl-3 pr-4 text-sm text-center text-slate-500 sm:pr-6 md:pr-0 max-w-[14px]"
                                      colSpan={1}
                                    >
                                      {inx + 1}
                                      {')'}
                                    </td>
                                    <td
                                      className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0"
                                      colSpan={3}
                                    >
                                      <div className="font-medium text-slate-700">
                                        {d1?.component?.label}{' '}
                                      </div>
                                      <div className="mt-0.5 text-slate-500 sm:hidden">
                                        1 unit at $0.00
                                      </div>
                                    </td>

                                    <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                      {d1?.component?.value ===
                                      'unit_cost_charges' ? (
                                        <>
                                          <div className="flex flex-row align-right text-right justify-end">
                                            {
                                              selUnitDetails?.super_built_up_area
                                            }{' '}
                                            *
                                            <TextFieldFlat
                                              label=""
                                              className
                                              name="ratePerSqft"
                                              onChange={(e) => {
                                                // setNewSqftPrice(e.target.value)
                                                console.log(
                                                  'changed value is',
                                                  e.target.value
                                                )
                                                formik.setFieldValue(
                                                  'unit_cost_charges',
                                                  selUnitDetails?.super_built_up_area *
                                                    e.target.value
                                                )
                                                // console.log(
                                                //   'what is =it',
                                                //   value.value
                                                // )
                                                // formik.setFieldValue(
                                                //   `${d1?.component?.value}`,
                                                //   value
                                                // )
                                              }}
                                              value={
                                                formik.values[
                                                  `unit_cost_charges`
                                                ] /
                                                selUnitDetails?.super_built_up_area
                                              }
                                              // value={newSqftPrice}
                                              type="number"
                                            />
                                            <TextFieldFlat
                                              className="hidden"
                                              label=""
                                              name={d1?.component?.value}
                                              // onChange={(value) => {
                                              //   console.log('what is =it', value.value)
                                              //   formik.setFieldValue(
                                              //     `${d1?.component?.value}`,
                                              //     value
                                              //   )
                                              // }}
                                              // value={
                                              //   formik.values[`${d1?.component?.value}`]
                                              // }
                                              // value={d1?.charges}
                                              type="number"
                                            />
                                            {'='}
                                            {
                                              formik.values[
                                                `${d1?.component?.value}`
                                              ]
                                            }
                                          </div>
                                        </>
                                      ) : (
                                        <TextFieldFlat
                                          label=""
                                          name={d1?.component?.value}
                                          // onChange={(value) => {
                                          //   console.log('what is =it', value.value)
                                          //   formik.setFieldValue(
                                          //     `${d1?.component?.value}`,
                                          //     value
                                          //   )
                                          // }}
                                          // value={
                                          //   formik.values[`${d1?.component?.value}`]
                                          // }
                                          // value={d1?.charges}
                                          type="number"
                                        />
                                      )}

                                      {/* <TextField
                                      label="Floor*"
                                      name={d1?.component?.value}
                                      // type="number"
                                    /> */}
                                    </td>
                                  </tr>
                                ))}
                                {/* {apartUnitChargesMock.map((dat, i) => (
                                <tr
                                  className="border-b border-slate-200"
                                  key={i}
                                >
                                  <td
                                    className="py-4 pl-3 pr-4 text-sm text-center text-slate-500 sm:pr-6 md:pr-0 max-w-[14px]"
                                    colSpan={1}
                                  >
                                    {i + 1}
                                    {')'}
                                  </td>
                                  <td
                                    className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0"
                                    colSpan={3}
                                  >
                                    <div className="font-medium text-slate-700">
                                      {dat?.category}
                                    </div>
                                    <div className="mt-0.5 text-slate-500 sm:hidden">
                                      1 unit at $0.00
                                    </div>
                                  </td>

                                  <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                    <TextFieldFlat
                                      label=""
                                      name={dat?.name}
                                      type="number"
                                    />
                                  </td>
                                </tr>
                              ))} */}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <th
                                    scope="row"
                                    colSpan={3}
                                    className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0"
                                  >
                                    {'     '} {'Total'}
                                  </th>
                                  <th
                                    scope="row"
                                    className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500"
                                  ></th>
                                  <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                    ₹{' '}
                                    {costSheetA.reduce(
                                      (partialSum, obj) =>
                                        partialSum +
                                        Number(
                                          formik.values[
                                            `${obj['component'].value}`
                                          ]
                                        ),
                                      0
                                    )}
                                    {/* {costSheetA.reduce(function (acc, obj) {
                                    return acc + obj.x
                                  }, 0)} */}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                            <div className="flex flex-col mt-2 p-4 ">
                              <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                                <button
                                  onClick={() => dialogOpen(false)}
                                  type="button"
                                  className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                                >
                                  {' '}
                                  Send to WhatsApp{' '}
                                </button>
                                {/* <Pdf targetRef={ref} filename="post.pdf">
                              {({ toPdf }) => (
                                <button
                                  onClick={toPdf}
                                  type="button"
                                  className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                                >
                                  {' '}
                                  Download{' '}
                                </button>
                              )}
                            </Pdf> */}
                                <button
                                  onClick={() => downloadPdf()}
                                  type="button"
                                  className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                                >
                                  {' '}
                                  Download{' '}
                                </button>

                                <button
                                  className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-sm hover:shadow-lg hover:bg-green-500"
                                  type="button"
                                  disabled={loading}
                                  // onClick={() => submitFormFun(formik)}
                                >
                                  {/* {loading && <Loader />} */}
                                  Save
                                </button>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              )}
              {['customerDetails', 'allsheets'].includes(onStep) && (
                <AddBookingForm
                  title="Booking Form"
                  leadDetailsObj={leadDetailsObj}
                />
              )}
              {['booksheet', 'allsheets'].includes(onStep) && (
                <AddPaymentDetailsForm
                  title={'undefined'}
                  dialogOpen={undefined}
                  phase={undefined}
                />
              )}
              {['blocksheet'].includes(onStep) && (
                <BlockingUnitForm title="Blocking Form" />
              )}
              {['Detail View'].includes(onStep) && <UnitTransactionForm />}
              <div className="mt-8 p-4">
                {/* <div>
            <div className="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">Full Name</div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1 mx-2 svelte-1l8159u">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="First Name" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"> </div>
                </div>
                <div className="w-full flex-1 mx-2 svelte-1l8159u">
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="Last Name" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"> </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"> Username</div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="Just a hint.." className="p-1 px-2 appearance-none outline-none w-full text-gray-800"> </div>
                </div>
                <div className="w-full mx-2 flex-1 svelte-1l8159u">
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase"> Your Email</div>
                    <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                        <input placeholder="jhon@doe.com" className="p-1 px-2 appearance-none outline-none w-full text-gray-800"> </div>
                </div>
            </div>
        </div> */}
                <div className="flex p-2 mt-4">
                  <button
                    className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
        hover:bg-gray-200
        bg-gray-100
        text-gray-700
        border duration-200 ease-in-out
        border-gray-600 transition"
                  >
                    Previous
                  </button>
                  <div className="flex-auto flex flex-row-reverse">
                    <button
                      className="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
        hover:bg-teal-600
        bg-teal-600
        text-teal-100
        border duration-200 ease-in-out
        border-teal-600 transition"
                    >
                      Next
                    </button>
                    <button
                      className="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
        hover:bg-teal-200
        bg-teal-100
        text-teal-700
        border duration-200 ease-in-out
        border-teal-600 transition"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-48 p-9">
                <div className="border-t pt-9 border-slate-200">
                  <div className="text-sm font-light text-slate-700">
                    <p>
                      {selMode} Payment terms are 14 days. Please be aware that
                      according to the Late Payment of Unwrapped Debts Act 0000,
                      freelancers are entitled to claim a 00.00 late fee upon
                      non-payment of debts after this time, at which point a new
                      invoice will be submitted with the addition of this fee.
                      If payment of the revised invoice is not received within a
                      further 14 days, additional interest will be charged to
                      the overdue account and a statutory rate of 8% plus Bank
                      of England base of 0.5%, totalling 8.5%. Parties cannot
                      contract out of the Act’s provisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default CostBreakUpSheet
