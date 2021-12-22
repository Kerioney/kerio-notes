const app = require('express').Router()
const validation = require('../validation/register.validation')
const registerController = require('../controller/register.controller')

app.get('/register', registerController.register)

app.post('/handleSignUp', validation, registerController.handleSignUp)

app.get('/handleSignUp', registerController.getHandleSignUp)

module.exports = app
