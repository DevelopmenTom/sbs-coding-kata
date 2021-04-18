/**
 * Please find a path to rescue the dog (d) from the maze
 * The maze is a 2 dimensional array which path is ' ' (space) and blocks are '#'
 * you can move left, right, top, up
 *
 * return path should be the array of position numbers order from start to reach dog.
 *
 * what is the position number?
 * It is the number we assign for each cell in the matrix from left to right and top to bottom in an incremented value.
 * which start from 0 to (size of the matrix - 1)
 *
 * example for calculating position
 * matrix size 8 x 6 (row x column)
 * a[0][1] = 1
 * a[1][1] = 7
 * a[7][5] = 47
 *
 * If you cannot find the path please return undefined.
 *
 * See the test if you have questions.
 */

export const rescuePrincessPath = ({ columns, maze, rows, startPosition }) => {
  let pathToDog = [startPosition]
  let mistakes = []
  let alreadyVisited = []
  let currentRow = 0
  let currentColumn = startPosition
  let currentPosition = startPosition

  const documentNewPosition = (newPosition) => {
    pathToDog.push(newPosition)
    alreadyVisited.push(newPosition)
    currentPosition = newPosition
  }

  const lookAround = () => {
    let down
    let right
    let left
    let up
    const downPossible = currentRow + 1 <= rows - 1
    const rightPossible = currentColumn + 1 <= columns - 1
    const leftPossible = currentColumn - 1 >= 0
    const upPossible = currentRow - 1 >= 0

    if (downPossible) {
      const justBelow = maze[currentRow + 1][currentColumn]
      if (justBelow === 'd') {
        return { dog: currentPosition + 6 }
      }
      justBelow === ' ' &&
        (down = {
          mistake: mistakes.includes(currentPosition + 6),
          new: !alreadyVisited.includes(currentPosition + 6),
          position: currentPosition + 6
        })
    }

    if (rightPossible) {
      const onTheRight = maze[currentRow][currentColumn + 1]
      if (onTheRight === 'd') {
        return { dog: currentPosition + 1 }
      }
      onTheRight === ' ' &&
        (right = {
          mistake: mistakes.includes(currentPosition + 1),
          new: !alreadyVisited.includes(currentPosition + 1),
          position: currentPosition + 1
        })
    }

    if (leftPossible) {
      const onTheLeft = maze[currentRow][currentColumn - 1]
      if (onTheLeft === 'd') {
        return { dog: currentPosition - 1 }
      }
      onTheLeft === ' ' &&
        (left = {
          mistake: mistakes.includes(currentPosition - 1),
          new: !alreadyVisited.includes(currentPosition - 1),
          position: currentPosition - 1
        })
    }

    if (upPossible) {
      const justAbove = maze[currentRow - 1][currentColumn]
      if (justAbove === 'd') {
        return { dog: currentPosition - 6 }
      }
      justAbove === ' ' &&
        (up = {
          mistake: mistakes.includes(currentPosition - 6),
          new: !alreadyVisited.includes(currentPosition - 6),
          position: currentPosition - 6
        })
    }
    return { down, left, right, up }
  }

  const makeAmove = () => {
    const numberOfTimesIwashere = pathToDog.filter(
      (elem) => elem === currentPosition
    )
    // if I was here already - the NEXT step is a mistake!
    if (numberOfTimesIwashere.length > 1) {
      const currentPositionIndex = pathToDog.findIndex(
        (elem) => elem === currentPosition
      )
      mistakes.push(pathToDog[currentPositionIndex + 1])
      // reset solution to before the mistake was made
      pathToDog = pathToDog.slice(0, currentPositionIndex + 1)
    }

    const options = lookAround()
    if (options.dog) {
      pathToDog.push(options.dog)
      return true
    }

    /* If dog was not found, try the first path which
    is still new (as in not visited yet) */
    if (options.down && options.down.new) {
      documentNewPosition(options.down.position)
      currentRow = currentRow + 1
      return makeAmove()
    }

    if (options.right && options.right.new) {
      documentNewPosition(options.right.position)
      currentColumn = currentColumn + 1
      return makeAmove()
    }

    if (options.left && options.left.new) {
      documentNewPosition(options.left.position)
      currentColumn = currentColumn - 1
      return makeAmove()
    }

    if (options.up && options.up.new) {
      documentNewPosition(options.up.position)
      currentRow = currentRow - 1
      return makeAmove()
    }

    /* If all paths were already visited - try the
    first one which is still not recognized as a mistake (i.e
      leads back here eventually) */

    if (options.down && !options.down.mistake) {
      documentNewPosition(options.down.position)
      currentRow = currentRow + 1
      return makeAmove()
    }

    if (options.right && !options.right.mistake) {
      documentNewPosition(options.right.position)
      currentColumn = currentColumn + 1
      return makeAmove()
    }

    if (options.left && !options.left.mistake) {
      documentNewPosition(options.left.position)
      currentColumn = currentColumn - 1
      return makeAmove()
    }

    if (options.up && !options.up.mistake) {
      documentNewPosition(options.up.position)
      currentRow = currentRow - 1
      return makeAmove()
    }

    return false
  }

  const foundDog = makeAmove()
  return foundDog ? pathToDog : undefined
}
