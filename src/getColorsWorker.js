const { getColors } = require('./utils/getColors')

module.exports = async function (task) {
  const { color } = task

  const colorArray = await getColors({ [color]: true }, [color], async (promises) =>
    Promise.all(promises),
  )

  return colorArray[0] // Return the first (and only) color object
}
