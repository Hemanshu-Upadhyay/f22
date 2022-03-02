const express = require('express')
const router = express.Router()
const Usercontroller = require('../controller/userSignupController')

router.get('/', (req, res) => {
    res.send('Customer Routes Woking')
})

router.post('/signup',Usercontroller.signup)
router.post('/signin',Usercontroller.signin)
router.get('/getUsers',Usercontroller.getUsers)

module.exports = router