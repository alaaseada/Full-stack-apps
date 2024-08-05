const tasksQueries = {
  GET_ALL: 'SELECT * FROM tasks',
  GET_ONE_BY_ID: 'SELECT * FROM tasks WHERE `id`=?',
  INSERT_TASK: 'INSERT INTO tasks (title, isDone) VALUES (?,?)',
  UPDATE_TASK: 'UPDATE tasks SET `title`= ?, `isDone`=? WHERE `id`=?',
  DELETE_ONE: 'DELETE FROM tasks WHERE `id`=?',
  DELETE_ALL: 'DELETE FROM tasks',
}

module.exports = tasksQueries
