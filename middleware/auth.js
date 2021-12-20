module.exports = (req, res, next) => {
    if (req.session.myID) {
        next()
        //next to make it move to the rest of the api
    } else {
        res.redirect('/login')
    }
}
