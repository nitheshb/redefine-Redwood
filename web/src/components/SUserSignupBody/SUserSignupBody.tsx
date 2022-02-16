/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import {
  Form,
  Label,
  InputField,
  TextAreaField,
  TextField,
  EmailField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import Select from 'react-select'

import SelectSearch from 'react-select-search'

const SUserSignupBody = ({ title, dialogOpen }) => {
  const aquaticCreatures = [
    { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
    { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
    { label: 'Karnataka', value: 'Karnataka' },
  ]

  const cityList = [
    { label: 'Bangalore,KA', value: 'Bangalore,KA' },
    { label: 'Cochin,KL', value: 'Cochin,KL' },
    { label: 'Mumbai,MH', value: 'Mumbai,MH' },
  ]

  const plans = []
  const [selected, setSelected] = useState(plans[1])

  const typeSel = async (sel) => {
    await console.log('value is', selected)
    await setSelected(sel)
    await console.log('thsi si sel type', sel, selected)
  }
  const onSubmit = async (data) => {
    console.log(data)

    navigate('/new-home-page')

    // const { Email, Password } = data
    // // login(Email, Password)
    // login(Email, Password,)
    // register(Email, Password)
  }
  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6">
        <Dialog.Title className=" font-semibold text-lg mr-auto ml-3">
          {title}
        </Dialog.Title>
      </div>

      <div className="grid  gap-8 grid-cols-1 m-10">
        <div className="flex flex-col ">
          {/* <div className="flex flex-col sm:flex-row items-center">
            <h2 className="font-semibold text-lg mr-auto">Project Details</h2>
            <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
          </div> */}

          <div className="mt-0">
            <Form onSubmit={onSubmit} className="mt-8">
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
                      required
                      placeholder="User Name"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      errorClassName="input error"
                      validation={{ required: true }}
                    />
                    <FieldError
                      name="name"
                      className="error-message text-red-700 text-xs"
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
                      required
                      placeholder="Email Id"
                      className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                      errorClassName="input error"
                      validation={{ required: true }}
                    />
                    <FieldError
                      name="email"
                      className="error-message text-red-700 text-xs"
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
                <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">
                      Dept<abbr title="required">*</abbr>
                    </label>
                    <Select
                      //  className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "

                      placeholder="Select Dept"
                      options={aquaticCreatures}
                    />

                    <p className="text-sm text-red-500 hidden mt-3" id="error">
                      Please fill out this field.
                    </p>
                  </div>
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">
                      Role<abbr title="required">*</abbr>
                    </label>
                    <Select
                      //  className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "

                      placeholder="Select Role"
                      options={aquaticCreatures}
                    />

                    <p className="text-sm text-red-500 hidden mt-3" id="error">
                      Please fill out this field.
                    </p>
                  </div>
                </div>
                <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                  <div className="w-full flex flex-col mb-3">
                    <label className="font-semibold text-gray-600 py-2">
                      Reporting<abbr title="required">*</abbr>
                    </label>
                    <Select
                      //  className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "

                      placeholder="Reporting To"
                      options={cityList}
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

                  {/* <p className="text-xs text-gray-400 text-left my-3">
                    You inserted 0 characters
                  </p> */}
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
      </div>
    </div>
  )
}

export default SUserSignupBody
