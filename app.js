const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const favicon = require('serve-favicon')

app.use(flash())

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store,
    })
)
app.use(favicon(path.join(__dirname, 'public', 'icon.ico')))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(require('./routes/home.routes'))
app.use(require('./routes/login.routes'))
app.use(require('./routes/register.routes'))

app.get('*', (req, res) => {
    res.send('404 Page Not Found')
})

const store = new MongoDBStore({
    uri: 'mongodb+srv://admin:admin@projects.dqvmv.mongodb.net/Project1',
    collection: 'mySessions',
})
mongoose.connect(
    'mongodb+srv://admin:admin@projects.dqvmv.mongodb.net/Project1'
)

app.listen(process.env.PORT || port, () => console.log(`Server is running....`))
