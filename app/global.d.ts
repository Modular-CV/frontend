import type { ErrorCode } from 'react-i18next'
import type { InputStyle, ButtonStyle, Language } from './types'

declare global {
  type LoginForm = {
    email: string
    password: string
  }

  type CreateAccountForm = {
    email: string
    password: string
  }

  type ApiResponseStatus = 'SUCCESS' | 'ERROR'

  type ApiResponse<
    Property extends string = undefined,
    DataType = undefined,
  > = {
    status: ApiResponseStatus
    data?: { [key in Property]: DataType }
    message?: string
    error?: ErrorCode
  }

  type Account = {
    id: string
    email: string
    isVerified: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }

  type InputStyleValues = (typeof InputStyle)[keyof typeof InputStyle]

  type ButtonStyleValues = (typeof ButtonStyle)[keyof typeof ButtonStyle]

  type LanguageKeys = keyof typeof Language
}
