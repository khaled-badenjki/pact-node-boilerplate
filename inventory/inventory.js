const express = require("express")

const app = express()

const port = process.env.PORT || 3000

app.get("/health", (req, res) => {
  res.json({
    health: "healthy"
  })
})

// in case no route was found, return 404
app.use((req, res) => {
  res.type("text/plain")
  res.status(404)
  res.send("404 - not found")
})

app.use((err, req, res, next) => {
  console.error(err.message)
  res.type("text/plain")
  res.status(500)
  res.send("500 - Server Error")
})

app.listen(port, () => console.log(
  `Express started on http://localhost:${port} ` +
  `press Ctrl-C to terminate.`))