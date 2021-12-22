const noteModel = require('../model/notes.model')

module.exports.home = async (req, res) => {
    let note = await noteModel.find({ userID: req.session.myID })
    //to find all the user notes from his ID
    res.render('home.ejs', { myID: req.session.myID, note })
}

module.exports.addNote = async (req, res) => {
    const { title, desc } = req.body
    await noteModel.insertMany({ userID: req.session.myID, title, desc })
    res.redirect('/home')
}

module.exports.delete = async (req, res) => {
    //await noteModel.findByIdAndDelete({ _id: req.params.id })
    //the normal way
    const { noteID } = req.body
    await noteModel.findByIdAndDelete({ _id: noteID })
    // to get the id from the Frontend message
    // the verification way
    res.redirect('/home')
}

module.exports.editNote = async (req, res) => {
    const { editID, title, desc } = req.body
    await noteModel.findByIdAndUpdate({ _id: editID }, { title, desc })
    res.redirect('/home')
}

module.exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}

module.exports.default = (req, res) => {
    res.redirect('/home')
}

module.exports.notFound = (req, res) => {
    res.send('404 Page Not Found')
}
