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

const addDoor = (doorHeight, extraDoorHeight, extraDoorWidth) => {
  const spreadEven = extraDoorWidth % 2 === 0
  const halfExtra = extraDoorWidth / 2
  const beforeDoor = spreadEven ? halfExtra : Math.ceil(halfExtra)
  const afterDoor = spreadEven ? halfExtra : Math.floor(halfExtra)

  let door = ''

  if (extraDoorHeight) {
    for (let i = 1; i <= extraDoorHeight; i++) {
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

const addWindows = ({
  extraWindowsWidth,
  extraWindowsHeight,
  windowWidth,
  windowsHeight
}) => {
  let windows = ''
  const spreadExtraWidthEven = extraWindowsWidth % 3 === 0
  const extraWidthThird = extraWindowsWidth / 3
  const widthBetweenWindows = spreadExtraWidthEven
    ? extraWidthThird
    : Math.ceil(extraWidthThird)
  const widthBeforeWindows = spreadExtraWidthEven
    ? extraWidthThird
    : (extraWindowsWidth - widthBetweenWindows) / 2
  const widthAfterWindows = spreadExtraWidthEven
    ? extraWidthThird
    : (extraWindowsWidth - widthBetweenWindows) / 2

  const spreadExtraHeightEven = extraWindowsHeight % 2 === 0
  const halfExtraHeight = extraWindowsHeight / 2
  const extraHeightBefore = spreadExtraHeightEven
    ? halfExtraHeight
    : Math.floor(halfExtraHeight)
  const extraHeightAfter = spreadExtraHeightEven
    ? halfExtraHeight
    : Math.ceil(halfExtraHeight)
  const emptyRow =
    '|' +
    ' '.repeat(
      widthBeforeWindows +
        widthBetweenWindows +
        widthAfterWindows +
        windowWidth * 2
    ) +
    '|\n'

  if (extraHeightBefore) {
    for (let i = 1; i <= extraHeightBefore; i++) {
      windows = windows + emptyRow
    }
  }

  for (let i = windowsHeight; i > 0; i--) {
    if (i === windowsHeight) {
      windows =
        windows +
        '|' +
        ' '.repeat(widthBeforeWindows) +
        ' _ ' +
        ' '.repeat(widthBetweenWindows) +
        ' _ ' +
        ' '.repeat(widthAfterWindows) +
        '|\n'
      continue
    }

    windows =
      windows +
      '|' +
      ' '.repeat(widthBeforeWindows) +
      '|_|' +
      ' '.repeat(widthBetweenWindows) +
      '|_|' +
      ' '.repeat(widthAfterWindows) +
      '|\n'
  }

  if (extraHeightAfter) {
    for (let i = 1; i <= extraHeightAfter; i++) {
      windows = windows + emptyRow
    }
  }

  return windows
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
  const minExtraWidthForWindows = 3
  const placeForWindows =
    height - minDoorHeight - windowsHeight > 0 &&
    width - windowWidth * 2 - minExtraWidthForWindows > 0

  const doorHeight =
    height - (placeForWindows ? windowsHeight : 0) === 2 ? 2 : 3

  if (placeForWindows) {
    const extraWindowsWidth = width - windowWidth * 2
    const extraWindowsHeight = height - windowsHeight - doorHeight
    product =
      product +
      addWindows({
        extraWindowsHeight,
        extraWindowsWidth,
        windowWidth,
        windowsHeight
      })
  }

  const extraDoorWidth = width - doorWidth
  const extraDoorHeight = placeForWindows ? 0 : height - doorHeight
  return product + addDoor(doorHeight, extraDoorHeight, extraDoorWidth)
}

export default house
