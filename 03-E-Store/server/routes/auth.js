const express = require('express')
const Router = express.Router()
const { loginUser, registerUser, getUserById } = require('../controllers/auth')

Router.route('/login').post(loginUser)
Router.route('/register').post(registerUser)
Router.route('/:_id').get(getUserById)

module.exports = Router
