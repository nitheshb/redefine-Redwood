/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
// import { RadioGroup } from '@headlessui/react'
import {
  Form,
  Label,
  InputField,
  // TextAreaField,
  // TextField,
  // EmailField,
  // PasswordField,
  SelectField,
  FieldError,
  // Submit,
} from '@redwoodjs/forms'
import { createUser } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { useForm } from 'react-hook-form'

// import Select from 'react-select'
// import SelectSearch from 'react-select-search'

const SUserSignupBody = ({ title, dialogOpen }) => {
  const { register } = useAuth()
  const formMethods = useForm()
  const [formMessage, setFormMessage] = useState({
    color: 'green',
    message: '',
  })
  const roles = [
    { label: 'Select the role', value: '' },
    { label: 'Sales manager', value: 'sales-manager' },
    { label: 'Sales executive', value: 'sales-executive' },
    { label: 'Legal manager', value: 'legal-manager' },
    { label: 'Legal executive', value: 'legal-executive' },
    { label: 'CRM manager', value: 'crm-manager' },
    { label: 'CRM executive', value: 'crm-executive' },
    { label: 'HR manager', value: 'hr-manager' },
    { label: 'Support manager', value: 'support-manager' },
    { label: 'Support executive', value: 'support-executive' },
    { label: 'Helper manager', value: 'helper-manager' },
    { label: 'Helper executive', value: 'helper-executive' },
    { label: 'Admin', value: 'admin' },
  ]

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
  const onSubmit = async (data) => {
    try {
      const response: any = await register(data.email, 'redefine@123')
      if (response?.user?.uid) {
        const user = response?.user
        await createUser({
          data,
          uid: user.uid,
          roles: [data.roles],
        })
        formMethods.reset()
        setFormMessage({
          color: 'green',
          message: `Email ${data.email} is created Successfully`,
        })
      }
    } catch (e) {
      console.log(e)
      setFormMessage({
        color: 'red',
        message: e.message,
      })
    }
  }
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
      <div className="grid gap-8 grid-cols-1 mx-10">
        <div className="flex flex-col ">
          {/* <div className="flex flex-col sm:flex-row items-center">
            <h2 className="font-semibold text-lg mr-auto">Project Details</h2>
            <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
          </div> */}

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

                {/* <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
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
                </div> */}
                <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">
                      Dept<abbr title="required">*</abbr>
                    </label>
                    <SelectField
                      name="department"
                      className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                      placeholder="Select Dept"
                    />

                    <p className="text-sm text-red-500 hidden mt-3" id="error">
                      Please fill out this field.
                    </p>
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
                {/* <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
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
                </div> */}

                {/* <div className="">
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
                </div> */}

                {/* <div className="flex-auto w-full mb-1 text-xs space-y-2">
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
                </div> */}
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
      </div>
    </div>
  )
}

export default SUserSignupBody
