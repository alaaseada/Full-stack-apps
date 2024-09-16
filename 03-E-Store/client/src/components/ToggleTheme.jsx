import { useEffect, useState } from 'react'
import { sun, moon } from '../assets/icons'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../features/user/userSlice'

const ToggleTheme = () => {
  const dispatch = useDispatch()

  return (
    <label className="swap swap-rotate">
      <input type="checkbox" onChange={() => dispatch(toggleTheme())} />
      {moon}
      {sun}
    </label>
  )
}
export default ToggleTheme
