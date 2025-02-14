import i18n from '~/configs/i18n'
import apiCall from './api'

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const errorHandler = async (errorCode: ErrorCodeKey) => {
  const t = await i18n.t

  if (!t) throw new Error('i18n not initialized')

  switch (errorCode) {
    case 'AUTH-001': {
      return t('error.accessTokenMissing')
    }
    case 'AUTH-003': {
      return t('error.invalidAuth')
    }
    case 'AUTH-007': {
      return t('error.invalidRefreshToken')
    }
    default: {
      return `${t('error.somethingWrong')} / Error code: ${errorCode}`
    }
  }
}

export const sleep = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

/**
 * Retrieves the access and refresh tokens.
 * If the access token is expired or invalid, this method will use the current refresh token to attempt to obtain new tokens.
 *
 * - When used in loaders or server action, `set-cookie` should be applied if tokens are refreshed.
 * - When used in client action, `set-cookie` is not necessary, as the browser will handle cookie creation.
 */
export const getTokens = async (headers: Headers) => {
  const cookies = new Map<string, string>()
  let setCookie: string[] | undefined
  let error: ErrorCodeKey | undefined

  headers
    .get('cookie')
    ?.split('; ')
    .forEach((cookie) => {
      const [key, value] = cookie.split('=')
      if (['accessToken', 'refreshToken'].includes(key)) cookies.set(key, value)
    })

  let accessToken = cookies.get('accessToken')
  let refreshToken = cookies.get('refreshToken')

  if (!isTokenValid(accessToken) && refreshToken) {
    const {
      response,
      data,
      error: responseError,
    } = await apiCall.refreshSession(refreshToken)

    error = responseError

    accessToken = data?.tokens.accessToken
    refreshToken = data?.tokens.refreshToken

    setCookie = response.headers['set-cookie']
  } else if (!refreshToken) error = 'AUTH-006'

  const get = (cookie: string) => {
    return cookies.get(cookie)
  }

  const accessTokenPayload = getTokenPayload(accessToken)

  return {
    get,
    accessToken,
    refreshToken,
    setCookie,
    accessTokenPayload,
    error,
  }
}

const getTokenPayload = (token?: string) => {
  if (!token) return

  const data = token.split('.')[1]

  if (!data) return

  const payload = JSON.parse(atob(data)) as JwtPayload

  return payload
}

const isTokenValid = (token?: string): boolean => {
  const payload = getTokenPayload(token)

  if (!payload) return false

  const expiry = payload.exp * 1000

  const isExpired = Date.now() >= expiry

  return !isExpired
}
