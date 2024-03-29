import http from 'node:http'
import { addSumJob } from './worker/worker.js'
// import { sumPrimeNumbers } from './utils/prime-number.js'

/**
 * GET /:limit
 */
const limitRouteRegExp = /\/(?<limit>\d+$)/
const route = {
  [limitRouteRegExp]: {
    /**
     * @param {http.IncomingMessage} req
     * @param {http.ServerResponse} res
     */
    async GET(req, res) {
      const execObj = limitRouteRegExp.exec(req.url)
      if (!execObj) {
        res.writeHead(400)
        return res.end()
      }

      const { limit } = execObj.groups
      const sumPrime = await addSumJob(+limit)

      res.writeHead(200)
      res.write(sumPrime.toString())
      res.end()
    },
  },
}

export const server = http.createServer((req, res) => {
  process.stdout.write(`[${req.method}] pid ${process.pid} ${req.url}\n`)

  if (limitRouteRegExp.test(req.url)) {
    route[limitRouteRegExp][req.method](req, res)
    return
  }

  res.writeHead(404)
  res.end()
})

export default server
