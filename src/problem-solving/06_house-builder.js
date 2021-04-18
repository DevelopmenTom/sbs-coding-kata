/**
 * Your function should print a house according to the following specification
 *
 * Param 1: height
 * Param 2: width
 * If width is not provided width = height
 *
 * Doors:
 * A door is always 3 fields wide and min 2 and max 3 field high.
 * It is always on the bottom center of the house and always has at least 1 free row above.
 * If it does not fit into the house, there is no door.
 *
 * Windows:
 * There is either (a) no window (not enough space in the house) or (b) two windows in the house.
 * Each window has a size of 3x3.
 * They always have the same distance from each other as from the left and right wall of the house.
 * If the math does not work out the adjustment is done in the center between both windows.
 * Vertically they are always in the center between the top of the door and the bottom of the roof.
 *
 * We rather have a door in the house, then windows.
 *
 * Please implement it generic, not just to fulfill the test.
 * See the test to find the charakters to use and to answer your questions.
 */

const addRoof = (width) => {
  let roof = ''
  let rooftSteps = [...Array(width + 1).keys()].filter((item) => item > 0)
  let roofTop
  if (width % 2 !== 0) {
    rooftSteps = rooftSteps.filter((item) => item % 2 !== 0)
    roofTop = '^\n'
  } else {
    rooftSteps = rooftSteps.filter((item) => item % 2 === 0)
    roofTop = '/\\\n'
  }
  roof = roof + ' '.repeat(rooftSteps.length) + roofTop
  for (let i = 1; i < rooftSteps.length + 1; i++) {
    roof =
      roof +
      ' '.repeat(rooftSteps.length - i) +
      '/' +
      ' '.repeat(rooftSteps[i - 1]) +
      '\\\n'
  }
  return roof
}

const house = (height = 3, width) => {
  if (!width) {
    width = height
  }

  let product = '\n'

  product = product + addRoof(width)

  return product
}

export default house
