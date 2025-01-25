const { Red, Green, Blue, White, Black, supportedColors } = require('../classes')

/**
 * Parses CLI arguments
 * @param {string[]} args - process.argv
 * @returns {Object} Parsed arguments, including:
 *  - `colorFlags` (object: `{ green: true, blue: false, red: true }`)
 *  (keys match to the colors specified in colorOrder)
 *  - `colorOrder` (array: parsed color names based on the parameter like --RGB or explicit colors)
 *  - `isSeq` (boolean: indicates if the sequential mode is enabled)
 */
function parseArgs (args) {
  const params = args.slice(2) // Extract parameters after the first 2 CLI arguments

  if (params.length < 2) {
    throw new Error('Invalid arguments. At least two arguments are required: flags and colors.')
  }

  const isSeq = params.includes('--seq') // Check for sequential mode

  // Check for color flags with -- prefix
  // TODO: Can be built directly from Color - we just need to somehow address the same first letter issue
  const colorParamRegex = /^--[RGBWH]{1,5}$/
  const colorParamIndex = params.findIndex((param) => colorParamRegex.test(param))
  const colorOrderRaw = params.find((param) => param.startsWith('['))

  if (colorParamIndex !== -1 && colorOrderRaw) {
    throw new Error('Invalid arguments. Cannot provide both a `--RGB` parameter and a JSON array at the same time.')
  }

  let colorOrder = []
  if (colorParamIndex !== -1) {
    const colorParam = params[colorParamIndex]
    colorOrder = parseColorsFlag(colorParam)
  } else if (colorOrderRaw) {
    colorOrder = parseColorsJson(colorOrderRaw)
  }

  // Extract true/false flags and match them with the color order
  const rawFlags = params.filter((param) => param === 'true' || param === 'false')
  if (rawFlags.length > 0 && rawFlags.length !== colorOrder.length) {
    throw new Error(`Mismatch between the number of flags (${rawFlags.length}) and colors (${colorOrder.length}).`)
  }

  // Build colorFlags
  const colorFlags = colorOrder.reduce((acc, color, index) => {
    // Default to true if no explicit flag provided
    acc[color] = rawFlags.length > 0 ? rawFlags[index] === 'true' : true
    return acc
  }, {})

  const explicitColors = Array.from(
    new Set(params.filter((param) => supportedColors.includes(param.toLowerCase())))
  )
  explicitColors.forEach((color) => {
    if (!colorOrder.includes(color)) {
      colorOrder.push(color)
    }
    colorFlags[color] = true
  })

  return { colorFlags, colorOrder, isSeq }
}

/**
 * Parses colors from `--RGB` parameter
 * @param {string} colorParam - The `--RGB` parameter
 * @returns {string[]} Array of parsed color names
 */
function parseColorsFlag (colorParam) {
  const colorOrder = parseColors(colorParam.replace('--', '')) // Parse `--RGB` parameter
  if (colorOrder.length === 0) {
    throw new Error('Invalid --RGB parameter. Must contain valid characters like R, G, B, W.')
  }
  return colorOrder
}

/**
 * Parses colors from a JSON array parameter
 * @param {string} jsonParam - JSON string containing an array of color names
 * @returns {string[]} Array of parsed color names
 */
function parseColorsJson (jsonParam) {
  try {
    const parsedArray = JSON.parse(jsonParam)
    if (!Array.isArray(parsedArray)) {
      throw new Error('Invalid color order format. Expected a JSON array.')
    }

    return parsedArray.map((color) => {
      if (!supportedColors.includes(color)) {
        throw new Error(`Invalid color in order: "${color}". Supported colors: ${supportedColors.join(', ')}`)
      }
      return color
    })
  } catch {
    throw new Error('Invalid color found. Supported colors: green, blue, red, white, black')
  }
}

/**
 * Converts single-character codes to color names
 * @param {string} input - Input string containing single-character color codes (e.g., "RGB")
 * @returns {string[]} Array of parsed color names
 */
function parseColors (input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input. Expected a string of color codes.')
  }

  const colorClassMap = {
    R: Red.getName(),
    G: Green.getName(),
    B: Blue.getName(),
    W: White.getName(),
    H: Black.getName()
  }

  const parsedColors = input.split('')
    .map((char) => {
      const color = colorClassMap[char]
      if (!color) {
        throw new Error(`Invalid color code: ${char}`)
      }
      return color
    })

  if (parsedColors.length === 0) {
    throw new Error('No valid color codes found in the input.')
  }

  return parsedColors
}

module.exports = { parseArgs }
