import fs from 'node:fs'
const filePath = new URL('../assets/example.txt', import.meta.url)

export function parseTextSync() {
  return fs.readFileSync(filePath, 'utf8')
}

export function parseText() {
  return fs.promises.readFile(filePath, 'utf8')
}
