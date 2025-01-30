import React from 'react'
import type { ToastContentProps } from 'react-toastify'

export interface Props extends ToastContentProps {
  data: string
}

const Toast = ({ data }: Props) => {
  return <div>{data}</div>
}

export default Toast
