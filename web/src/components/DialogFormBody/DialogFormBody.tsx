import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { InputAdornment, TextField as MuiTextField } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import Loader from 'src/components/Loader/Loader'
import { TextField } from 'src/util/formFields/TextField'
import { TextAreaField } from 'src/util/formFields/TextAreaField'
import { CustomRadioGroup } from 'src/util/formFields/CustomRadioGroup'
import { CustomSelect } from 'src/util/formFields/selectBoxField'
import {
  developmentTypes,
  projectPlans,
  statesList,
} from 'src/constants/projects'
import { AreaConverter } from 'src/components/AreaConverter'
import { createProject, updateProject } from 'src/context/dbQueryFirebase'

const DialogFormBody = ({ title, dialogOpen, project }) => {
  const [selected, setSelected] = useState(
    project?.projectType || projectPlans[0]
  )
  const [devType, setdevType] = useState(
    project?.developmentType || developmentTypes[0]
  )
  const [loading, setLoading] = useState(false)
  const [openAreaFields, setOpenAreaFields] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (data, resetForm) => {
    const updatedData = {
      ...data,
      projectType: selected,
      developmentType: devType,
      editMode: true,
    }
    setLoading(true)
    if (project?.editMode) {
      await updateProject(project.uid, updatedData, enqueueSnackbar)
    } else {
      await createProject(updatedData, enqueueSnackbar, resetForm)
    }
    setLoading(false)
  }

  const onAreaClick = () => {
    setOpenAreaFields(!openAreaFields)
  }

  const initialState = {
    projectName: project?.projectName || '',
    builderName: project?.builderName || '',
    builderGSTno: project?.builderGSTno || '',
    area: project?.area || '',
    location: project?.location || '',
    pincode: project?.pincode || '',
    state: project?.state || '',
    city: project?.city || '',
    address: project?.address || '',
    areaTextPrimary: project?.areaTextPrimary || '',
    areaTextSecondary: project?.areaTextSecondary || '',
    areaDropDownPrimary: project?.areaDropDownPrimary || 'acre',
    areaDropdownSecondary: project?.areaDropdownSecondary || 'gunta',
  }

  const createProjectSchema = Yup.object({
    projectName: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Required'),
    builderName: Yup.string()
      .min(3, 'Must be 3 characters or more')
      .required('Required'),
    builderGSTno: Yup.string()
      .length(15, 'Must be 15 characters')
      .required('Required'),
    location: Yup.string().required('Required'),
    pincode: Yup.string()
      .required('Required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .length(6, 'Must be 6 digits'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    area: Yup.number().required('Required'),
  })
  return (
    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
      <div className="px-4 sm:px-6  z-10">
        <Dialog.Title className=" font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title>
      </div>

      <div className="grid  gap-8 grid-cols-1">
        <div className="flex flex-col m-4">
          <div className="flex flex-col mt-2 rounded-lg bg-white border border-gray-100 p-4 ">
            <CustomRadioGroup
              label="Type"
              value={selected}
              options={projectPlans}
              onChange={setSelected}
            />
          </div>
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
                    <div className="flex flex-col mt-2 rounded-lg bg-white border border-gray-100 p-4 ">
                      <TextField
                        label="Project Name*"
                        name="projectName"
                        type="text"
                      />
                      <CustomRadioGroup
                        label="Development Type"
                        value={devType}
                        options={developmentTypes}
                        onChange={setdevType}
                      />
                      <div className="flex mt-3 mb-3 space-y-2 w-full text-xs">
                        <div className="mt-2 mr-3 w-full">
                          <TextField
                            label="Builder Name*"
                            name="builderName"
                            type="text"
                          />
                        </div>
                        <div className="mt-2 w-full">
                          <TextField
                            label="Builder GST No*"
                            name="builderGSTno"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2 rounded-lg bg-white border border-gray-100 p-4 ">
                      <div className="mb-3">
                        <label
                          htmlFor="area"
                          className="label font-regular text-sm"
                        >
                          Area*
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
                          name="area"
                          type="text"
                          value={formik.values.area}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.area ? (
                          <div className="error-message text-red-700 text-xs p-2">
                            {formik.errors.area}
                            {formik.values.area}
                          </div>
                        ) : null}
                        {openAreaFields && (
                          <AreaConverter
                            formik={formik}
                            hideField={setOpenAreaFields}
                            fieldName="area"
                          />
                        )}
                      </div>
                      <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                        <TextField
                          label="Location*"
                          name="location"
                          type="text"
                        />
                        <TextField
                          label="Pincode*"
                          name="pincode"
                          type="text"
                        />
                      </div>
                      <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                        <div className="mt-2 w-full">
                          <TextField label="City*" name="city" type="text" />
                        </div>
                        <div className="w-full">
                          <CustomSelect
                            name="state"
                            label="State*"
                            className="input mt-3"
                            onChange={({ value }) => {
                              formik.setFieldValue('state', value)
                            }}
                            value={formik.values.state}
                            options={statesList}
                          />
                          {formik.errors.state ? (
                            <div className="error-message text-red-700 text-xs p-2">
                              {formik.errors.state}
                              {formik.values.state}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="mt-2 w-full">
                        <TextAreaField
                          label="Address"
                          name="address"
                          type="text"
                        />
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
                          {project?.editMode ? 'Update' : 'Save'}
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

export default DialogFormBody
