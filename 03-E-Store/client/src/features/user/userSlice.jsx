import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const getStoredTheme = () => {
  const storedTheme = localStorage.getItem('theme') || 'winter'
  document.querySelector('html').setAttribute('data-theme', storedTheme)
  return storedTheme
}

const getStoredUser = () => {
  let storedUser = localStorage.getItem('user') || null
  if (storedUser) storedUser = JSON.parse(storedUser)
  return storedUser
}

const initialState = {
  user: getStoredUser(),
  theme: getStoredTheme(),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload))
      toast.success(`Welcome ${payload.username}`)
    },
    register: (state, { payload }) => {
      console.log('register')
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'winter' ? 'dracula' : 'winter'
      document.querySelector('html').setAttribute('data-theme', state.theme)
      localStorage.setItem('theme', state.theme)
    },
  },
})

export const { login, register, logout, toggleTheme } = userSlice.actions
export default userSlice.reducer
