import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useParams } from '@redwoodjs/router'
import { InputAdornment, TextField as MuiTextField } from '@mui/material'
import Loader from 'src/components/Loader/Loader'
import { TextField } from 'src/util/formFields/TextField'
import { TextAreaField } from 'src/util/formFields/TextAreaField'
import { createBlock, updateBlock } from 'src/context/dbQueryFirebase'

const AddBlockForm = ({ title, dialogOpen, data }) => {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { uid } = useParams()

  const onSubmit = async (formData, resetForm) => {
    const updatedData = {
      ...formData,
      projectId: uid,
      phaseId: data?.phase?.uid,
      editMode: true,
    }
    setLoading(true)
    if (data?.block?.editMode) {
      await updateBlock(
        data?.block?.uid,
        {
          ...formData,
          editMode: true,
        },
        enqueueSnackbar
      )
    } else {
      await createBlock(updatedData, enqueueSnackbar, resetForm)
    }
    setLoading(false)
  }

  const initialState = {
    blockName: data?.block?.blockName || '',
    floors: data?.block?.floors || '',
    units: data?.block?.units || '',
    totalArea: data?.block?.totalArea || '',
    remarks: data?.block?.remarks || '',
  }

  const createProjectSchema = Yup.object({
    blockName: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Required'),
    floors: Yup.number().required('Required'),
    units: Yup.number().required('Required'),
    totalArea: Yup.number().required('Required'),
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
                        label="Block Name*"
                        name="blockName"
                        type="text"
                      />
                      <div className="flex mt-3 mb-3 space-y-2 w-full text-xs">
                        <div className="mt-2 mr-3">
                          <TextField
                            label="Floors*"
                            name="floors"
                            type="text"
                          />
                        </div>
                        <div className="mt-2 mr-3">
                          <TextField label="Units*" name="units" type="text" />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="area"
                            className="label font-regular text-sm"
                          >
                            Total Area*
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
                            name="totalArea"
                            type="text"
                            value={formik.values.totalArea}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.totalArea ? (
                            <div className="error-message text-red-700 text-xs p-2">
                              {formik.errors.totalArea}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="mt-2 w-full">
                        <TextAreaField
                          label="Remarks"
                          name="remarks"
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
                          {data?.block?.editMode ? 'Update' : 'Save'}
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

export default AddBlockForm
