const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  url: String,
  github: {
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

const Project = mongoose.model('Project', schema)
module.exports = Project
