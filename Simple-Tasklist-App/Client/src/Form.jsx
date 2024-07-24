import { useAddTask } from './cutomHooks'

const Form = () => {
  const { addTask } = useAddTask()

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    addTask(formData, { onSuccess: () => form.reset() })
  }
  return (
    <form name="task_bud" onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input type="text " className="form-input" name="title" />
        <button type="submit" className="btn">
          add task
        </button>
      </div>
    </form>
  )
}
export default Form
