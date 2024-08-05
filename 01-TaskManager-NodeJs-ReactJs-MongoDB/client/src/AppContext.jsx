import { useState, createContext, useContext } from 'react'
import customAxios from './customAxios'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const AppContext = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)

  const changeEditMode = (task) => {
    setIsEditMode(!isEditMode)
  }
  return (
    <GlobalContext.Provider
      value={{ isEditMode, changeEditMode, setTaskToEdit, taskToEdit }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export default AppContext
