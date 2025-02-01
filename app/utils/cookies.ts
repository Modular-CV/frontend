import { createCookie } from 'react-router'

export const sessionCookie = createCookie('session', {
  sameSite: 'strict',
})
