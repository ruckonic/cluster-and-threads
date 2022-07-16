import { pbkdf2Sync, randomBytes } from 'node:crypto'

const pass = randomBytes(20).toString()
const salt = Buffer.allocUnsafe(20)
const keylen = 400
const iterations = 5e6

const passHash = pbkdf2Sync(pass, salt, iterations, keylen, 'sha256')

console.log('Simple Hash', passHash.toString('hex'))
