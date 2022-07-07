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
  projectDetails,
  unitDetails,
  dialogOpen,
  setShowCostSheetWindow,
  selUnitDetails,
}) => {
  const { user } = useAuth()
  const ref = createRef()
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  useEffect(() => {
    console.log('value os selUnitDetails', selUnitDetails)
    console.log('value os unitDetails', unitDetails)
  }, [])

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
  const initialState = {
    blockReason: '',
    unit_cost_charges: 0,
    car_parking_charges: 0,
    electric_or_Sweage_Charges: 0,
    maintenance_charges: 0,
    powerbackup_charges: 0,
    maintenanace_desposit: 0,

    clubhouse_membership_charges: 0,

    permium_charges: 0,
    legal_doc_charges: 0,
    other_charges: 0,
  }
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
      <section className="py-20 bg-black">
        <div className="max-w-5xl w-5xl mx-auto right-0 text-white flex flex-row justify-between">
          <span></span>
          <span onClick={() => setShowCostSheetWindow(false)}>Close</span>
        </div>
        <div className="max-w-5xl mx-auto py-16 bg-white">
          <article className="overflow-hidden">
            <div className="bg-[white] rounded-b-md">
              <div className="p-9">
                <div className=" text-slate-700 flex flex-row">
                  <img
                    alt=""
                    className="object-cover h-12"
                    src="https://pbs.twimg.com/profile_images/1513243060834123776/dL8-d7zI_400x400.png"
                  />
                  <div className="ml-3">
                    <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                      {projectDetails?.projectName}
                    </p>
                    {projectDetails?.address}-{projectDetails?.state}-
                    {projectDetails?.pincode}
                  </div>
                </div>
              </div>
              <div className="p-9">
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

              {['Detail View', 'Quotation', 'Book', 'Block'].includes(
                selMode
              ) && (
                <div className="p-9">
                  <p className="text-md font-extrabold tracking-tight uppercase font-body">
                    COST SHEET
                  </p>
                  <div className="flex flex-col mx-0 mt-8 px-[150px]">
                    <Formik
                      initialValues={initialState}
                      validationSchema={validate}
                      onSubmit={(values, { resetForm }) => {
                        // onSubmit(values, resetForm)
                      }}
                    >
                      {(formik) => (
                        <Form ref={ref}>
                          <table className="divide-y divide-slate-500 w-[740px] min-w-[740px] max-w-[740px] overflow-x-auto ">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-3 pr-4 text-left text-sm font-normal text-slate-700 sm:pr-6 md:pr-0 max-w-[100px] w-[49px]"
                                >
                                  SNo
                                </th>
                                <th
                                  scope="col"
                                  colSpan={3}
                                  className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                                >
                                  Description
                                </th>

                                <th
                                  scope="col"
                                  className="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                                >
                                  Amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {apartUnitChargesMock.map((dat, i) => (
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
                              ))}
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
                                  ₹ 12,000
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
              )}
              {['Detail View', 'Book', 'Block'].includes(selMode) && (
                <AddBookingForm title="Booking Form" />
              )}
              {['Book'].includes(selMode) && (
                <AddPaymentDetailsForm
                  title={undefined}
                  dialogOpen={undefined}
                  phase={undefined}
                />
              )}
              {['Block'].includes(selMode) && (
                <BlockingUnitForm title="Blocking Form" />
              )}
              {['Detail View'].includes(selMode) && <UnitTransactionForm />}
              <div className="mt-48 p-9">
                <div className="border-t pt-9 border-slate-200">
                  <div className="text-sm font-light text-slate-700">
                    <p>
                      Payment terms are 14 days. Please be aware that according
                      to the Late Payment of Unwrapped Debts Act 0000,
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
