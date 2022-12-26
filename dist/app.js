const express = require('express')
const path = require('path')

const app = express()

// Serve static files
app.use(express.static(path.join(__dirname, 'public')))

// Handle requests for non-root paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Start the server
const port = process.env.PORT || 4001
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})