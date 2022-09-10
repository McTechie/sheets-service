const { google } = require('googleapis')

const auth = require('../models/authModel')

const fetchRows = async (spreadsheetId, title) => {
  const googleSheets = google.sheets({ version: 'v4', auth })

  if (!googleSheets) {
    throw new Error('Unable to access Google Sheets API')
  }

  const rows = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: title
  })

  if (!rows) {
    throw new Error(`Error fetching rows from spreadsheet: ${spreadsheetId}`)
  }

  return rows
}

module.exports = fetchRows
