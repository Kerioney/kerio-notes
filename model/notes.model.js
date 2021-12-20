const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    //ref to connect two DB with each other by insert the name of the db(user)
    title: String,
    desc: String,
    //the type of any id (not string but ^^)
})

const noteModel = mongoose.model('note', noteSchema)

module.exports = noteModel
