const app = require('express').Router()
const auth = require('../middleware/auth')
const noteModel = require('../model/notes.model')

app.get('/home', auth, async (req, res) => {
    let note = await noteModel.find({ userID: req.session.myID })
    //to find all the user notes from his ID
    res.render('home.ejs', { myID: req.session.myID, note })
})

app.post('/addNote', async (req, res) => {
    const { title, desc } = req.body
    await noteModel.insertMany({ userID: req.session.myID, title, desc })
    res.redirect('/home')
})

app.post('/delete', async (req, res) => {
    //await noteModel.findByIdAndDelete({ _id: req.params.id })
    //the normal way
    const { noteID } = req.body
    await noteModel.findByIdAndDelete({ _id: noteID })
    // to get the id from the Frontend message
    // the verification way
    res.redirect('/home')
})

app.post('/editNote', async (req, res) => {
    const { editID, title, desc } = req.body
    await noteModel.findByIdAndUpdate({ _id: editID }, { title, desc })
    res.redirect('/home')
})

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})

app.get('/', (req, res) => {
    res.redirect('/home')
})

module.exports = app
