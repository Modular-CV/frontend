import type { InputStyle, ButtonStyle, Language } from './types'
import { ErrorCode } from './types'

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
    Property extends Record<string, unknown> | undefined = undefined,
  > = {
    status: ApiResponseStatus
    data?: Property extends undefined ? never : Property
    message?: string
    error?: ErrorCodeKey
  }

  type Account = {
    id: string
    email: string
    isVerified: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }

  type SessionTokens = {
    accessToken: string
    refreshToken: string
  }

  type InputStyleValue = (typeof InputStyle)[keyof typeof InputStyle]

  type ButtonStyleValue = (typeof ButtonStyle)[keyof typeof ButtonStyle]

  type LanguageKey = keyof typeof Language

  type ErrorCodeKey = keyof typeof ErrorCode

  type SessionData = {
    accessToken?: string
    refreshToken?: string
  }
}
