import http from 'node:http'

const PORT = process.env.PORT

const routes = {
  /**
   * Print a hello world
   * @param {http.IncomingMessage} req 
   * @param {http.ServerResponse} res 
   */
  GET(req, res) {
    res.writeHead(200)
    res.write('Hello world')
    res.end()
  }
}

const server = http.createServer((req, res) => {
  process.stdout.write(`[${req.method}] ${req.url}`)
  if (req.url === '/') {
    return routes[req.method](req, res)
  }

  return res.writeHead(404).write('Not found')
})

server.listen(+PORT, 'localhost', () => {
  console.log('Server is running on port ', PORT)
})