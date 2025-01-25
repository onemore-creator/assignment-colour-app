const { supportedColors } = require('../classes');

/**
 * Parses CLI arguments
 * @param {string[]} args - process.argv
 * @returns {Object} Parsed arguments, including:
 *  - `colorFlags` (object: `{ green: true, blue: false, red: true }`)
 *     (keys match to the colors specified in colorOrder)
 *  - `colorOrder` (array: e.g., `['green', 'blue', 'red']`)
 */
function parseArgs(args) {
  const params = args.slice(2);

  if (params.length < 2) {
    throw new ParseArgsError
  }

  const rawFlags = params.slice(0, -1); // Flags are all but the last argument
  const colorOrderRaw = params[params.length - 1];

  // Parse and validate the color order
  let colorOrder;
  try {
    colorOrder = JSON.parse(colorOrderRaw);
    if (!Array.isArray(colorOrder)) {
      throw new Error();
    }
  } catch {
    throw new Error('Invalid color order format. Expected a JSON array.');
  }

  // Ensure the number of flags matches the color order length
  if (colorOrder.length !== rawFlags.length) {
    throw new Error(
      `Mismatch between number of flags (${rawFlags.length}) and colors in order (${colorOrder.length}).`
    );
  }

  // Validate colors and map flags to the corresponding colors
  const colorFlags = colorOrder.reduce((acc, color, index) => {
    if (!supportedColors.includes(color)) {
      throw new Error(`Invalid color in order: "${color}". Supported colors: ${supportedColors.join(', ')}`);
    }
    acc[color] = rawFlags[index] === 'true'; // Convert flag to boolean
    return acc;
  }, {});

  return { colorFlags, colorOrder };
}

module.exports = { parseArgs };
