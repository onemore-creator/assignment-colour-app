const { getColor } = require('../apiMock');

/**
 * Fetches colors based on the provided flags and order.
 * @param {Object} colorFlags - Flags for each color (e.g., { green: true, blue: false, red: true }).
 * @param {string[]} colorOrder - Array of colors in the desired order (e.g., ['green', 'blue', 'red']).
 * @param {boolean} useRGB - Whether to output RGB format (true) or HEX (false).
 * @returns {Promise<string[]>} - An array of colors (in HEX or RGB format).
 */
async function getColors(colorFlags, order, callback) {
	const colors = [];

	// Loop through the color order and fetch only the enabled colors
	for (const color of order) {
	  if (colorFlags[color]) {
		const fetchedColor = await getColor(color);
		colors.push(fetchedColor); // Add fetched color to results
	  }
	}
  
	callback(colors);
	return colors;
  }

module.exports = { getColors };
