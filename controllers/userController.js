const open = require('open')
const auth = require('../models/authModel')

const loginUser = async (req, res) => {
  try {
    // Generate authorization URL for user request
    const authorizationUrl = auth.generateAuthUrl({
      access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
      scope: 'https://www.googleapis.com/auth/spreadsheets'
    })

    // Let user authorize themselves
    if (!req.query.code) {
      open(authorizationUrl, { wait: false }).then(cp => cp.unref())
    }

    // Get tokens from code generated after successful user authorization
    const { tokens } = await auth.getToken(req.query.code)
    auth.setCredentials(tokens)
    res.status(200).json({ token: tokens.access_token })
  } catch (err) {
    res.status(401).json({ error: 'You are not authorized to access this resource' })
  }
}

module.exports = {
  loginUser
}
