import React from 'react'
import { ErrorMessage, useField } from 'formik'
// import { InputField, Label } from '@redwoodjs/forms'

export const TextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className="mb-2 w-full">
      <label htmlFor={field.name} className="label font-regular text-sm">
        {label}
      </label>
      {/* <Label
        name={label}
        className="label font-regular text-sm"
        errorClassName="label font-regular text-sm"
      /> */}
      <textarea
        className={` ${meta.touched && meta.error && 'is-invalid'}
           w-full min-w-full flex bg-grey-lighter text-grey-darker border border-[#cccccc] rounded-md h-10 px-4 mt-1`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage
        component="div"
        name={field.name}
        className="error-message text-red-700 text-xs p-2"
      />
    </div>
    // <div className="mb-3 space-y-2 w-full text-xs">
    //   <Label
    //     name={label}
    //     className="label font-regular text-sm"
    //     errorClassName="label font-regular text-sm"
    //   />
    //   <InputField
    //     name="email"
    //     placeholder="Email Id"
    //     className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
    //     validation={{ required: true }}
    //   />
    //   <ErrorMessage component="div" name={field.name} className="error" />
    // </div>
  )
}
