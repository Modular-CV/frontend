import i18n from '~/configs/i18n'

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const errorHandler = async (errorCode: ErrorCodeKey) => {
  const t = await i18n.t

  if (!t) throw new Error('i18n not initialized')

  switch (errorCode) {
    case 'AUTH-003': {
      return t('error.invalidAuth')
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
