import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useParams } from '@redwoodjs/router'
import {
  InputAdornment,
  TextField as MuiTextField,
  Checkbox,
} from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
// import { format } from 'date-fns'
import Loader from 'src/components/Loader/Loader'
import { TextField } from 'src/util/formFields/TextField'
import { DateField } from 'src/util/formFields/DateField'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import { unitsCancellation } from 'src/constants/projects'
import { AreaConverter } from 'src/components/AreaConverter'
import { createPhase, updatePhase } from 'src/context/dbQueryFirebase'

const AddPhaseForm = ({ title, dialogOpen, phase }) => {
  const [loading, setLoading] = useState(false)
  const [openAreaFields, setOpenAreaFields] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { uid } = useParams()

  const onSubmit = async (data, resetForm) => {
    const updatedData = {
      ...data,
      projectId: uid,
      editMode: true,
    }
    setLoading(true)
    if (phase?.editMode) {
      await updatePhase(phase.uid, updatedData, enqueueSnackbar)
    } else {
      await createPhase(updatedData, enqueueSnackbar, resetForm)
    }
    setLoading(false)
  }

  const onAreaClick = () => {
    setOpenAreaFields(!openAreaFields)
  }

  const initialState = {
    phaseName: phase?.phaseName || '',
    phaseArea: phase?.phaseArea || '',
    sellableArea: phase?.sellableArea || '',
    sellingRate: phase?.sellingRate || '',
    startDate: phase?.startDate || null,
    endDate: phase?.endDate || null,
    unitsCancel: phase?.unitsCancel || '',
    reraStartDate: phase?.unitsCancel || null,
    reraEndDate: phase?.unitsCancel || null,
    // builderName: phase?.builderName || '',
    // builderGSTno: phase?.builderGSTno || '',
    // location: phase?.location || '',
    // pincode: phase?.pincode || '',
    // state: phase?.state || '',
    // city: phase?.city || '',
    // address: phase?.address || '',
    areaTextPrimary: phase?.areaTextPrimary || '',
    areaTextSecondary: phase?.areaTextSecondary || '',
    areaDropDownPrimary: phase?.areaDropDownPrimary || 'acre',
    areaDropdownSecondary: phase?.areaDropdownSecondary || 'gunta',
  }

  const createProjectSchema = Yup.object({
    phaseName: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Required'),
    phaseArea: Yup.string().required('Required'),
    sellableArea: Yup.string().required('Required'),
    sellingRate: Yup.number().required('Required'),
    // startDate: Yup.date().nullable(),
    // endDate: Yup.date().nullable(),
    // location: Yup.string().required('Required'),
    // pincode: Yup.string()
    //   .required('Required')
    //   .matches(/^[0-9]+$/, 'Must be only digits')
    //   .length(6, 'Must be 6 digits'),
    // city: Yup.string().required('Required'),
    // state: Yup.string().required('Required'),
    // area: Yup.number().required('Required'),
  })

  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title>
      </div>

      <div className="grid gap-8 grid-cols-1">
        <div className="flex flex-col rounded-lg bg-white m-4">
          <div className="mt-0">
            <Formik
              initialValues={initialState}
              validationSchema={createProjectSchema}
              onSubmit={(values, { resetForm }) => {
                onSubmit(values, resetForm)
              }}
            >
              {(formik) => (
                <Form>
                  <div className="form">
                    {/* Phase Details */}
                    <div className="flex flex-col mt-2 rounded-lg bg-white border border-gray-100 px-4 ">
                      <div className="flex flex-col mt-3 mb-3 space-y-2 w-full text-xs">
                        <h6 className="font-semibold text-[#053219] py-2 text-sm mb-2 mt-0">
                          Phase Details
                        </h6>
                        <div className="mt-2 mr-3 w-full">
                          <TextField
                            label="Phase Name*"
                            name="phaseName"
                            type="text"
                          />
                          <div className="mb-3">
                            <label
                              htmlFor="area"
                              className="label font-regular text-sm"
                            >
                              Phase Area*
                            </label>
                            <MuiTextField
                              id="phaseArea"
                              className={`w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 mt-1 p-0`}
                              size="small"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    sqft
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <button
                                      type="button"
                                      style={{ marginRight: '-13px' }}
                                      onClick={onAreaClick}
                                      className="border border-green-400 font-semibold text-3xl px-2 bg-green-400 shadow-sm font-medium tracking-wider text-white hover:shadow-lg hover:bg-green-500"
                                    >
                                      {openAreaFields ? <Remove /> : <Add />}
                                    </button>
                                  </InputAdornment>
                                ),
                              }}
                              label=""
                              name="phaseArea"
                              type="text"
                              value={formik.values.phaseArea}
                              onChange={formik.handleChange}
                            />
                            {formik.errors.phaseArea ? (
                              <div className="error-message text-red-700 text-xs p-2">
                                {formik.errors.phaseArea}
                                {formik.values.phaseArea}
                              </div>
                            ) : null}
                            {openAreaFields && (
                              <AreaConverter
                                formik={formik}
                                hideField={setOpenAreaFields}
                                fieldName="phaseArea"
                              />
                            )}
                          </div>
                          <div className="flex justify-between">
                            <div className="mr-2 basis-1/2">
                              <label
                                htmlFor="area"
                                className="label font-regular text-sm"
                              >
                                Selling Rate (/Sqft)*
                              </label>
                              <MuiTextField
                                id="sellingRate"
                                className={`w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 mt-1 p-0`}
                                size="small"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      Rs.
                                    </InputAdornment>
                                  ),
                                }}
                                label=""
                                name="sellingRate"
                                type="text"
                                value={formik.values.sellingRate}
                                onChange={formik.handleChange}
                              />
                              {formik.errors.sellingRate ? (
                                <div className="error-message text-red-700 text-xs p-2">
                                  {formik.errors.sellingRate}
                                  {formik.values.sellingRate}
                                </div>
                              ) : null}
                            </div>
                            <div className="ml-2 basis-1/2">
                              <label
                                htmlFor="sellableArea"
                                className="label font-regular text-sm"
                              >
                                Sellable Area*
                              </label>
                              <MuiTextField
                                id="area"
                                className={`w-full bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 mt-1 p-0`}
                                size="small"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      sqft
                                    </InputAdornment>
                                  ),
                                }}
                                label=""
                                name="sellableArea"
                                type="text"
                                value={formik.values.sellableArea}
                                onChange={formik.handleChange}
                              />
                              {formik.errors.sellableArea ? (
                                <div className="error-message text-red-700 text-xs p-2">
                                  {formik.errors.sellableArea}
                                  {formik.values.sellableArea}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Dev/Const & Sales */}
                    <div className="flex flex-col mt-2 rounded-lg bg-white border border-gray-100 px-4 ">
                      <div className="flex flex-col mt-3 mb-3 space-y-2 w-full text-xs">
                        <h6 className="font-semibold text-[#053219] py-2 text-sm mb-2 mt-0">
                          Dev/Const & Sales
                        </h6>
                        <div className="flex flex-row justify-between">
                          <div className="w-full mr-2">
                            <DateField
                              name="startDate"
                              label="Start Date"
                              error={false}
                              value={formik.values.startDate}
                              onChange={(newValue) => {
                                formik.setFieldValue('startDate', newValue)
                              }}
                            />
                          </div>
                          <div className="w-full ml-2">
                            <DateField
                              name="endDate"
                              label="End Date"
                              value={formik.values.endDate}
                              onChange={(newValue) => {
                                formik.setFieldValue('endDate', newValue)
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-full mr-2">
                            <TextField
                              label="Brokerage"
                              name="brokerage"
                              type="text"
                            />
                          </div>
                          <div className="w-full flex ml-2">
                            <div className="basis-1/2 mr-1">
                              <TextField
                                label="Unit Cancellation"
                                name="unitCancellation"
                                type="text"
                              />
                            </div>
                            <div className="basis-1/2 mt-5 ml-1">
                              <CustomSelect
                                name="unitsCancel"
                                label=""
                                className="input"
                                onChange={({ value }) => {
                                  formik.setFieldValue('unitsCancel', value)
                                }}
                                value={formik.values.unitsCancel}
                                options={unitsCancellation}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* RERA Details */}
                    <div className="flex flex-col mt-2 rounded-lg bg-white border border-gray-100 px-4 ">
                      <div className="flex flex-col mt-3 mb-3 space-y-2 w-full text-xs">
                        <h6 className="font-semibold text-[#053219] py-2 text-sm mb-2 mt-0">
                          RERA Details
                        </h6>
                        <div className="flex flex-row justify-between">
                          <div className="w-full mr-2">
                            <TextField
                              label="RERA No"
                              name="reraNo"
                              type="text"
                            />
                          </div>
                          <div className="w-full mr-2">
                            <DateField
                              name="reraStartDate"
                              label="RERA Start Date"
                              error={false}
                              value={formik.values.reraStartDate}
                              onChange={(newValue) => {
                                formik.setFieldValue('reraStartDate', newValue)
                              }}
                            />
                          </div>
                          <div className="w-full">
                            <DateField
                              name="reraEndDate"
                              label="RERA End Date"
                              value={formik.values.reraEndDate}
                              onChange={(newValue) => {
                                formik.setFieldValue('reraEndDate', newValue)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Options */}
                    <div className="flex flex-col mt-2 rounded-lg bg-white border border-gray-100 p-4 ">
                      <h6 className="font-semibold text-[#053219] py-2 text-sm mb-2 mt-0">
                        Options
                      </h6>
                      <div className="flex flex-row">
                        <div className="w-full flex items-center mr-4">
                          <label
                            htmlFor="area"
                            className="label font-regular text-sm"
                          >
                            Separate Agreements For Construction & Land
                          </label>
                          <Checkbox color="primary" />
                        </div>
                        <div className="w-full flex items-center mr-4">
                          <label
                            htmlFor="area"
                            className="label font-regular text-sm"
                          >
                            Make Cancel Unit Available After Refund
                          </label>
                          <Checkbox color="primary" />
                        </div>
                        <div className="w-full flex items-center">
                          <label
                            htmlFor="area"
                            className="label font-regular text-sm"
                          >
                            GST On Receipt Basis
                          </label>
                          <Checkbox color="primary" />
                        </div>
                      </div>
                      <p className="text-xs text-red-500 text-right my-3">
                        Required fields are marked with an asterisk{' '}
                        <abbr title="Required field">*</abbr>
                      </p>
                      <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse mb-6">
                        <button
                          onClick={() => dialogOpen(false)}
                          type="button"
                          className="mb-4 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                        >
                          {' '}
                          Cancel{' '}
                        </button>
                        <button
                          className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                          type="submit"
                          disabled={loading}
                        >
                          {loading && <Loader />}
                          {phase?.editMode ? 'Update' : 'Save'}
                        </button>
                      </div>
                    </div>
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

export default AddPhaseForm
