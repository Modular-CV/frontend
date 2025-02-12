import type { AxiosResponse } from 'axios'
import axiosInstance from '~/configs/axios'

const responseHandler = <Property extends Record<string, unknown> | undefined>(
  response: AxiosResponse<ApiResponse<Property>>,
) => {
  return {
    data: response.data.data,
    status: response.data.status,
    error: response.data.error,
    response,
  }
}

const login = async (data: Partial<LoginForm>) => {
  const response = await axiosInstance.post<
    ApiResponse<{ tokens: SessionTokens }>
  >('/sessions', data)
  return responseHandler(response)
}

const mySession = async (accessToken?: string) => {
  const response = await axiosInstance.get<
    ApiResponse<{ jwtPayload: JwtPayload }>
  >(
    '/sessions/my',
    accessToken
      ? { headers: { Authorization: `bearer ${accessToken}` } }
      : undefined,
  )
  return responseHandler(response)
}

const refreshSession = async (refreshToken?: string) => {
  const response = await axiosInstance.post<
    ApiResponse<{ tokens: SessionTokens }>
  >(
    '/sessions/my/refresh',
    {},
    refreshToken
      ? { headers: { Authorization: `bearer ${refreshToken}` } }
      : undefined,
  )
  return responseHandler(response)
}

const logout = async () => {
  const response = await axiosInstance.delete<ApiResponse>('/sessions/my')
  return responseHandler(response)
}

const createAccount = async (createAccountInput: CreateAccountForm) => {
  const response = await axiosInstance.post<ApiResponse<{ account: Account }>>(
    '/accounts',
    createAccountInput,
  )
  return responseHandler(response)
}

const getMyResumes = async (accessToken?: string) => {
  const response = await axiosInstance.get<ApiResponse<{ resumes: Resume[] }>>(
    '/my/resumes',
    { headers: { Authorization: `Bearer ${accessToken}` } },
  )
  return responseHandler(response)
}

const postTitle = async (data: Partial<TitleInput>, accessToken?: string) => {
  const response = await axiosInstance.post<ApiResponse<{ resume: Resume }>>(
    '/my/resumes',
    data,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  )
  return responseHandler(response)
}

const apiCall = {
  createAccount,
  mySession,
  login,
  logout,
  refreshSession,
  getMyResumes,
  postTitle,
}

export default apiCall
