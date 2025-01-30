import React, { type ButtonHTMLAttributes } from 'react'

export type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonStyle?: ButtonStyleValue
}

const Button = (props: Props) => {
  const { children, buttonStyle, className, ...buttonProps } = props
  return (
    <button
      {...buttonProps}
      className={
        (className ? className + ' ' : '') +
        (buttonStyle ? 'btn ' + buttonStyle : '')
      }
    >
      {children}
    </button>
  )
}

export default Button
