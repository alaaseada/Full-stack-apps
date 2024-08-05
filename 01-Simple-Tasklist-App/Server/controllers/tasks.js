const { writeFile, readFile } = require('fs').promises
const path = require('path')
const { nanoid } = require('nanoid')
const dataFile = path.resolve(path.dirname(__dirname), 'data.json')

const readTasksFromFile = async () => {
  let data = await readFile(dataFile, { encoding: 'utf-8' })
  if (!data.length) {
    return []
  } else {
    return JSON.parse(data)
  }
}

const writeDataToFile = async (data) => {
  await writeFile(dataFile, JSON.stringify(data))
}

const addTask = async (req, res) => {
  const { title } = req.body
  if (!title) {
    return res.status(400).json({ msg: 'Please provide a title' })
  }
  const newTask = { id: nanoid(), title: title, isDone: false }
  const taskList = await readTasksFromFile()
  await writeDataToFile([...taskList, newTask])
  res.status(201).json({ data: newTask })
}

const getAllTasks = async (req, res) => {
  const taskList = await readTasksFromFile()
  if (!taskList.length) {
    return res.status(200).json({ msg: 'No tasks has been added yet :)' })
  }
  return res.status(200).json({ data: { taskList } })
}

const updateTask = async (req, res) => {
  const { id } = req.params
  const taskList = await readTasksFromFile()
  let updatedTaskList = taskList.map((task) => {
    if (task.id === id) {
      return { ...task, ...req.body }
    }
    return task
  })
  await writeDataToFile(updatedTaskList)
  res.status(200).json({ msg: 'task updated' })
}

const deleteTask = async (req, res) => {
  const { id } = req.params
  const taskList = await readTasksFromFile()
  let updatedTaskList = taskList.filter((task) => task.id !== id)
  await writeDataToFile(updatedTaskList)
  res.status(200).json({ msg: 'task deleted' })
}

module.exports = {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
}
