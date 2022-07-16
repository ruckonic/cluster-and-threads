const { Appsignal } = require('@appsignal/nodejs')

const appsignal = new Appsignal({
  active: true,
  name: 'Test',
  apiKey: '005b9e64-569e-4a18-af1d-78cb8254cdf9',
})

module.exports = { appsignal }
