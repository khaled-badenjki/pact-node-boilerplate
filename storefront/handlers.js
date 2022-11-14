const request = require('superagent')
const inventoryURL = process.env.API_URL || 'http://localhost:3000'

const ping = () => {
  return request
    .get(`${inventoryURL}/health`)
    .then((res) => res.body.health === 'healthy')
}

module.exports = {
  ping
}