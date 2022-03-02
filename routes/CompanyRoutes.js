const express = require('express')
const router = express.Router()
const CompanyController = require('../controller/shopSignupContoller')

router.get('/', (req, res) => {
    res.send('Company Routes Woking')
})

router.post('/signup',CompanyController.CompanySignUp)
router.post('/signin',CompanyController.CompanySignIn)
router.get('/getCompanies',CompanyController.getCompanies)

module.exports = router