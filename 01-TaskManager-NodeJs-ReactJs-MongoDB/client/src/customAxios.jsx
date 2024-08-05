import axios from 'axios'

const customAxios = axios.create({
  baseURL: 'https://alaaseada-taskapi.netlify.app/api/v1/tasks',
})

export default customAxios
