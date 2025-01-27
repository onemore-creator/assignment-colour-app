const readline = require('readline')
const { getColors } = require('./utils/getColors')

/**
 * Runs the program in sequential mode and processes one color at a time
 *
 * @param {Object} colorFlags - An object mapping colors to boolean flags (e.g., { green: true, blue: false })
 * @param {string[]} colorOrder - An array of color names (e.g., ['green', 'blue', 'red', 'white', 'black'])
 */
function execSeq(colorFlags, colorOrder) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  let index = 0

  const printNextColor = async () => {
    while (index < colorOrder.length && !colorFlags[colorOrder[index]]) {
      index++
    }

    if (index >= colorOrder.length) {
      console.log('All colors processed. Exiting.')
      rl.close()
      return
    }

    const colorName = colorOrder[index]
    index++

    try {
      const colorArray = await getColors(colorFlags, [colorName], async (promises) =>
        Promise.all(promises),
      )

      const colorObj = colorArray[0]
      console.log(`${colorObj.HEX}`)
    } catch (err) {
      console.error('Error:', err.message)
    }

    console.log('Press Enter for the next color, or type "exit" to quit.')
  }

  rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'exit') {
      console.log('Exiting sequential mode...')
      rl.close()
      return
    }
    printNextColor()
  })

  printNextColor()

  rl.on('close', () => {
    process.exit(0)
  })
}

module.exports = { execSeq }
