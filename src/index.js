const { parseArgs } = require('./utils/argsParser')

const { execParallel } = require('./execParallel')
const { execSeq } = require('./execSeq')

async function colors () {
  try {
    const { colorFlags, colorOrder, isSeq } = parseArgs(process.argv)

    if (isSeq) {
      execSeq(colorFlags, colorOrder)
    } else {
      await execParallel(colorFlags, colorOrder)
    }
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

colors()
