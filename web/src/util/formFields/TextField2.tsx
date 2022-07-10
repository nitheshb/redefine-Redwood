import React from 'react'
import { ErrorMessage, useField } from 'formik'
// import { InputField, Label } from '@redwoodjs/forms'

export const TextField2 = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="mb-2 w-full">
      <div className="flex flex-row">
        <label
          htmlFor={field.name}
          className="label font-regular text-blueGray-600  text-sm block mb-1"
        >
          {label}
        </label>
        <ErrorMessage
          component="div"
          name={field.name}
          className="error-message text-red-700 text-xs p-1 mx-auto"
        />
      </div>

      {/* <label
        className="block  text-blueGray-600 text-xs font-bold mb-2"
        htmlFor={field.name}
      >
        {' '}
        {label}
      </label> */}

      <input
        className={` ${meta.touched && meta.error && 'is-invalid'} ${
          field.name === 'blockName' ? '' : ' h-8  '
        }
           w-full min-w-full text-sm flex bg-grey-lighter text-grey-darker font-light border px-4`}
        {...field}
        {...props}
        autoComplete="off"
      />
    </div>
  )
}
