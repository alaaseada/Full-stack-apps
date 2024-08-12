import axios from 'axios'

export const portfolioAxios = axios.create({
  baseURL: 'https://alaa-webdev-portfolio-api.netlify.app/api/v1',
})
