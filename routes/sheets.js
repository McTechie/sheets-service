const express = require('express')

// Importing Controllers
const {
  getSheet,
  updateSheet
} = require('../controllers/sheetController')

// Accessing the Express Router
const router = express.Router()

// Fetch data from a spreadhseet
router.get('/spreadsheet/:spreadsheet_id', getSheet)

// Update data in a spreadhseet
router.post('/spreadsheet/update', updateSheet)

module.exports = router
