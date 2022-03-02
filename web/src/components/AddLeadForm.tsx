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
  FieldError,
} from '@redwoodjs/forms'
import Select from 'react-select'

const AddLeadForm = ({ title, dialogOpen }) => {
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

  const plans = [
    {
      name: 'Apartment',
      img: '/apart1.svg',
    },
    {
      name: 'Plots',
      img: './plot.svg',
    },
    {
      name: 'WeekendVillas',
      img: './weekend.svg',
    },
    {
      name: 'Villas',
      img: './villa.svg',
    },
  ]

  const devTypeA = [
    {
      name: 'Outrate',
      img: '/apart.svg',
    },
    {
      name: 'Joint',
      img: '/apart1.svg',
    },
  ]
  const [selected, setSelected] = useState(plans[0])
  const [devType, setdevType] = useState(devTypeA[0])

  const typeSel = async (sel) => {
    await console.log('value is', selected)
    await setSelected(sel)
    await console.log('thsi si sel type', sel, selected)
  }
  const devTypeSel = async (sel) => {
    await setdevType(sel)
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
      <div className="px-4 sm:px-6  z-10">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title>
      </div>

      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col  my-10 rounded-lg bg-white border border-gray-100 px-4 m-4 mt-12">
          <div className="mt-0">
            <Form onSubmit={onSubmit} className="mt-8">
              <div className="form">
                <div className="flex flex-col  mt-2  ">
                  <label className="font-md text-[#053219] py-2 text-sm mb-2 mt-0">
                    Client Details<abbr title="required">*</abbr>
                  </label>

                  <div className="border-t  mb-3"></div>
                  <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2">
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <Label
                        name="Contact Date"
                        className="label font-regular text-xs  "
                        errorClassName="label font-regular text-sm"
                      />
                      <InputField
                        name="28/02/2022"
                        required
                        placeholder="Contact Date"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-lg h-10 px-4"
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
                        name="Client Name"
                        className="label font-regular text-xs"
                        errorClassName="label font-regular text-sm"
                      />
                      <InputField
                        name="clientName"
                        required
                        placeholder="Client Name"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-lg h-10 px-4"
                        errorClassName="input error"
                        validation={{ required: true }}
                      />
                      <FieldError
                        name="builderName"
                        className="error-message text-red-700 text-xs"
                      />
                    </div>
                  </div>
                  <div className="md:flex flex-row md:space-x-4 w-full text-xs mt-2">
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <Label
                        name="Mobile No*"
                        className="label font-regular text-xs"
                        errorClassName="label font-regular text-sm"
                      />
                      <InputField
                        name="mobileNo"
                        required
                        placeholder="Mobile No"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-lg h-10 px-4"
                        errorClassName="input error"
                        validation={{ required: true }}
                      />
                      <FieldError
                        name="mobileNo"
                        className="error-message text-red-700 text-xs"
                      />
                    </div>
                    <div className="mb-3 space-y-2 w-full text-xs">
                      <Label
                        name="Email"
                        className="label font-regular text-xs  "
                        errorClassName="label font-regular text-sm"
                      />
                      <InputField
                        name="name"
                        required
                        placeholder="Email"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-lg h-10 px-4"
                        errorClassName="input error"
                        validation={{ required: true }}
                      />
                      <FieldError
                        name="name"
                        className="error-message text-red-700 text-xs"
                      />
                    </div>
                  </div>
                  <label className="font-md text-[#053219] py-2 text-sm mb-1  mt-2">
                    More Details<abbr title="required">*</abbr>
                  </label>
                  {/* </div>
                <div className="rounded-lg bg-white border border-gray-100 p-4 mt-4"> */}
                  <div className="md:flex md:flex-row md:space-x-4 w-full text-xs border-t ">
                    <div className="w-full flex flex-col mb-3 mt-2">
                      <Label
                        name="Lead Source*"
                        className="font-semibold text-gray-600 py-2"
                        errorClassName="label font-regular text-sm"
                      />
                      <InputField
                        name="Source"
                        required
                        placeholder="Source"
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                        errorClassName="input error"
                        validation={{ required: true }}
                      />
                      <FieldError
                        name="pincode"
                        className="error-message text-red-700 text-xs"
                      />
                    </div>
                    <div className="w-full flex flex-col mb-3 mt-2">
                      <label className="font-semibold text-gray-600 py-2">
                        Project<abbr title="required">*</abbr>
                      </label>
                      <Select
                        //  className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "

                        placeholder="Select Project"
                        options={aquaticCreatures}
                      />

                      <p
                        className="text-sm text-red-500 hidden mt-3"
                        id="error"
                      >
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                    <div className="w-full flex flex-col mb-3">
                      <label className="font-semibold text-gray-600 py-2">
                        Assign To<abbr title="required">*</abbr>
                      </label>
                      <Select
                        //  className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "

                        placeholder="Executive Name"
                        options={cityList}
                      />

                      <p
                        className="text-sm text-red-500 hidden mt-3"
                        id="error"
                      >
                        Please fill out this field.
                      </p>
                    </div>
                  </div>
                  <div className="flex-auto w-full mb-1 text-xs space-y-2 mt-2">
                    <Label
                      name="Notes"
                      className="font-semibold text-gray-600 py-2"
                      errorClassName="label font-regular text-sm"
                    />
                    <TextAreaField
                      name="desc"
                      placeholder="Notes"
                      className="w-full min-h-50px] max-h-[300px] h-16 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
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
                  <label className="font-md text-[#053219] py-2 text-sm mb-1  mt-2">
                    Advanced<abbr title="required">*</abbr>
                  </label>
                  <div className="border-t">
                    <div className=" flex flex-col  mt-4  px-1 py-1 ">
                      <label className="font-semibold text-[#053219]  text-sm mb-2">
                        Type<abbr title="required">*</abbr>
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
                    <div className="md:flex md:flex-row md:space-x-4 w-full text-xs mt-3">
                      <div className="w-full flex flex-col mb-3">
                        <label className="font-semibold text-gray-600 py-2">
                          Budget<abbr title="required">*</abbr>
                        </label>
                        <Select
                          //  className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "

                          placeholder="Budget"
                          options={cityList}
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
                  <p className="text-xs text-red-500 text-right my-3">
                    Required fields are marked with an asterisk{' '}
                    <abbr title="Required field">*</abbr>
                  </p>
                  <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
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
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddLeadForm
