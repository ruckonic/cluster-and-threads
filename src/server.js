import fs from 'node:fs'
import http from 'node:http'
import { URL } from 'node:url'

const PORT = process.env.PORT

const routes = {
  /**
   * Print a hello world
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse} res
   */
  GET(req, res) {
    res.writeHead(200)
    const url = new URL('../example.txt', import.meta.url)
    const data = fs.readFileSync(url, {
      encoding: 'utf8',
    })

    const str = data.repeat(10).replace(/f/g, 'sds').toLowerCase()

    res.write(str)
    res.end()
  },
}

const server = http.createServer((req, res) => {
  process.stdout.write(`[${req.method}] ${req.url}\n`)
  if (req.url === '/') {
    return routes[req.method](req, res)
  }

  return res.writeHead(404).write('Not found')
})

server.listen(+PORT, 'localhost', () => {
  console.log('Server is running on port ', PORT)
})
