import server from './server.js'

const PORT = process.env.PORT

server.listen(parseInt(PORT), 'localhost', () => {
  console.log(`[${process.pid}] Server is running on port ${PORT}`)
})
