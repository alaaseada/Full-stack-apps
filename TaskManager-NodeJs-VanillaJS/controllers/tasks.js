const { con } = require('../db/dbConnect')

const getAllTasks = (req, res) => {
  con.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, msg: `An error occured ${err}` })
    }
    if (!results.length)
      return res
        .status(200)
        .json({ success: true, msg: `No tasks has been added yet` })
    return res.status(200).json({ success: true, data: results })
  })
}

const getOneTask = (req, res) => {
  const { id } = req.params
  if (!id)
    return res.status(400).json({ success: false, msg: `No ID provided.` })
  con.query(`SELECT * FROM tasks WHERE id=${id}`, (err, results) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, msg: `An error occured ${err}` })
    }
    return res.status(200).json({ success: true, data: results })
  })
}

const insertTask = (req, res) => {
  const { title, isDone } = req.body
  con.query(
    `INSERT INTO tasks (title, isDone) values ('${title}', ${isDone})`,
    (err, results) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, msg: `An error occured ${err}` })
      }
      return res.status(201).json({
        success: true,
        msg: `Task has been successfully inserted with ID=${results.insertId}`,
      })
    }
  )
}

const updateTask = (req, res) => {
  const { id } = req.params
  const { title, isDone } = req.body
  let valuesToUpdate = []
  if (title) valuesToUpdate.push(`title="${title}"`)
  if (isDone != undefined) valuesToUpdate.push(`isDone=${isDone}`)

  con.query(
    `UPDATE tasks set ${valuesToUpdate} WHERE id=${id}`,
    (err, results) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, msg: `An error occured ${err}` })
      }
      return res.status(200).json({
        success: true,
        msg: `Task has been successfully updated`,
        data: results,
      })
    }
  )
}

const deleteTask = (req, res) => {
  const { id } = req.params
  con.query(`DELETE * FROM tasks WHERE id=${id}`, (err, results) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, msg: `An error occured ${err}` })
    }
    return res.status(200).json({
      success: true,
      msg: `Task has been successfully deleted`,
      data: results,
    })
  })
}

const deleteAllTasks = (req, res) => {
  con.query('DELETE * FROM tasks', (err, results) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, msg: `An error occured ${err}` })
    }
    return res.status(200).json({
      success: true,
      msg: `Tasks have been successfully deleted`,
    })
  })
}

module.exports = {
  getAllTasks,
  getOneTask,
  insertTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
}
