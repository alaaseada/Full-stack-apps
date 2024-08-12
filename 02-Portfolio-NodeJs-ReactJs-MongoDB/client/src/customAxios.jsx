import axios from 'axios'

export const portfolioAxios = axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
})
