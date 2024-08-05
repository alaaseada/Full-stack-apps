import { FaPen, FaDeleteLeft } from 'react-icons/fa6'
import { useGlobalContext } from './AppContext'
import { useDeleteTask } from './QueryHooks'

const Task = ({ task }) => {
  const { _id, title, isDone } = task
  const { changeEditMode, setTaskToEdit } = useGlobalContext()
  const { deleteTask } = useDeleteTask()

  const handleEdit = () => {
    changeEditMode()
    setTaskToEdit(task)
  }
  return (
    <div className="container">
      <p
        className="title"
        style={isDone ? { textDecoration: 'line-through' } : {}}
      >
        {title}
      </p>
      <button className="action-btn" onClick={handleEdit}>
        <FaPen />
      </button>
      <button className="action-btn" onClick={() => deleteTask({ _id })}>
        <FaDeleteLeft />
      </button>
    </div>
  )
}
export default Task
