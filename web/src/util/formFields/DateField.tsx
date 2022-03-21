import React from 'react'
import { ErrorMessage, useField } from 'formik'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/lab'

export const DateField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="mb-2 w-full flex flex-col">
      <label htmlFor={field.name} className="label font-regular text-sm">
        {label}
      </label>
      <DatePicker
        {...field}
        {...props}
        renderInput={(params) => (
          <TextField
            className={` ${meta.touched && meta.error && 'is-invalid'}`}
            placeholder="dd/mm/yyyy"
            size="small"
            {...params}
            {...field}
          />
        )}
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error-message text-red-700 text-xs p-2"
      />
    </div>
  )
}
