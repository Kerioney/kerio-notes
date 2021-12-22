const userModel = require('../model/users.model')
const bcrypt = require('bcrypt')

module.exports.login = (req, res) => {
    if (req.session.myID) {
        res.redirect('/home')
    } else {
        res.render('login.ejs', {
            exists: req.flash('exists'),
            wrong: req.flash('wrong'),
            myID: null,
        })
    }
}

module.exports.handelSignin = async (req, res) => {
    const { email, password } = req.body

    let data = await userModel.findOne({ email })

    if (data != null) {
        let match = await bcrypt.compare(password, data.password)

        if (match) {
            req.session.myID = data._id
            req.session.myName = data.name
            req.session.isLogIn = true
            var hour = 36000000
            req.session.cookie.maxAge = hour
            res.redirect('/home')
        } else {
            // console.log('Password is Invalid')
            req.flash('wrong', true)
            res.redirect('/login')
        }
    } else {
        // console.log("Email doesn't Exist")
        req.flash('exists', true)
        res.redirect('/login')
    }
}
