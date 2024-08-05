const { connectToDBMySQLKnex } = require('../db/dbConnectKnex')

// Get the knex
let knex = connectToDBMySQLKnex()

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const results = await knex('tasks')
    if (!results.length)
      return res
        .status(200)
        .json({ success: true, msg: `No tasks has been added yet` })
    return res.status(200).json({ success: true, data: results })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `An error occured ${error}` })
  }
}

// Get task by ID
const getOneTask = async (req, res) => {
  const { id } = req.params
  try {
    const results = await knex('tasks').where({ id })
    return res.status(200).json({ success: true, data: results })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `An error occured ${error}` })
  }
}

// Insert a new task
const insertTask = async (req, res) => {
  const { title } = req.body
  if (!title) {
    return res
      .status(400)
      .json({ success: false, msg: `Please provide a title` })
  }
  try {
    const [new_id] = await knex('tasks').insert(req.body)
    return res.status(201).json({
      success: true,
      msg: `Task has been successfully inserted with ID=${new_id}`,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `An error occured ${error}` })
  }
}

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params
  try {
    const count = await knex('tasks').where({ id }).update(req.body)
    return res.status(200).json({
      success: true,
      msg: `Task has been successfully updated`,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `An error occured ${error}` })
  }
}

const deleteTask = async (req, res) => {
  const { id } = req.params
  try {
    await knex('tasks').where({ id }).delete()
    return res.status(200).json({
      success: true,
      msg: `Task has been successfully deleted`,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `An error occured ${error}` })
  }
}

const deleteAllTasks = async (req, res) => {
  try {
    const count = await knex('tasks').delete()
    return res.status(200).json({
      success: true,
      msg: `${count} Tasks have been successfully deleted`,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `An error occured ${error}` })
  }
}

module.exports = {
  getAllTasks,
  getOneTask,
  insertTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
}
