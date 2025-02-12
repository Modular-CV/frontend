import React, { type InputHTMLAttributes } from 'react'

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  inputStyle?: InputStyleValue
}

const Input = (props: Props) => {
  const {
    label,
    error,
    className,
    inputStyle = 'primary',
    ...inputProps
  } = props

  return (
    <div className="flex flex-col gap-1 mb-1">
      {label && inputProps.id && <label htmlFor={inputProps.id}>{label}</label>}
      <input
        {...inputProps}
        className={(className ? className + ' ' : '') + inputStyle}
      />
      <div className="relative">
        {error && (
          <span className="absolute text-sm text-red-500">{error}</span>
        )}
      </div>
    </div>
  )
}

export default Input
