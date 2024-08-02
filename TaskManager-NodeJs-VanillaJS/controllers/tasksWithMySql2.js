const { connectToDBMySQL2 } = require('../db/dbConnectMySQL2')
const {
  GET_ALL,
  GET_ONE_BY_ID,
  INSERT_TASK,
  DELETE_ONE,
  DELETE_ALL,
  UPDATE_TASK,
} = require('../db/tasksQueries')

// Get the connection
let connection
connectToDBMySQL2()
  .then((pool) => (connection = pool))
  .catch((err) => console.log('an error occured', err))

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const [results] = await connection.execute(GET_ALL)
    if (!results.length)
      return res
        .status(200)
        .json({ success: true, msg: `No tasks has been added yet` })
    return res.status(200).json({ success: true, data: results })
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, msg: `An error occured ${err}` })
  }
}

// Get task by ID
const getOneTask = async (req, res) => {
  const { id } = req.params
  try {
    const [results] = await connection.execute(GET_ONE_BY_ID, [id])
    return res.status(200).json({ success: true, data: results })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `An error occured ${error}` })
  }
}

// Insert a new task
const insertTask = async (req, res) => {
  const { title, isDone } = req.body
  if (!title) {
    return res
      .status(400)
      .json({ success: false, msg: `Please provide a title` })
  }
  try {
    const [results] = await connection.execute(INSERT_TASK, [title, isDone])
    return res.status(201).json({
      success: true,
      msg: `Task has been successfully inserted with ID=${results.insertId}`,
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
  const { title, isDone } = req.body
  try {
    const [results] = await connection.execute(UPDATE_TASK, [title, isDone, id])
    return res.status(200).json({
      success: true,
      msg: `Task has been successfully updated`,
      data: results,
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
    const [results] = await connection.execute(DELETE_ONE, [id])
    return res.status(200).json({
      success: true,
      msg: `Task has been successfully deleted`,
      data: results,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: `An error occured ${error}` })
  }
}

const deleteAllTasks = async (req, res) => {
  try {
    const [results] = await connection.execute(DELETE_ALL)
    return res.status(200).json({
      success: true,
      msg: `Tasks have been successfully deleted`,
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
