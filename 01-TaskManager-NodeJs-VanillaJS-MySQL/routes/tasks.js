const express = require('express')
const {
  getAllTasks,
  insertTask,
  getOneTask,
  deleteTask,
  deleteAllTasks,
  updateTask,
} = require('../controllers/tasksWithKnex')
const Router = express.Router()

Router.route('/').get(getAllTasks).post(insertTask).delete(deleteAllTasks)
Router.route('/:id')
  .get(getOneTask)
  .delete(deleteTask)
  .patch(updateTask)
  .put(updateTask)
module.exports = Router
