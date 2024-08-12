const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})

const Skill = mongoose.model('Skill', schema)
module.exports = Skill
