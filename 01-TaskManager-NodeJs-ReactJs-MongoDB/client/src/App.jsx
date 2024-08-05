import { InsertForm, EditForm } from './Forms'
import TaskList from './TaskList'
import { useGlobalContext } from './AppContext'

function App() {
  const { isEditMode } = useGlobalContext()
  return (
    <main>
      <header>
        <h1>Task Manager</h1>
      </header>
      {isEditMode ? (
        <EditForm />
      ) : (
        <>
          <InsertForm />
          <TaskList />
        </>
      )}
    </main>
  )
}

export default App
