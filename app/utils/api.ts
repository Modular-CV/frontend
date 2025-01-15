import axios from '~/configs/axios'

export const createAccount = () => {
  axios({
    method: 'post',
    url: '/',
  })
}
