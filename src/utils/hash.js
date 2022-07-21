import { pbkdf2 as _pbkdf2, pbkdf2Sync, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const pbkdf2 = promisify(_pbkdf2)

export async function hashPassword() {
  const pass = randomBytes(20).toString()
  const salt = Buffer.allocUnsafe(20)
  const keylen = 400
  const iterations = 100000

  const passHash = await pbkdf2(pass, salt, iterations, keylen, 'sha256')

  return passHash.toString('hex')
}

export function hashPasswordSync() {
  const pass = randomBytes(20).toString()
  const salt = Buffer.allocUnsafe(20)
  const keylen = 400
  const iterations = 100000

  const passHash = pbkdf2Sync(pass, salt, iterations, keylen, 'sha256')

  return passHash.toString('hex')
}
