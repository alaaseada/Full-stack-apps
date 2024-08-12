const express = require('express')
const {
  getAllProjects,
  addProject,
  getOneProject,
  updateProject,
  deleteProject,
} = require('../controllers/projects')
const Router = express.Router()

Router.route('/').get(getAllProjects).post(addProject)
Router.route('/:id')
  .get(getOneProject)
  .patch(updateProject)
  .delete(deleteProject)

module.exports = Router
