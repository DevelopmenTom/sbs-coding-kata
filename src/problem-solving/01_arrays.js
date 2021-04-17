export const sum = (arr) => {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue)
}

export const concat = (...arrays) => {
  let product = []
  for (const array of arrays) {
    product = product.concat(array)
  }
  return product
}

export const count = (array, itemToCount) => {
  const occurances = array.filter((item) => item === itemToCount)
  return occurances.length
}

export const duplicates = (array) => {
  let duplicates = []
  const sortedArray = [...array].sort()
  for (let i = 0; i < sortedArray.length; i++) {
    if (sortedArray[i] === sortedArray[i + 1]) {
      duplicates.push(sortedArray[i])
    }
  }
  return [...new Set(duplicates)]
}

export const square = (array) => {
  return array.map((item) => item * item)
}
