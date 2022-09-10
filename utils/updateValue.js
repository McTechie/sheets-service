const { google } = require('googleapis')

const auth = require('../models/authModel')
const fetchMetadata = require('./fetchMetaData')

const updateValue = async (spreadsheetId, sheetId, rowIndex, columnIndex, value) => {
  if (!spreadsheetId
    || !Number.isInteger(sheetId)
    || !Number.isSafeInteger(rowIndex)
    || !Number.isSafeInteger(columnIndex)
    || !value
  ) {
    throw new Error('Invalid request body' )
  }

  const googleSheets = google.sheets({ version: 'v4', auth })

  if (!googleSheets) {
    throw new Error('Unable to access Google Sheets API')
  }

  // Get sheet Title using sheet Id
  const metadata = await fetchMetadata(spreadsheetId)
  const { sheets } = metadata

  const sheet = sheets.find(sheet => sheet.properties.sheetId === sheetId)
  const { title } = sheet.properties

  // Update value in sheet
  const res = await googleSheets.spreadsheets.values.update({
    spreadsheetId,
    // Sheet title must be used here
    range: `${title}!R[${rowIndex}]C[${columnIndex}]`,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        [value]
      ]
    }
  })

  if (!res) {
    throw new Error(`Error updating value in spreadsheet: ${spreadsheetId}`)
  }

  return true
}

module.exports = updateValue
