import axios from '~/configs/axios'
import { describe, expect, test } from 'vitest'

describe('API', () => {
  test('should be running and return status 200', async () => {
    const request = await axios({
      method: 'get',
      url: '/',
    })

    expect(request.status).toBe(200)
  })
})
