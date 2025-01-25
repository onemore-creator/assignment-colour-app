const { getColors } = require('./utils/getColors');

async function execParallel(colorFlags, colorOrder) {
    // Fetch all colors in parallel
    const colors = await getColors(colorFlags, colorOrder, async (colors) =>
        Promise.all(colors)
    );
    console.info(colors.map((color) => color.HEX));
}

module.exports = { execParallel };

