import { randomUUID } from 'node:crypto'
import { URL } from 'node:url'

import { MessageChannel, Worker } from 'node:worker_threads'

/** @type {Worker[]} */
const workerPool = []
const url = new URL('./prime.worker.js', import.meta.url)

for (let i = 0; i < 4; i++) {
  workerPool.push(new Worker(url))
}

let last = 0

function assign() {
  if (last === workerPool.length - 1) {
    return (last = 0)
  }
  return last++
}

/**
 *
 * @param {number} limit - of primes generated
 */
export function addSumJob(limit) {
  const worker = workerPool[assign()]
  const jobId = randomUUID()
  const subChannel = new MessageChannel()

  worker.postMessage({ jobId, subChannelPort: subChannel.port1, limit }, [
    subChannel.port1,
  ])

  return new Promise((resolve, reject) => {
    function onMessage({ jobId: _jobId, result }) {
      if (_jobId !== jobId) {
        return
      }

      subChannel.port2.off('message', onMessage)
      return resolve(result)
    }

    function onErrorMessage(error) {
      if (error.jobId !== jobId) {
        return
      }

      subChannel.port2.off('message', onMessage)
      return reject(error.message)
    }

    subChannel.port2.on('message', onMessage)
    subChannel.port2.on('messageerror', onErrorMessage)
  })
}
