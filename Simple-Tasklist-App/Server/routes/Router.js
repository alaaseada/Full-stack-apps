const app = require('express')
const {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/tasks')
const router = app.Router()

router.route('/').get(getAllTasks).post(addTask)
router.route('/:id').patch(updateTask).delete(deleteTask)

module.exports = router
