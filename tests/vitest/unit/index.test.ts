import axiosInstance from '~/configs/axios'
import { describe, expect, test } from 'vitest'
import apiCall from '~/utils/api'
import { generateCreateAccountInput } from '../utils'

describe('API', () => {
  test('should be running and return status 200', async () => {
    const request = await axiosInstance.get('/')

    expect(request.status).toBe(200)
  })

  describe('Create Account', () => {
    test('should return status 200 and the AccountResponse object', async () => {
      const accountInput = generateCreateAccountInput()
      const { data, response } = await apiCall.createAccount(accountInput)

      expect(response.status).toBe(200)

      const { account } = data!

      expect(account.email).toBe(accountInput.email)
      // Wait for nodemailer to finish
    }, 10000)
  })

  describe('Login', () => {
    test('should return status 200 and the access token and the refresh token', async () => {
      const loginInput: LoginForm = {
        email: 'admin@test.com',
        password: 'admin',
      }

      const { response } = await apiCall.login(loginInput)

      expect(response.status).toBe(200)

      const cookies = response.headers['set-cookie']

      const regex = /(accessToken|refreshToken)/

      expect(cookies?.length).toBe(2)
      expect(cookies?.[0]).toMatch(regex)
      expect(cookies?.[1]).toMatch(regex)
    })
  })
})
