# Initial Setup

> Make sure to follow the checklist in order to correctly test the backend service

- [ ] 1. Visit GCP Dashboard
- [ ] 2. Create a new project and Enable Google Sheets API for that project
- [ ] 3. Create OAuth2.0 credentials (Client ID, Client Secret, Redirect URI)
- [ ] 4. Install project dependencies (node_modules) by running `npm install` in the root directory
- [ ] 5. Rename `.env.example` file in the project root directory to `.env` and fill in the values
- [ ] 6. Create a Test Spreadsheet and fill in some values
- [ ] 7. Hit the API endpoints of the service to see the desired results

#### The following endpoints are available

- `/login`
  - Sends a request to Google OAuth2.0 API to get the authorization code and responds with the User's JSON Web Token (JWT)
- `/spreadsheet/:spreadsheet_id`
  - Fetches the spreadsheet with the given ID and responds with the spreadsheet's data in the given format:

    ```json
    {
      sheet_id_1: [
        {
          0: value_column_0_row_0,
          1: value_column_1_row_0,
          2: value_column_2_row_0,
        },
        {
          0: value_column_0_row_1,
          1: value_column_1_row_1,
          2: value_column_2_row_1,
        },
        ... // number of rows in the sheet
      ],
      ... // number of sheets
    }
    ```

- `/spreadsheet/update`
  - Updates the spreadsheet with the following Request Body
    ```json
    {
      "spreadsheet_id": "spreadsheet_id",
      "sheet_id": "sheet_id",
      "row": "row_number",
      "column": "column_number",
      "value": "value" // string, number, boolean
    }
    ```
