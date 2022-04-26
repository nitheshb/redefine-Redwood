/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dialog } from '@headlessui/react'
import { useState, useEffect } from 'react'
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

const AddLeadForm = ({ title, dialogOpen }) => {
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
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [devType, setdevType] = useState(devTypeA[0])
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

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
        `Thank you ${name} for choosing the world class ${project || 'project'}`
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
  const validate = Yup.object({
    name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    // lastName: Yup.string()
    //   .max(20, 'Must be 20 characters or less')
    //   .required('Required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    // password: Yup.string()
    //   .min(6, 'Password must be at least 6 charaters')
    //   .required('Password is required'),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref('password'), null], 'Password must match')
    //   .required('Confirm password is required'),
    // mobileNo
    mobileNo: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),

    // deptVal: Yup.string()
    //   // .oneOf(['Admin', 'CRM'], 'Required Dept')
    //   .required('Req Dept'),
    // myRole: Yup.string()
    //   //  .oneOf(['Admin', 'CRM'], 'DEPT IS REQ')
    //   .required('Required Role'),
  })
  const resetter = () => {
    setFormMessage('')
  }
  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10 flex items-center justify-between">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title>

        {formMessage === 'Saved Successfully..!' && (
          <p className=" flex text-md text-slate-800 text-right my-3">
            <img
              className="w-[40px] h-[40px] inline mr-2"
              alt=""
              src="/ok.gif"
            />
            <span className="mt-2">{formMessage}</span>
          </p>
        )}
        {formMessage === 'User Already Exists with Ph No' && (
          <p className=" flex text-md text-pink-800 text-right my-3">
            <img
              className="w-[40px] h-[40px] inline mr-2"
              alt=""
              src="/ok.gif"
            />
            <span className="mt-2">{formMessage}</span>
          </p>
        )}
      </div>

      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col  my-10 rounded-lg bg-white border border-gray-100 px-4 m-4 mt-4">
          <div className="mt-0">
            {/* new one */}

            <Formik
              initialValues={{
                name: '',
                cDate: '',
                mobileNo: '',
                email: '',
                source: '',
                project: '',
                assignTo: '',
                budget: '',
                deptVal: '',
                myRole: '',
              }}
              validationSchema={validate}
              onSubmit={(values, { resetForm }) => {
                console.log('ami submitted', values)
                onSubmitFun(values, resetForm)
              }}
            >
              {(formik) => (
                <div className="mt-8">
                  <Form>
                    <div className="mb-4 ">
                      <div className="inline">
                        <div className="">
                          <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                            Client Details<abbr title="required"></abbr>
                          </label>
                        </div>

                        <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>
                      </div>
                    </div>
                    <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2">
                      {/* <div className="mb-3 space-y-2 w-full text-xs">

                        <TextField
                          label="Contact Date"
                          name="cDate"
                          type="text"
                        />
                      </div> */}

                      <div className="mb-3 space-y-2 w-full text-xs">
                        <TextField
                          label="Customer Name"
                          name="name"
                          type="text"
                        />
                      </div>
                    </div>
                    {/* 2 */}
                    <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-">
                      <div className="mb-3 space-y-2 w-full text-xs">
                        {/* <TextField
                          label="Mobile No*"
                          name="mobileNo"
                          type="text"
                        /> */}
                        {/* <NumberFormat
                          // label="Mobile No*"
                          className=" w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-4 mt-1"
                          name="mobileNo"
                          value={formik.values.mobileNo}
                          onValueChange={(value) => {
                            formik.setFieldValue('mobileNo', value.value)
                          }}
                          format="+91 ###-###-####"
                          mask=""
                        /> */}
                        <PhoneNoField
                          name="mobileNo"
                          label="Mobile No*"
                          className="input"
                          onChange={(value) => {
                            formik.setFieldValue('mobileNo', value.value)
                          }}
                          value={formik.values.mobileNo}
                          options={deptList}
                        />
                      </div>
                      <div className="mb-3 space-y-2 w-full text-xs">
                        <TextField label="Email*" name="email" type="text" />
                      </div>
                    </div>
                    <div className="mt-8">
                      <label className="font-semibold text-[#053219]  text-sm  mb-1  ">
                        More Details<abbr title="required">*</abbr>
                      </label>
                    </div>
                    <div className="border-t-4 rounded-xl w-16 mt-1  border-green-600"></div>

                    {/* </div>
                      <div className="rounded-lg bg-white border border-gray-100 p-4 mt-4"> */}
                    {/* 3 */}
                    <div className="md:flex md:flex-row md:space-x-4 w-full text-xs ">
                      <div className="w-full flex flex-col mb-3 mt-2">
                        <CustomSelect
                          name="source"
                          label="Lead Source*"
                          className="input mt-3"
                          onChange={(value) => {
                            formik.setFieldValue('source', value.value)
                          }}
                          value={formik.values.source}
                          options={deptList}
                        />
                      </div>

                      <div className="w-full flex flex-col mb-3 mt-2">
                        <CustomSelect
                          name="project"
                          label="Select Project"
                          className="input mt-3"
                          onChange={(value) => {
                            formik.setFieldValue('project', value.value)
                          }}
                          value={formik.values.project}
                          // options={aquaticCreatures}
                          options={projectList}
                        />
                      </div>
                    </div>
                    {/* 4 */}
                    <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                      <div className="w-full flex flex-col mb-3">
                        <CustomSelect
                          name="assignedTo"
                          label="Assign To"
                          className="input mt-"
                          onChange={(value) => {
                            formik.setFieldValue('assignedTo', value.value)
                            formik.setFieldValue('assignedToObj', value)
                          }}
                          value={formik.values.assignedTo}
                          options={usersList}
                        />

                        <p
                          className="text-sm text-red-500 hidden mt-3"
                          id="error"
                        >
                          Please fill out this field.
                        </p>
                      </div>
                    </div>

                    {/* 6 */}
                    <div className=" mt-8 ">
                      <label className="font-semibold text-[#053219]  text-sm  mb-1 ">
                        Advanced<abbr title="required"></abbr>
                      </label>
                    </div>
                    <div className="border-t-4 rounded-xl w-16 mt-1 border-green-600"></div>

                    <div className="">
                      <div className=" flex flex-col  mt-4  px-1 py-1 ">
                        <label className="font- text-[#053219]  text-sm mb-2">
                          Type<abbr title="required"></abbr>
                        </label>
                        <RadioGroup value={selected} onChange={typeSel}>
                          <div className="grid grid-cols-4 gap-4">
                            {plans.map((plan) => (
                              <RadioGroup.Option
                                key={plan.name}
                                value={plan}
                                className={({ active, checked }) =>
                                  `${
                                    active
                                      ? 'ring-2 ring-offset-2  ring-white ring-opacity-60 col-span-2'
                                      : ''
                                  }
                ${
                  selected.name == plan.name
                    ? 'ring-1  ring-green-400 bg-opacity-75 text-black'
                    : 'bg-[#f7f9f8]'
                }
                  relative rounded-lg px-5 py-2 cursor-pointer flex focus:outline-none col-span-2`
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <div className=" col-span-2 flex justify-center contents">
                                      <div className="flex items-center">
                                        <div className="text-sm">
                                          <RadioGroup.Label
                                            as="p"
                                            className={`font-medium  ${
                                              selected.name == plan.name
                                                ? 'text-gray-900'
                                                : 'text-gray-900'
                                            }`}
                                          >
                                            <img
                                              className="w-8 h-8 inline"
                                              alt=""
                                              src={plan.img}
                                            ></img>{' '}
                                          </RadioGroup.Label>
                                        </div>
                                      </div>
                                      <div className="mt-3 ml-1 mr-2 inline text-sm text-b ">
                                        {plan.name}
                                      </div>
                                      {true && (
                                        <div
                                          className={`${
                                            selected.name == plan.name
                                              ? 'flex-shrink-0 text-white ml-auto'
                                              : 'flex-shrink-0 text-black ml-auto'
                                          } mt-2`}
                                        >
                                          <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            className="w-5 h-5"
                                          >
                                            <circle
                                              cx={11}
                                              cy={11}
                                              r={11}
                                              fill={
                                                selected.name == plan.name
                                                  ? '#61d38a'
                                                  : ''
                                              }
                                            />
                                            <path
                                              d="M6 11l3 3 7-7"
                                              stroke={
                                                selected.name == plan.name
                                                  ? '#fff'
                                                  : ''
                                              }
                                              strokeWidth={1.5}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="md:flex md:flex-row md:space-x-4 w-full text-xs mt-3 mx-2">
                        <div className="w-full flex flex-col mb-3">
                          <CustomSelect
                            name="budget"
                            label="Budget"
                            className="input mt-3"
                            onChange={(value) => {
                              formik.setFieldValue('budget', value.value)
                            }}
                            value={formik.values.budget}
                            options={budgetList}
                          />
                          <p
                            className="text-sm text-red-500 hidden mt-3"
                            id="error"
                          >
                            Please fill out this field.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-8">
                      <p className="text-xs text-red-400 text-right my-3">
                        Mobile No / Email is required{' '}
                        <abbr title="Required field">*</abbr>
                      </p>
                      <div className="mt-5 mt-8 text-right md:space-x-3 md:block flex flex-col-reverse">
                        <button
                          className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                          type="reset"
                          onClick={() => resetter()}
                        >
                          Reset
                        </button>
                        <button
                          className="mb-2 md:mb-0 bg-green-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white  rounded-sm hover:shadow-lg hover:bg-green-500"
                          type="submit"
                          disabled={loading}
                        >
                          {loading && <Loader />}
                          Add Lead
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddLeadForm
