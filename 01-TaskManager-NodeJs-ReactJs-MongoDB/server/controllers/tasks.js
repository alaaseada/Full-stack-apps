const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    return res
      .status(200)
      .json({ success: true, data: tasks, msg: 'All tasks are here' })
  } catch (error) {
    return res.status(400).json({ success: false, msg: error })
  }
}
const getTask = async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.findById({ _id: id })
    return res
      .status(200)
      .json({ success: true, data: task, msg: `Get task with ID=${id}` })
  } catch (error) {
    return res.status(400).json({ success: false, msg: error })
  }
}
const insertTask = async (req, res) => {
  const { title } = req.body
  if (!title) {
    throw Error('Title is required')
  }
  const newTask = new Task({ title })
  await newTask.save()
  try {
    return res.status(201).json({
      success: true,
      data: req.body,
      msg: `Task inserted`,
    })
  } catch (error) {
    return res.status(400).json({ success: false, msg: error })
  }
}
const updateTask = async (req, res) => {
  const { id } = req.params
  try {
    const task = await Task.updateOne({ _id: id }, req.body)
    return res.status(200).json({
      success: true,
      data: req.body,
      msg: `Task updated`,
    })
  } catch (error) {
    return res.status(400).json({ success: false, msg: error })
  }
}
const deleteTask = async (req, res) => {
  const { id } = req.params
  try {
    await Task.deleteOne({ _id: id })
    return res
      .status(200)
      .json({ success: true, data: [], msg: `Task deleted` })
  } catch (error) {
    return res.status(400).json({ success: false, msg: error })
  }
}
module.exports = { getAllTasks, getTask, insertTask, updateTask, deleteTask }
