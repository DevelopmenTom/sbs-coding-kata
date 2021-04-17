/**
 * Check if the given string is an anagram of a palindrom
 *
 * Example
 * s = 'aabbccdd'
 * One way this can be arranged into a palindrome is abcddcba. Return true.
 *
 * Constraints
 * contains only lowercase letters in the range ascii[a..z]
 */

export const isPalindromePossible = (string) => {
  const characterDictonary = {}
  for (const character of string) {
    characterDictonary[character]
      ? characterDictonary[character]++
      : (characterDictonary[character] = 1)
  }

  let oddCharacters = 0
  for (const character in characterDictonary) {
    if (characterDictonary[character] % 2 !== 0) {
      oddCharacters++
    }
  }

  return oddCharacters < 2
}
