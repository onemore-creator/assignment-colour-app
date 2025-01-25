const { Red, Green, Blue, White, Black, supportedColors } = require('../classes');

/**
 * Parses CLI arguments
 * @param {string[]} args - process.argv
 * @returns {Object} Parsed arguments, including:
 *  - `colorFlags` (object: `{ green: true, blue: false, red: true }`)
 *  - `colorOrder` (array: parsed color names based on the parameter like --RGB or JSON array)
 */
function parseArgs(args) {

    const params = args.slice(2); // Extract parameters after the first 3 CLI arguments

    if (params.length < 2) {
        throw new Error('Invalid arguments. At least two arguments are required: flags and colors.');
    }

    const isSeq = params.includes('--Seq');

    // Check for flags with -- prefix
    const colorParamRegex = /^--[RGBWH]{1,5}$/;
    const colorParamIndex = params.findIndex(param => colorParamRegex.test(param));
    const colorOrderRaw = params.find(param => param.startsWith('['));

    // Ensure only one of --RGB-like flag or JSON array is provided
    if (colorParamIndex !== -1 && colorOrderRaw) {
        throw new Error('Invalid arguments. Cannot provide both a `--RGB` parameter and a JSON array at the same time.');
    }

    // Parse colors, either from flag or from JSON
    let colorOrder;
    if (colorParamIndex !== -1) {
        const colorParam = params[colorParamIndex];
        colorOrder = parseColorsFlag(colorParam);
    } else if (colorOrderRaw) {
        colorOrder = parseColorsJson(colorOrderRaw);
    } else {
        throw new Error('Invalid color order format. Expect either `--RGB` or a JSON array.');
    }

    // Extract and validate raw flags
    const rawFlags = params.filter(param => param === 'true' || param === 'false');
    if (rawFlags.length !== colorOrder.length) {
        throw new Error(`Mismatch between the number of flags (${rawFlags.length}) and colors (${colorOrder.length}).`);
    }

    // Map flags to corresponding colors
    const colorFlags = colorOrder.reduce((acc, color, index) => {
        acc[color] = rawFlags[index] === 'true'; // Convert flag to boolean
        return acc;
    }, {});

    return { colorFlags, colorOrder, isSeq };
}

/**
 * Parses colors from `--RGB` parameter
 * @param {string} colorParam - The `--RGB` parameter
 * @returns {string[]} Array of parsed color names
 */
function parseColorsFlag(colorParam) {
    const colorOrder = parseColors(colorParam.replace('--', '')); // Parse `--RGB` parameter
    if (colorOrder.length === 0) {
        throw new Error('Invalid --RGB parameter. Must contain valid characters like R, G, B, W.');
    }
    return colorOrder;
}

/**
 * Parses colors from a JSON array parameter
 * @param {string} jsonParam - JSON string containing an array of color names
 * @returns {string[]} Array of parsed color names
 */
function parseColorsJson(jsonParam) {
    try {
        const parsedArray = JSON.parse(jsonParam);
        if (!Array.isArray(parsedArray)) {
            throw new Error('Invalid color order format. Expected a JSON array.');
        }

        return parsedArray.map(color => {
            if (!supportedColors.includes(color)) {
                throw new Error(`Invalid color in order: "${color}". Supported colors: ${supportedColors.join(', ')}`);
            }
            return color;
        });
    } catch {
        throw new Error('Invalid color found. Supported colors: green, blue, red, white, black');
    }
}

/**
 * Converts single-character codes to color names
 * @param {string} input - Input string containing single-character color codes (e.g., "RGB")
 * @returns {string[]} Array of parsed color names
 */
function parseColors(input) {
    if (!input || typeof input !== 'string') {
        throw new Error('Invalid input. Expected a string of color codes.');
    }

    const colorClassMap = {
        R: Red.getName(),
        G: Green.getName(),
        B: Blue.getName(),
        W: White.getName(),
        H: Black.getName()
    };

    const parsedColors = input.split('')
        .map(char => {
            const color = colorClassMap[char];
            if (!color) {
                throw new Error(`Invalid color code: ${char}`);
            }
            return color;
        })

    if (parsedColors.length === 0) {
        throw new Error('No valid color codes found in the input.');
    }

    return parsedColors;
}


module.exports = { parseArgs };
