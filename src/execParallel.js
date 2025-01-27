const Piscina = require('piscina')
const path = require('path')

const piscina = new Piscina({
  filename: path.resolve(__dirname, './getColorsWorker.js'),
})

async function execParallel(colorFlags, colorOrder) {
  try {
    const filteredColors = colorOrder.filter((color) => colorFlags[color])

    const tasks = filteredColors.map((color) => piscina.run({ color }))

    const results = await Promise.all(tasks)

    console.info(
      'HEX Colors:',
      results.map((result) => result.HEX),
    )
  } catch (error) {
    console.error('Error during parallel execution:', error.message)
  }
}

module.exports = { execParallel }
