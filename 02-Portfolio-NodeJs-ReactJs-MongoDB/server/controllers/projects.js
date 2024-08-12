const Project = require('../models/project')

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
    res.status(200).json({ success: true, data: { projects } })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}

const getOneProject = async (req, res) => {
  try {
    const { id } = req.params
    const project = Project.findById(id)
    res.status(200).json({ success: true, data: { project } })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}

const addProject = async (req, res) => {
  try {
    new Project(req.body).save()
    res.status(201).json({
      success: true,
      data: { project: req.body, msg: 'Successfully added' },
    })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}

const updateProject = async (req, res) => {
  const { id: _id } = req.params
  await Project.findByIdAndUpdate(_id, req.body)
  try {
    res.status(200).json({
      success: true,
      data: { project: { _id }, msg: 'Successfully updated' },
    })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}

const deleteProject = async (req, res) => {
  const { id: _id } = req.params
  await Project.findByIdAndDelete(_id)
  try {
    res
      .status(200)
      .json({ success: true, data: { msg: 'Successfully deleted' } })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}

module.exports = {
  getAllProjects,
  getOneProject,
  addProject,
  updateProject,
  deleteProject,
}
