const { parseArgs } = require('./utils/argsParser');

const { getColors } = require('./utils/getColors');

function colors() {
	// console.log("DEBUG: ", args)
	//TODO: Implement sequential input

	//TODO: Decide how we will distinct black and blue color in short format

	try {
		
		const { colorFlags, colorOrder } = parseArgs(process.argv);

		// console.log("DEBUG: ", colorFlags, colorOrder)
	
		getColors(colorFlags, colorOrder, async function (colors) {
		colors = await Promise.all(colors)
			// console.log(colors)
			var hexColors = []
			colors.forEach(color => color ? hexColors.push(color.HEX) : null)
			console.log(hexColors);
		});

	} catch (error) {
		console.error('Error:', error.message);
		process.exit(1);	
	}
}

colors()

/*
To run application:
npm run start true false true '["green","blue", "red"]'
*/
