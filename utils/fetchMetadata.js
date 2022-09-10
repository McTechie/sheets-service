const { google } = require('googleapis')

const auth = require('../models/authModel')

const fetchMetadata = async (spreadsheetId) => {
  const googleSheets = google.sheets({ version: 'v4', auth })

  if (!googleSheets) {
    throw new Error('Unable to access Google Sheets API')
  }

  const metaData = await googleSheets.spreadsheets.get({
    spreadsheetId
  })
  
  if (!metaData) {
    throw new Error(`Error fetching metadata from spreadsheet: ${spreadsheetId}`)
  }

  return metaData.data
}

module.exports = fetchMetadata
