const { check } = require('express-validator')

const validation = [
    check('name').matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    check('email').isEmail(),
    check('password').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
    check('confirmPassword').custom((value, { req }) => {
        //value is the input of the user
        if (req.body.password !== value) {
            return false
        }
        return true
    }),
]

module.exports = validation
