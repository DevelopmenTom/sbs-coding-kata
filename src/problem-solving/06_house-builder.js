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

const addDoor = (doorHeight, extraHeight, extraWidth) => {
  const spreadEven = extraWidth % 2 === 0
  const halfExtra = extraWidth / 2
  const beforeDoor = spreadEven ? halfExtra : Math.ceil(halfExtra)
  const afterDoor = spreadEven ? halfExtra : Math.floor(halfExtra)

  let door = ''

  if (extraHeight) {
    for (let i = 1; i <= extraHeight; i++) {
      door =
        door +
        '|' +
        ' '.repeat(beforeDoor) +
        '   ' +
        ' '.repeat(afterDoor) +
        '|\n'
    }
  }

  for (let i = doorHeight; i > 0; i--) {
    if (i === doorHeight) {
      door =
        door +
        '|' +
        ' '.repeat(beforeDoor) +
        ' _ ' +
        ' '.repeat(afterDoor) +
        '|\n'
      continue
    }

    if (i === 1) {
      door =
        door +
        '|' +
        '_'.repeat(beforeDoor) +
        '| |' +
        '_'.repeat(afterDoor) +
        '|'
      continue
    }

    door =
      door +
      '|' +
      ' '.repeat(beforeDoor) +
      '| |' +
      ' '.repeat(afterDoor) +
      '|\n'
  }
  return door
}

const addRoof = (width) => {
  let roof = ''
  let roofSteps = [...Array(width + 1).keys()].filter((item) => item > 0)
  let roofTop
  if (width % 2 !== 0) {
    roofSteps = roofSteps.filter((item) => item % 2 !== 0)
    roofTop = '^\n'
  } else {
    roofSteps = roofSteps.filter((item) => item % 2 === 0)
    roofTop = '/\\\n'
  }
  roof = roof + ' '.repeat(roofSteps.length) + roofTop
  for (let i = 1; i <= roofSteps.length; i++) {
    roof =
      roof +
      ' '.repeat(roofSteps.length - i) +
      '/' +
      ' '.repeat(roofSteps[i - 1]) +
      '\\\n'
  }
  return roof
}

const buildWithoutDoor = (height, width) => {
  let build = ''
  for (let i = height; i > 0; i--) {
    if (i === 1) {
      build = build + '|' + '_'.repeat(width) + '|'
      continue
    }
    build = build + '|' + ' '.repeat(width) + '|\n'
  }
  return build
}

const house = (height = 3, width) => {
  if (!width) {
    width = height
  }

  let product = '\n'

  product = product + addRoof(width)

  const doorWidth = 3
  const minDoorHeight = 2
  const placeForDoor = height >= minDoorHeight && width >= doorWidth

  if (!placeForDoor) {
    return product + buildWithoutDoor(height, width)
  }

  const windowsHeight = 2
  const windowWidth = 3
  const placeForWindows =
    height - minDoorHeight - windowsHeight > 0 && width >= windowWidth * 2 + 3

  const doorHeight =
    height - (placeForWindows ? windowsHeight : 0) === 2 ? 2 : 3
  const extraWidth = width - doorWidth
  const extraHeight = placeForWindows ? 0 : height - doorHeight
  return product + addDoor(doorHeight, extraHeight, extraWidth)
}

export default house
