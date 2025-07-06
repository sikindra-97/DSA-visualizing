import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://dsa-visualizing-3.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosClient
