const app = require('express').Router()
const userModel = require('../model/users.model')
const { validationResult } = require('express-validator')
const validation = require('../validation/register.validation')
const bcrypt = require('bcrypt')

app.get('/register', (req, res) => {
    res.render('register.ejs', {
        errors: req.flash('errors'),
        oldInput: req.flash('oldInput')[0],
        exists: req.flash('exists'),
        myID: null,
    })
    //we make [0] because its an array and we need the first object of the array
    //to send the flash to the ejs with the name errors
})

app.post('/handleSignUp', validation, async (req, res) => {
    const errors = validationResult(req)
    // console.log(errors.array())
    // console.log(errors.isEmpty())

    const { name, email, password } = req.body

    if (errors.isEmpty()) {
        let user = await userModel.findOne({ email })
        if (user) {
            req.flash('exists', true)
            res.redirect('/register')
            //to show if the email is already exist
            //we insert the value in the flash and get it back to the render then to the ejs
        } else {
            bcrypt.hash(password, 7, async (err, hash) => {
                await userModel.insertMany({
                    name,
                    email,
                    password: hash,
                })
                res.redirect('/login')
            })
        }
    } else {
        req.flash('errors', errors.array())
        //to insert the error in cup(flash)
        req.flash('oldInput', { name, email, password })
        res.redirect('/register')
    }
})

app.get('/handleSignUp', (req, res) => {
    res.redirect('/register')
})

module.exports = app
