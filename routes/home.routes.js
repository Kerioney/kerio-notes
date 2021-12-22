const app = require('express').Router()
const auth = require('../middleware/auth')
const homeController = require('../controller/home.controller')

app.get('/home', auth, homeController.home)

app.post('/addNote', homeController.addNote)

app.post('/delete', homeController.delete)

app.post('/editNote', homeController.editNote)

app.get('/logout', homeController.logout)

app.get('/', homeController.default)

app.get('*', homeController.notFound)

module.exports = app
