/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dialog } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Label, InputField, TextAreaField, FieldError } from '@redwoodjs/forms'
import Select from 'react-select'
import { Form, Formik, Field } from 'formik'
import { useSnackbar } from 'notistack'
import * as Yup from 'yup'
import NumberFormat from 'react-number-format'

import { TextField } from 'src/util/formFields/TextField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import Loader from './Loader/Loader'
import { PhoneNoField } from 'src/util/formFields/phNoField'
import {
  addCustomer,
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
import { TextField2 } from 'src/util/formFields/TextField2'

const AddBookingForm = ({ title, dialogOpen }) => {
  const { user } = useAuth()
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
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
  const { enqueueSnackbar } = useSnackbar()
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

  const initialState = {
    customerName1: '',
    customerName2: '',
    co_Name1: '',
    co_Name2: '',
    panNo1: '',
    panDocUrl1: '',
    panNo2: '',
    panDocUrl2: '',
    aadharNo1: '',
    aadharUrl2: '',
    aadharNo2: '',
    aadharUrl1: '',
    occupation1: '',
    companyName1: '',

    occupation2: '',
    companyName2: '',
    phoneNo1: '',
    email1: '',
    phoneNo2: '',
    email2: '',

    aggrementAddress: '',
  }

  const validateSchema = Yup.object({
    customerName1: Yup.string().required('Customer Name Required'),
    co_Name1: Yup.string().required('Customer Name Required'),
    panNo1: Yup.string().required('Pan No Required'),
    panDocUrl1: Yup.string().required('Pan Doc Required'),
    aadharNo1: Yup.string().required('Aadhar No Required'),
    aadharUrl1: Yup.string().required('Aadhar Doc Required'),
    occupation1: Yup.string().required('occupation Required'),
    phoneNo1: Yup.string().required('PhoneNo Required'),

    email1: Yup.string().required('Email Required'),
    aggrementAddress: Yup.string().required('Address Required'),
  })

  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }

  const onSubmit = async (data, resetForm) => {
    const updatedData = {
      ...data,
    }

    setLoading(true)
    addCustomer(
      updatedData,
      'nithe.nithesh@gmail.com',
      enqueueSnackbar,
      resetForm
    )
    setLoading(false)
  }
  return (
    <>
      <section className=" py-1 bg-blueGray-50">
        <div className="w-full  mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6 ml-4 ">
              <div className="text-center flex justify-between">
                <p className="text-md font-extrabold tracking-tight uppercase font-body">
                  Customer Details Form
                </p>
              </div>
            </div>
            <div className="bg-[#F1F5F9] ">
              <div className="flex-auto px-4 lg:px-3 py-10  ml-4 pt-4">
                <Formik
                  initialValues={initialState}
                  validationSchema={validateSchema}
                  onSubmit={(values, { resetForm }) => {
                    onSubmit(values, resetForm)
                  }}
                >
                  {(formik) => (
                    <Form>
                      <h6 className="text-blueGray-400 text-sm mt-3 px-4 mb-6 font-bold uppercase">
                        User Information
                      </h6>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <TextField2
                              label="Customer Name*"
                              name="customerName1"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <TextField2
                              label="Secondary Customer Name*"
                              name="customerName2"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <TextField2
                              label="S/O/D/O/W/O*"
                              name="co_Name1"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <TextField2
                              label="S/O/D/O/W/O"
                              name="co_Name2"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-[46%] mb-3 inline-block">
                            <TextField2
                              label="Marital Status*"
                              name="maritialStatus1"
                              type="text"
                            />
                          </div>
                          <div className="relative w-[50%] mb-3 ml-4 inline-block">
                            <TextField2
                              label="Nationality*"
                              name="nationality1"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-[46%] mb-3 inline-block">
                            <TextField2
                              label="Marital Status"
                              name="maritialStatus2"
                              type="text"
                            />
                          </div>
                          <div className="relative w-[50%] mb-3 ml-4 inline-block">
                            <TextField2
                              label="Nationality"
                              name="nationality2"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-[46%] mb-3 inline-block">
                            <TextField2
                              label="Pan No*"
                              name="panNo1"
                              type="text"
                            />
                          </div>
                          <div className="relative w-[50%] mb-3 ml-4 inline-block">
                            <TextField2
                              label="Upload Pan Doc*"
                              name="panDocUrl1"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-[46%] mb-3 inline-block">
                            <TextField2
                              label="Pan No"
                              name="panNo2"
                              type="text"
                            />
                          </div>
                          <div className="relative w-[50%] mb-3 ml-4 inline-block">
                            <TextField2
                              label="Upload Pan Doc"
                              name="panDocUrl2"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-[46%] mb-3 inline-block">
                            <TextField2
                              label="Aadhar No*"
                              name="aadharNo1"
                              type="text"
                            />
                          </div>
                          <div className="relative w-[50%] mb-3 ml-4 inline-block">
                            <TextField2
                              label="Aadhar Doc*"
                              name="aadharUrl1"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-[46%] mb-3 inline-block">
                            <TextField2
                              label="Aadhar No"
                              name="aadharNo2"
                              type="text"
                            />
                          </div>
                          <div className="relative w-[50%] mb-3 ml-4 inline-block">
                            <TextField2
                              label="Aadhar Doc"
                              name="aadharUrl2"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-[46%] mb-3 inline-block">
                            <TextField2
                              label="Occupation*"
                              name="occupation1"
                              type="text"
                            />
                          </div>
                          <div className="relative w-[50%] mb-3 ml-4 inline-block">
                            <TextField2
                              label="Company Name*"
                              name="companyName1"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-[46%] mb-3 inline-block">
                            <TextField2
                              label="Occupation"
                              name="occupation2"
                              type="text"
                            />
                          </div>
                          <div className="relative w-[50%] mb-3 ml-4 inline-block">
                            <TextField2
                              label="Company Name"
                              name="companyName2"
                              type="text"
                            />
                          </div>
                        </div>

                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-[46%] mb-3 inline-block">
                            <TextField2
                              label="Phone No*"
                              name="phoneNo1"
                              type="text"
                            />
                          </div>
                          <div className="relative w-[50%] mb-3 ml-4 inline-block">
                            <TextField2
                              label="Email*"
                              name="email1"
                              type="text"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-[46%] mb-3 inline-block">
                            <TextField2
                              label="Phone No"
                              name="phoneNo2"
                              type="text"
                            />
                          </div>
                          <div className="relative w-[50%] mb-3 ml-4 inline-block">
                            <TextField2
                              label="Email"
                              name="email2"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>

                      <hr className="mt-6 border-b-1 border-blueGray-300" />

                      <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                        Agreement Details
                      </h6>
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-12/12 px-4">
                          <div className="relative w-full mb-3">
                            <TextField2
                              label="Address"
                              name="aggrementAddress"
                              type="text"
                            />
                          </div>
                        </div>
                      </div>

                      <hr className="mt-6 border-b-1 border-blueGray-300" />

                      <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                        <button
                          // onClick={()}
                          type="button"
                          className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-xs hover:shadow-lg hover:bg-gray-100"
                        >
                          {' '}
                          Cancel{' '}
                        </button>
                        <button
                          className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-xs hover:shadow-lg hover:bg-green-500"
                          type="submit"
                          disabled={loading}
                        >
                          {/* {loading && <Loader />} */}
                          {'Save'}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* old form  */}
    </>
  )
}

export default AddBookingForm
