const express = require('express')
const { ping } = require('./storefront')
const app = express()

const port = process.env.PORT || 3001

app.get("/health", (req, res) => {
  ping().then((isHealthy) => {
    res.json({
      health: isHealthy ? 'healthy' : 'unhealthy'
    })
  })
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port} ` +
  `press Ctrl-C to terminate.`))