import React from 'react'
import Select from 'react-select'

export const CustomSelect = ({
  onChange,
  options,
  value,
  name,
  label,
  className,
}) => {
  const defaultValue = (options, value) => {
    return (
      (options ? options.find((option) => option.value === value) : '') || ''
    )
  }

  return (
    <div className={className}>
      <label className="label font-regular text-sm mb-2">{label}</label>
      <Select
        name={name}
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value)
        }}
        options={options}
        className="text-sm  mt-1 border-transparent"
      />
      {/* <ErrorMessage
        component="div"
        name={name}
        className="error-message text-red-700 text-xs px-2"
      /> */}
    </div>
  )
}
