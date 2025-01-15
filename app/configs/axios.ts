import _axios from 'axios'

const axios = _axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export default axios
