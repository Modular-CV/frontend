import type { InputStyle, ButtonStyle, Language } from './types'
import { ErrorCode } from './types'

declare global {
  type ResumeFormId = 'TITLE_FORM' | 'PROFILE_FORM'

  interface Form extends Record<string, string> {
    formId: ResumeFormId
  }

  interface TitleForm extends Form {
    formId: 'TITLE_FORM'
    title: string
  }

  interface ProfileForm extends Form {
    formId: 'PROFILE_FORM'
    fullName: string
    jobTitle: string
    email: string
    phone: string
    address: string
  }

  type ProfileInput = {
    fullName: string
    jobTitle?: string
    email?: string
    phone?: string
    address?: string
  }

  type Profile = {
    id: string
    accountId: string
    fullName: string
    jobTitle: string
    email: string
    phone: string
    address: string
    createdAt: string
    updatedAt: string
  }

  type TitleInput = {
    title: string
  }

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

  type JwtPayload = {
    account: {
      id: string
      email: string
    }
    iat: number
    exp: number
  }

  type Account = {
    id: string
    email: string
    isVerified: boolean
    createdAt: Date | string
    updatedAt: Date | string
  }

  type Resume = {
    id: string
    title: string
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
