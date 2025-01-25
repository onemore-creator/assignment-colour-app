const { parseArgs } = require('../src/utils/argsParser')

describe('parseArgs', () => {
  test('parses valid arguments', () => {
    const args = ['node', 'index.js', '--', 'true', 'true', 'true', 'true', 'true', '["green","blue","red", "black", "white"]']
    const parsed = parseArgs(args)

    expect(parsed).toEqual({
      colorFlags: { green: true, blue: true, red: true, black: true, white: true },
      colorOrder: ['green', 'blue', 'red', 'black', 'white'],
      isSeq: false
    })
  })

  test('parses valid arguments short', () => {
    const args = ['node', 'index.js', '--', 'true', 'true', 'true', 'true', '--GBRW']
    const parsed = parseArgs(args)

    expect(parsed).toEqual({
      colorFlags: { green: true, blue: true, red: true, white: true },
      colorOrder: ['green', 'blue', 'red', 'white'],
      isSeq: false
    })
  })

  test('throws an error if insufficient arguments are provided', () => {
    const args = ['node', 'index.js', '--', 'true', 'false']
    expect(() => parseArgs(args)).toThrow(
      'Mismatch between the number of flags (2) and colors (0).'
    )
  })

  test('throws an error for unsupported colors', () => {
    const args = ['node', 'index.js', '--', 'true', 'false', 'true', '["yellow","blue","red"]']
    expect(() => parseArgs(args)).toThrow(
      'Invalid color found. Supported colors: green, blue, red, white, black'
    )
  })

  test('parses valid arguments another format', () => {
    const args = ['node', 'index.js', '--', 'green', 'blue', 'red', 'white', 'black', '--BGR', '--seq']
    const parsed = parseArgs(args)

    expect(parsed).toEqual({
      colorFlags: { green: true, blue: true, red: true, white: true, black: true },
      colorOrder: ['blue', 'green', 'red', 'white', 'black'],
      isSeq: true
    })
  })
})
