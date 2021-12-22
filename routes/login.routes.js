const app = require('express').Router()
const loginController = require('../controller/login.controller')

app.get('/login', loginController.login)

app.post('/handleSignin', loginController.handelSignin)

module.exports = app
