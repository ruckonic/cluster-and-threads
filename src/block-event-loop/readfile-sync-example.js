// import fs from 'node:fs'
// import { URL } from 'node:url'

// const filePath = new URL('../assets/example.txt', import.meta.url)
// const text = fs.readFileSync(filePath, 'utf8')

// console.log(text)

import fs from 'node:fs/promises'

async function printFileData() {
  const filePath = new URL('../assets/example.txt', import.meta.url)
  const text = await fs.readFile(filePath, 'utf8')
  console.log(text)
}

printFileData()
//...
