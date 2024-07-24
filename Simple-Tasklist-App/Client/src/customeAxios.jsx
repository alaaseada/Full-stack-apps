import axios from 'axios'

const customAxios = axios.create({
  baseURL: 'http://localhost:5000/api/v1/tasks',
})

export default customAxios
