const answers = {
  captureThreeNumbers: (string) => {
    const threeNumbers = string.match(/(\d\d\d)/)
    return threeNumbers === null ? false : threeNumbers[0]
  },

  containsNumber: (string) => {
    return /.*\d.*/.test(string)
  },

  containsRepeatingLetter: (string) => {
    return /.*([a-zA-Z]).*\1/.test(string)
  },

  endsWithVowel: (string) => {
    return /.*[aeiouAEIOU]$/.test(string)
  },

  isUSD: (string) => {
    return /^\$\d+(\.|\,)\d*(\1?\d{3})?\.?(\d{2})?$/.test(string)
  },

  matchesPattern: (string) => {
    return /^\d{3}\-\d{3}\-\d{4}$/.test(string)
  }
}

export default answers
