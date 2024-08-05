import { useGetAllTasks } from './QueryHooks'
import Task from './Task'

const TaskList = () => {
  const { isPending, data, isError, error } = useGetAllTasks()
  if (isPending) {
    return <div className="loading"></div>
  }
  if (isError) {
    return <div className="error">Error..</div>
  }
  return (
    <>
      {!data?.length ? (
        <p className="center">No Tasks has been added yet</p>
      ) : (
        data?.map((task) => {
          return <Task key={task._id} task={task} />
        })
      )}
    </>
  )
}
export default TaskList
