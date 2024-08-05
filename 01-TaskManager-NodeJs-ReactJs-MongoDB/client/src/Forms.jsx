import { useGlobalContext } from './AppContext'
import { useInsertTask, useUpdateTask } from './QueryHooks'

export const InsertForm = () => {
  const { insertTask, data } = useInsertTask()

  const handleSubmit = (e) => {
    e.preventDefault()
    insertTask(
      { title: e.target.elements[0].value },
      {
        onSuccess: () => {
          e.target.reset()
        },
      }
    )
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            className="form-input special"
            name="title"
            id="title"
            placeholder="Title here"
          />
          <button className="btn adjacent" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export const EditForm = () => {
  const { updateTask, data } = useUpdateTask()

  const {
    changeEditMode,
    taskToEdit: { _id, title, isDone },
  } = useGlobalContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    updateTask({
      _id,
      title: e.target.elements[0].value,
      isDone: e.target.elements[1].checked,
    })
    changeEditMode()
  }
  return (
    <div className="container">
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="id">ID: </label>
          <p id="id" name="id">
            {_id}
          </p>
        </div>
        <div className="form-row">
          <label htmlFor="title">Title: </label>
          <input
            className="form-input"
            type="text"
            name="title"
            id="title"
            defaultValue={title}
          />
        </div>
        <div className="form-row">
          <input
            type="checkbox"
            name="done"
            id="done"
            defaultChecked={isDone}
          />
          <label htmlFor="done">Completed</label>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn">
            Save Changes
          </button>
          <button type="button" className="btn" onClick={changeEditMode}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
