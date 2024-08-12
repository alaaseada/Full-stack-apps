const Skill = require('../models/skill')

const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find()
    res.status(200).json({ success: true, data: { skills } })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}

const getOneSkill = async (req, res) => {
  try {
    const { id } = req.params
    const skill = await Skill.findById(id)
    res.status(200).json({ success: true, data: { skill } })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}

const addSkill = async (req, res) => {
  try {
    await new Skill(req.body).save()
    res
      .status(201)
      .json({
        success: true,
        data: { skill: req.body, msg: 'Successfully added' },
      })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}

const updateSkill = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: { Skill: {}, msg: 'Successfully updated' },
    })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}

const deleteSkill = async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, data: { msg: 'Successfully deleted' } })
  } catch (error) {
    res.status(400).json({ success: false, msg: error })
  }
}

module.exports = {
  getAllSkills,
  getOneSkill,
  addSkill,
  updateSkill,
  deleteSkill,
}
