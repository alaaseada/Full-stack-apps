const Task = require('../models/Task')
const asyncWrapper = require('../middleware/asyncWrapper')
const { createCustomError } = require('../errors/customError')

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})
  return res
    .status(200)
    .json({ success: true, data: tasks, msg: 'All tasks are here' })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  const task = await Task.findById({ _id: id })
  if (!task) {
    return next(createCustomError(`No task has been found with id: ${id}`, 404))
  }
  return res
    .status(200)
    .json({ success: true, data: task, msg: `Get task with ID=${id}` })
})

const insertTask = asyncWrapper(async (req, res) => {
  const newTask = new Task(req.body)
  await newTask.save()
  return res.status(201).json({
    success: true,
    data: req.body,
    msg: `Task inserted`,
  })
})

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  const task = await Task.updateOne({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return next(createCustomError(`No task has been found with id: ${id}`, 404))
  }
  return res.status(200).json({
    success: true,
    data: req.body,
    msg: `Task updated`,
  })
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  const task = await Task.deleteOne({ _id: id })
  if (!task) {
    return next(createCustomError(`No task has been found with id: ${id}`, 404))
  }
  return res.status(200).json({ success: true, data: [], msg: `Task deleted` })
})

module.exports = { getAllTasks, getTask, insertTask, updateTask, deleteTask }
