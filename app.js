// Required Imports
require('dotenv').config()
const express = require('express')
// const passport = require('passport')
const userRoutes = require('./routes/users')
const sheetRoutes = require('./routes/sheets')
const pathRequestLogger = require('./middleware/pathRequestLogger')

// Express App
const app = express()

// Middleware
app.use(express.json())
app.use(pathRequestLogger) // Development only

// Welcome Route
app.get('/', (req, res) => {
  res.send('Welcome to McTechie\'s Google Sheets Utilize App')
})

// Routes
app.use(userRoutes)
app.use(sheetRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => 
  console.log(`Service is up and running on port: ${PORT}`)
)
