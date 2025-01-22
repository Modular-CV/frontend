export const ErrorCode = {
  'AUTH-001': 'Access token is missing',
  'AUTH-002': 'Access token is invalid',
  'AUTH-003': 'Invalid email or password',
  'AUTH-004': 'Session account is invalid',
  'AUTH-005': 'Access Token expired',
  'AUTH-006': 'Refresh token is missing',
  'AUTH-007': 'Refresh token is invalid',
  'AUTH-008': 'Refresh token expired',
  'VAL-001': 'Request body is missing required fields or is invalid',
  'VAL-002': 'The requested resource does not exist',
  'ACC-001': 'Email is already registered',
  'ACC-002': 'Email could not be sent',
  'VER-001': 'Verification token is invalid, expired or used',
} as const

export const Language = {
  'en-US': 'English (US)',
  'pt-BR': 'Português (Brasil)',
} as const

export const ButtonStyle = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  OUTLINE: 'outline',
  ERROR: 'error',
  DISABLED: 'disabled',
  SUCCESS: 'success',
} as const

export const InputStyle = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  ERROR: 'error',
  DISABLED: 'disabled',
  SUCCESS: 'success',
} as const
