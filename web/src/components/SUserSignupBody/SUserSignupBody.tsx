/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import * as Yup from 'yup'
// import { RadioGroup } from '@headlessui/react'
import {
  addLead,
  addUserLog,
  createUser,
  updateUserRole,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import { Form, Formik } from 'formik'
import { TextField } from 'src/util/formFields/TextField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import axios from 'axios'
import { constants } from 'os'
import { env } from 'process'
import Loader from '../Loader/Loader'

// import Select from 'react-select'
// import SelectSearch from 'react-select-search'

const SUserSignupBody = ({ title, dialogOpen, empData }) => {
  const { register } = useAuth()
  const formMethods = useForm()
  const [formMessage, setFormMessage] = useState({
    color: 'green',
    message: '',
  })
  const [roles, setroles] = useState([])
  const [editMode, seteditMode] = useState(false)
  const [deptIs, setdeptIs] = useState('')
  const [isdeptEmpty, setisdeptEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const { name, email, department, uid } = empData
  console.log('empData is ', empData)
  const deptList = [
    { label: 'Select the Dept', value: '' },
    { label: 'Admin', value: 'admin' },
    { label: 'CRM', value: 'crm' },
    { label: 'Extra', value: 'extra' },
    { label: 'Helper', value: 'helper' },
    { label: 'HR', value: 'hr' },
    { label: 'Legal', value: 'legal' },
    { label: 'project', value: 'project' },
    { label: 'Support', value: 'support' },
    { label: 'Sales', value: 'sales' },
  ]
  const rolesList = [
    { label: 'Select the role', value: '' },
    { label: 'Sales manager', value: 'sales-manager', dept: 'sales' },
    { label: 'Sales executive', value: 'sales-executive', dept: 'sales' },
    { label: 'Legal manager', value: 'legal-manager', dept: 'legal' },
    { label: 'Legal executive', value: 'legal-executive', dept: 'legal' },
    { label: 'CRM manager', value: 'crm-manager', dept: 'crm' },
    { label: 'CRM executive', value: 'crm-executive', dept: 'crm' },
    { label: 'HR manager', value: 'hr-manager', dept: 'hr' },
    { label: 'HR Executive', value: 'hr-executive', dept: 'hr' },
    { label: 'Support manager', value: 'support-manager', dept: 'support' },
    { label: 'Support executive', value: 'support-executive', dept: 'support' },
    { label: 'Helper manager', value: 'helper-manager', dept: 'helper' },
    { label: 'Helper executive', value: 'helper-executive', dept: 'helper' },
    { label: 'Admin', value: 'admin', dept: 'admin' },
    { label: 'project head', value: 'admin', dept: 'project' },
    { label: 'project manager', value: 'admin', dept: 'project' },
  ]

  useEffect(() => {
    if (name) {
      seteditMode(true)
    }
  }, [])

  // const cityList = [
  //   { label: 'Bangalore,KA', value: 'Bangalore,KA' },
  //   { label: 'Cochin,KL', value: 'Cochin,KL' },
  //   { label: 'Mumbai,MH', value: 'Mumbai,MH' },
  // ]

  // const plans = []
  // const [selected, setSelected] = useState(plans[1])

  // const typeSel = async (sel) => {
  //   await console.log('value is', selected)
  //   await setSelected(sel)
  //   await console.log('thsi si sel type', sel, selected)
  // }

  const changed = async (data) => {
    console.log('i was changed', data, data)

    setdeptIs(data.value)
    if (data.value != '') {
      setisdeptEmpty(false)
    }

    const filRoles = rolesList.filter((item) => item.dept === data.value)
    setroles(filRoles)
  }
  const onSubmit = async (data) => {
    console.log('check fo this ', data)
    setLoading(true)
    const { email, myRole, deptVal, name } = data

    if (editMode) {
      updateUserRole(
        uid,
        deptVal,
        myRole,
        email,
        'nitheshreddy.email@gmail.com'
      )
      setLoading(false)
      addUserLog({
        s: 's',
        type: 'updateRole',
        subtype: 'updateRole',
        txt: `${email} as ${myRole}`,
        by: 'nitheshreddy.email@gmail.com',
      })
      setFormMessage({
        color: 'green',
        message: `Role is updated Successfully`,
      })
    } else {
      const dataBoxy = JSON.stringify({
        email: email,
        name: name,
        password: 'redefine@123',
        dept: deptVal,
        role: myRole,
        orgName: 'spark',
      })

      const config = {
        method: 'post',
        url: 'https://redefine-functions.azurewebsites.net/api/Redefine_addUser?code=Ojuk8KF6kkxJMoOF4/XZf2kh8WHN5aMtOMlv0bbveJYZrCbRU1C9CA==',
        headers: {
          'Content-Type': 'text/plain',
        },
        data: dataBoxy,
      }

      axios(config)
        .then(function (response) {
          if (response.data) {
            setLoading(false)
            const { success, msg, payload } = response['data']

            if (success) {
              addUserLog({
                s: 's',
                type: 'addUser',
                subtype: 'addUser',
                txt: `${email} as ${myRole}`,
                by: 'nitheshreddy.email@gmail.com',
              })
            }
            formMethods.reset()
            setFormMessage({
              color: success ? 'green' : 'red',
              message: success
                ? `Email ${email} is added Successfully`
                : `${email} already in Use`,
            })
          }
        })
        .catch(function (error) {
          console.log('error is ', error)
          setLoading(false)
          setFormMessage({
            color: 'red',
            message: error.msg,
          })
        })
    }
  }

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
    deptVal: Yup.string()
      // .oneOf(['Admin', 'CRM'], 'Required Dept')
      .required('Req Dept'),
    myRole: Yup.string()
      //  .oneOf(['Admin', 'CRM'], 'DEPT IS REQ')
      .required('Required Role'),
  })
  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6">
        <Dialog.Title className=" font-semibold text-lg mr-auto ml-3">
          {title}
        </Dialog.Title>
      </div>
      {formMessage.message && (
        <p className={`text-lg text-${formMessage.color}-500 text-center my-3`}>
          {formMessage.message}
        </p>
      )}
      <div className="grid gap-8 grid-cols-1 mx-10 flex flex-col">
        <Formik
          initialValues={{
            name: name,
            email: email,
            deptVal: department,
            myRole: '',
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            console.log('ami submitted', values)
            onSubmit(values)
          }}
        >
          {(formik) => (
            <div className="mt-16">
              <Form>
                <TextField
                  label="User Name*"
                  name="name"
                  type="text"
                  disabled={editMode}
                />
                <TextField
                  label="Email Id*"
                  name="email"
                  type="email"
                  disabled={editMode}
                />
                <CustomSelect
                  name="deptName"
                  label="Department"
                  className="input mt-3"
                  onChange={(value) => {
                    changed(value)
                    formik.setFieldValue('deptVal', value.value)
                    formik.setFieldValue('myRole', '')
                  }}
                  value={formik.values.deptVal}
                  options={deptList}
                />
                {formik.errors.deptVal ? (
                  <div className="error-message text-red-700 text-xs p-2">
                    {formik.errors.deptVal}
                  </div>
                ) : null}
                <CustomSelect
                  name="roleName"
                  label="Role"
                  className="input mt-3"
                  onChange={(value) =>
                    formik.setFieldValue('myRole', value.value)
                  }
                  value={formik.values.myRole || ''}
                  options={roles}
                />
                {formik.errors.myRole ? (
                  <div className="error-message text-red-700 text-xs p-2">
                    {formik.errors.myRole}
                    {formik.values.myRole}
                  </div>
                ) : null}
                <p className="text-xs text-red-500 text-right my-3">
                  Required fields are marked with an asterisk{' '}
                  <abbr title="Required field">*</abbr>
                </p>
                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                  <button
                    className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-sm hover:shadow-lg hover:bg-gray-100"
                    type="reset"
                  >
                    Reset
                  </button>
                  <button
                    className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white  rounded-sm hover:shadow-lg hover:bg-green-500"
                    type="submit"
                    disabled={loading}
                  >
                    {loading && <Loader />}
                    Add Employee
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>

      {/* <div className="grid gap-8 grid-cols-1 mx-10">
        <div className="flex flex-col ">

          <div className="mt-0">
            <Form
              formMethods={formMethods}
              onSubmit={onSubmit}
              className="mt-8"
            >
              <div className="form">
                <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <Label
                      name="User Name* "
                      className="label font-regular text-sm"
                      errorClassName="label font-regular text-sm"
                    />
                    <InputField
                      name="name"
                      placeholder="User Name"
                      className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      validation={{ required: true }}
                    />
                    <FieldError
                      name="name"
                      className="error-message text-red-700 text-xs px-2"
                    />
                  </div>
                  <div className="mb-3 space-y-2 w-full text-xs">
                    <Label
                      name="Email Id*"
                      className="label font-regular text-sm"
                      errorClassName="label font-regular text-sm"
                    />
                    <InputField
                      name="email"
                      placeholder="Email Id"
                      className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      validation={{ required: true }}
                    />
                    <FieldError
                      name="email"
                      className="error-message text-red-700 text-xs px-2"
                    />
                  </div>
                </div>

                <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                  <div className="w-full flex flex-col mb-3">
                    <Label
                      name="Aadhar No*"
                      className="font-semibold text-gray-600 py-2"
                      errorClassName="label font-regular text-sm"
                    />
                    <InputField
                      name="aadharNo"
                      required
                      placeholder="16 digit aadhar No"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      errorClassName="input error"
                      validation={{ required: true }}
                    />
                    <FieldError
                      name="aadharNo"
                      className="error-message text-red-700 text-xs"
                    />
                  </div>
                  <div className="w-full flex flex-col mb-3">
                    <Label
                      name="Location*"
                      className="font-semibold text-gray-600 py-2"
                      errorClassName="label font-regular text-sm"
                    />
                    <InputField
                      name="location"
                      required
                      placeholder="Location"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      errorClassName="input error"
                      validation={{ required: true }}
                    />
                    <FieldError
                      name="location"
                      className="error-message text-red-700 text-xs"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col mb-3">
                  <label className="font-semibold text-gray-600 py-2">
                    State {isdeptEmpty}
                    <abbr title="required">*</abbr>
                  </label>
                  <Select
                    //  className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                    name="dept"
                    placeholder="Select Department"
                    onChange={changed}
                    options={dept}
                  />
                  <FieldError
                    name="dept"
                    className="error-message text-red-700 text-xs px-2"
                  />
                  <p
                    className={`text-sm text-red-500  mt-3 ${
                      !isdeptEmpty ? 'hidden' : ''
                    }`}
                    id="error"
                  >
                    Please fill out this field. {isdeptEmpty.toString()}
                  </p>
                </div>
                <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">
                      Dept<abbr title="required">*</abbr>
                    </label>
                    <SelectField
                      className=" "
                      name="dept"
                      validation={{ required: true }}
                      placeholder="Select Dept"
                      onChange={changed}
                    >
                      {dept.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </SelectField>
                    <FieldError
                      name="dept"
                      className="error-message text-red-700 text-xs px-2"
                    />
                  </div>
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">
                      Role<abbr title="required">*</abbr>
                    </label>
                    <SelectField
                      className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-2 md:w-full "
                      name="roles"
                      validation={{ required: true }}
                      placeholder="Select Role"
                    >
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </SelectField>
                    <FieldError
                      name="roles"
                      className="error-message text-red-700 text-xs px-2"
                    />
                  </div>
                </div>
                <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">
                      Reporting<abbr title="required">*</abbr>
                    </label>
                    <SelectField
                      //  className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                      name="reporting"
                      placeholder="Reporting To"
                    />

                    <p className="text-sm text-red-500 hidden mt-3" id="error">
                      Please fill out this field.
                    </p>
                  </div>
                </div>

                <div className="">
                  <div className="bg-white rounded mt-2 ">
                    <div className="">
                      <div className="flex items-center py-5">
                        <input
                          className="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100 bg-blue-600"
                          type="radio"
                        />
                        <label className="text-sm font-medium ml-4">
                          Pay Roll
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-4  pb-8 ">
                        <div className="col-span-2">
                          <label
                            className="text-xs font-semibold"
                            htmlFor="cardNumber"
                          >
                            Card number
                          </label>
                          <input
                            className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                            type="text"
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>
                        <div className="">
                          <label
                            className="text-xs font-semibold"
                            htmlFor="cardNumber"
                          >
                            Expiry Date
                          </label>
                          <input
                            className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                            type="text"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="">
                          <label
                            className="text-xs font-semibold"
                            htmlFor="cardNumber"
                          >
                            CVC/CVV
                          </label>
                          <input
                            className="flex items-center h-10 border mt-1 rounded px-4 w-full text-sm"
                            type="password"
                            placeholder="..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-auto w-full mb-1 text-xs space-y-2">
                  <Label
                    name="Description"
                    className="font-semibold text-gray-600 py-2"
                    errorClassName="label font-regular text-sm"
                  />
                  <TextAreaField
                    name="desc"
                    placeholder="Message"
                    className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                    // className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                    errorClassName="input error"
                  />
                  <FieldError
                    name="pincode"
                    className="error-message text-red-700 text-xs"
                  />

                  <p className="text-xs text-gray-400 text-left my-3">
                    You inserted 0 characters
                  </p>
                </div>
                <p className="text-xs text-red-500 text-right my-3">
                  Required fields are marked with an asterisk{' '}
                  <abbr title="Required field">*</abbr>
                </p>
                <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                  <span
                    onClick={() => dialogOpen(false)}
                    className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  >
                    {' '}
                    Cancel{' '}
                  </span>
                  <button className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">
                    Save
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default SUserSignupBody
