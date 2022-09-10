// Utility Functions
const fetchMetadata = require('../utils/fetchMetaData')
const fetchRows = require('../utils/fetchRows')
const updateValue = require('../utils/updateValue')

// GET values from spreadsheet
const getSheet = async (req, res) => {
  const spreadsheetId = req.params.spreadsheet_id

  try {
    // Fetch metadata for spreadsheet
    const metadata = await fetchMetadata(spreadsheetId)
    const { sheets } = metadata // Array of sheets in spreadsheet
    
    let response = {}

    // Iterate through sheets and formulate response
    for (let index = 0; index < sheets.length; index++) {
      const currentSheet = sheets[index];
      const { title, sheetId } = currentSheet.properties;

      // Fetch rows for the current sheet
      const rows = await fetchRows(spreadsheetId, title)
      const { values } = rows.data // Array of row values in sheet

      // Formatting response
      let responseData = []
      
      values.forEach(row => {
        let responseRow = {}
  
        row.forEach((cell, index) => { responseRow[index] = cell })

        responseData.push(responseRow)
      })

      response[sheetId] = responseData
    }

    res.status(200).json(response)
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

// UPDATE values in spreadsheet
const updateSheet = async (req, res) => {
  // destructuring required elements from request body
  const spreadsheetId = req.body.spreadsheet_id
  const sheetId = req.body.sheet_id
  const rowIndex = req.body.row_number
  const columnIndex = req.body.column_number
  const value = req.body.value
  
  try {
    await updateValue(
      spreadsheetId,
      sheetId,
      rowIndex,
      columnIndex,
      value
    )

    res.status(200).json({ success: true })
  } catch (err) {
    res.status(401).json({ success: false, error: err.message })
  }
}

module.exports = {
  getSheet,
  updateSheet
}
