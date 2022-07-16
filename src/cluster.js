import cluster from 'node:cluster'
import os from 'node:os'
import server from './server.js'

const PORT = process.env.PORT

if (cluster.isPrimary) {
  const cpus = os.cpus().length / 2
  console.log(`PID ${process.pid}`)

  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
} else {
  server.listen(+PORT, 'localhost', () => {
    console.log(
      `[${process.pid}] => ${process.ppid} Server is running on port ${PORT}`
    )
  })
}
