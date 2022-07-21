import { parentPort } from 'node:worker_threads'
import { sumPrimeNumbers } from '../utils/prime-number.js'

/**
 *
 * @param {object} value
 * @param {MessagePort} value.subChannelPort
 * @param {string} value.jobId
 * @param {number} value.limit
 *
 */
function onMessageReceived(value) {
  const result = sumPrimeNumbers(value.limit)
  value.subChannelPort.postMessage({ jobId: value.jobId, result })
  value.subChannelPort.close()
}

parentPort.on('message', onMessageReceived)
