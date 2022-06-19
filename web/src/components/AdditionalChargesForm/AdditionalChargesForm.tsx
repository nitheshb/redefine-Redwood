import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Alert, AlertTitle } from '@mui/lab'
import { useSnackbar } from 'notistack'
import Select from 'react-select'
import { MaterialCRUDTable } from 'src/components/MaterialCRUDTable'
import {
  getAdditionalCharges,
  createAdditonalCharges,
  updateAdditionalCharges,
  deleteAdditionalCharge,
} from 'src/context/dbQueryFirebase'
import { unitsCancellation } from 'src/constants/projects'

const AdditionalChargesForm = ({ title, data }) => {
  const [tableData, setTableData] = useState([])
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  const columns = [
    {
      title: 'Charges For*',
      field: 'chargesFor',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      editComponent: ({ value, onChange }) => (
        <input
          placeholder="Charges For"
          className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      ),
    },
    {
      title: 'Units*',
      field: 'units',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) => rowData?.units?.label,
      editComponent: ({ onChange }) => {
        return (
          <Select
            name="Chargesdropdown"
            onChange={(value) => {
              onChange(value)
            }}
            options={unitsCancellation}
            className="text-md mr-2"
          />
        )
      },
    },
    {
      title: 'Charges*',
      field: 'charges',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      render: (rowData) =>
        rowData?.units?.value === 'percentage'
          ? `${rowData.charges} %`
          : `₹ ${rowData.charges}`,
      editComponent: ({ value, onChange, rowData }) => {
        return (
          <input
            placeholder="Charges"
            className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
            autoComplete="off"
            onChange={(e) =>
              rowData?.units?.value === 'percentage'
                ? onChange(
                    parseInt(e.target.value) > 100 ? 100 : e.target.value
                  )
                : onChange(e.target.value)
            }
            value={value}
            type="number"
            max="100"
          />
        )
      },
    },
    {
      title: 'Description*',
      field: 'description',
      headerStyle: {
        padding: '0.25rem',
      },
      cellStyle: {
        padding: '0.25rem',
      },
      editComponent: ({ value, onChange }) => (
        <input
          placeholder="Description"
          className="w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-2"
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      ),
    },
  ]

  const getCharges = async () => {
    const { projectId, uid } = data?.phase || {}
    const unsubscribe = getAdditionalCharges(
      { projectId, phaseId: uid },
      (querySnapshot) => {
        const response = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setTableData(response)
      },
      (e) => {
        console.log('error', e)
        setTableData([])
      }
    )
    return unsubscribe
  }

  useEffect(() => {
    getCharges()
  }, [])

  const errors = (formData) => {
    //validating the data inputs
    const errorList = []
    if (!formData.chargesFor) {
      errorList.push("Try Again, You didn't enter the Charges For field")
    }
    if (!formData.charges) {
      errorList.push("Try Again, You didn't enter the Charges field")
    }

    if (!formData.description) {
      errorList.push("Try Again, description field can't be blank")
    }
    return errorList
  }
  //function for updating the existing row details
  const handleRowUpdate = async (newData) => {
    const errorList = errors(newData)
    if (errorList.length < 1) {
      const update = {
        ...newData,
      }
      await updateAdditionalCharges(newData?.uid, update, enqueueSnackbar)
    } else {
      setErrorMessages(errorList)
      setIserror(true)
    }
  }

  //function for deleting a row
  const handleRowDelete = async (oldData) => {
    await deleteAdditionalCharge(oldData?.uid, enqueueSnackbar)
  }

  //function for adding a new row to the table
  const handleRowAdd = async (newData) => {
    setIserror(false)
    setErrorMessages([])
    const errorList = errors(newData)
    if (errorList.length < 1) {
      const { projectId, uid } = data?.phase || {}
      const update = {
        ...newData,
        projectId,
        phaseId: uid,
      }
      await createAdditonalCharges(update, enqueueSnackbar)
    } else {
      setErrorMessages(errorList)
      setIserror(true)
    }
  }

  return (
    <div className="h-full flex flex-col pt-6 mb-6 bg-white shadow-xl overflow-y-scroll">
      <div className="z-10">
        {/* <Dialog.Title className="font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </Dialog.Title> */}
        <span className="font-semibold text-xl mr-auto ml-3 text-[#053219]">
          {title}
        </span>
        <div className="mt-2 min">
          <MaterialCRUDTable
            title=""
            columns={columns}
            data={tableData}
            options={{
              headerStyle: {
                borderBottomWidth: '3px',
              },
              actionsColumnIndex: -1,
              paging: false,
              minBodyHeight: '300px',
              doubleHorizontalScroll: true,
            }}
            style={{
              padding: '30px',
            }}
            actionsCellStyle={{
              width: 'auto',
              justifyCenter: 'center',
            }}
            editable={{
              onRowAdd: async (newData) => await handleRowAdd(newData),
              onRowUpdate: async (newData) => await handleRowUpdate(newData),
              onRowDelete: async (oldData) => await handleRowDelete(oldData),
            }}
          />
        </div>
        <div>
          {iserror && (
            <Alert severity="error">
              <AlertTitle>ERROR</AlertTitle>
              {errorMessages.map((msg, i) => {
                return <div key={i}>{msg}</div>
              })}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdditionalChargesForm
