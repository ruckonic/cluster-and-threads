/**
 * Check if number is prime
 * @param {number} number
 */
export function isPrime(number) {
  for (let i = 2; i < Math.sqrt(number); i++) {
    if (!(number % i)) return false
  }
  return true
}

/**
 * Generate List of prime numbers
 * @param {number} limit
 */
export function generatePrimesNumber(limit) {
  let numbersIterator = Array(limit).keys()
  const numbers = []

  for (let number of numbersIterator) {
    if (!isPrime(number)) {
      continue
    }

    numbers.push(number)
  }

  return numbers
}

/**
 * Sum all generated prime numbers
 * @param {number} limit
 */
export function sumPrimeNumbers(limit) {
  return generatePrimesNumber(limit).reduce((a, b) => a + b, 0)
}
