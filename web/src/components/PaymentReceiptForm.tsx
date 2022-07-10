import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useParams } from '@redwoodjs/router'
import {
  InputAdornment,
  TextField as MuiTextField,
  Checkbox,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { format, isDate, parse } from 'date-fns'
import Loader from 'src/components/Loader/Loader'
import { TextField } from 'src/util/formFields/TextField'
import { DateField } from 'src/util/formFields/DateField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import {
  bankPreferredType,
  banksList,
  unitsCancellation,
} from 'src/constants/projects'
import { AreaConverter } from 'src/components/AreaConverter'
import {
  addBankAccount,
  addVirtualAccount,
  createPhase,
  updatePhase,
} from 'src/context/dbQueryFirebase'
import { TextField2 } from 'src/util/formFields/TextField2'

const AddPaymentDetailsForm = ({ title, dialogOpen, phase: bankData }) => {
  const [loading, setLoading] = useState(false)
  const [openAreaFields, setOpenAreaFields] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { uid } = useParams()

  const onSubmit = async (data, resetForm) => {
    const updatedData = {
      ...data,
    }

    setLoading(true)
    if (title === 'Bank Accounts' || title === 'Add New Account') {
      await addBankAccount(
        updatedData,
        'nithe.nithesh@gmail.com',
        'bankAccount Creation',
        enqueueSnackbar,
        resetForm
      )
      console.log('bank details are', updatedData, loading)
      await setLoading(false)
      await dialogOpen(false)
    } else if (title === 'Virtual Accounts') {
      await addVirtualAccount(
        updatedData,
        'nithe.nithesh@gmail.com',
        'virtural Creation'
      )
      await setLoading(false)
    }
    // if (bankData?.editMode) {
    //   await updatePhase(bankData.uid, updatedData, enqueueSnackbar)
    // } else {
    //   await createPhase(updatedData, enqueueSnackbar, resetForm)
    // }
  }

  const initialState = {
    date: bankData?.date || '',
    amount: bankData?.amount || '',
    payto: bankData?.payto || '',
    mode: bankData?.mode || '',
    drawnonbank: bankData?.drawnonbank || '',
    chequeno: bankData?.chequeno || '',
    dated: bankData?.dated || '',
  }

  const validateSchema = Yup.object({
    date: Yup.string().required('Bank Required'),
    amount: Yup.string().required('Required'),
    payto: Yup.string().required('Required'),
    mode: Yup.string().required('Bank Required'),
    drawnonbank: Yup.string().required('Required'),
    chequeno: Yup.string().required('Required'),
    dated: Yup.string().required('Required'),
  })

  const submitFormFun = (formik) => {
    formik.handleSubmit()
  }

  return (
    <div className="">
      <div className="px-4 sm:px-6  z-10">
        {/* <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
      </div>

      <div className="grid gap-8 grid-cols-1">
        <div className="flex flex-col rounded-lg bg-white m-4">
          <div className="mt-0">
            <Formik
              initialValues={initialState}
              validationSchema={validateSchema}
              onSubmit={(values, { resetForm }) => {
                onSubmit(values, resetForm)
              }}
            >
              {(formik) => (
                <Form>
                  <div className="form">
                    {/* Phase Details */}

                    <section className=" py-1 bg-blueGray-50">
                      <div className="w-full px-4 mx-auto ">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                          <div className="rounded-t bg-[#F1F5F9] mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                              <p className="text-md font-extrabold tracking-tight uppercase font-body">
                                Payment Entry
                              </p>
                              <button
                                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                              >
                                Receipt Download
                              </button>
                            </div>
                          </div>
                          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                Booking Amount Details
                              </h6>
                              <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Amount"
                                      name="amount"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Mode"
                                      name="mode"
                                      type="text"
                                    />
                                  </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Cheque No/Reference No"
                                      name="payto"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Dated"
                                      name="payto"
                                      type="text"
                                    />
                                  </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <TextField2
                                      label="Paid To"
                                      name="mode"
                                      type="text"
                                    />
                                  </div>
                                </div>
                              </div>
                              <hr className="mt-6 border-b-1 border-blueGray-300" />
                              <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                                <button
                                  className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-xs hover:shadow-lg hover:bg-green-500"
                                  type="submit"
                                  disabled={loading}
                                >
                                  {/* {loading && <Loader />} */}
                                  {'Save'}
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPaymentDetailsForm
