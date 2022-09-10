const express = require('express')
const res = require('express/lib/response')

// Importing the Controller
const { loginUser } = require('../controllers/userController')

// Accessing the Express Router
const router = express.Router()

// Authenticate the user
router.get('/login', loginUser)

module.exports = router
