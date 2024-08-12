const express = require('express')
const {
  getAllSkills,
  addSkill,
  getOneSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/Skills')
const Router = express.Router()

Router.route('/').get(getAllSkills).post(addSkill)
Router.route('/:id').get(getOneSkill).patch(updateSkill).delete(deleteSkill)

module.exports = Router
