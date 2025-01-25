const { parseArgs } = require('../src/utils/argsParser');

describe('parseArgs', () => {
  test('parses valid arguments', () => {
    const args = ['node', 'index.js', '--', 'true', 'true', 'true', 'true', 'true', '["green","blue","red", "black", "white"]'];
    const parsed = parseArgs(args);

    expect(parsed).toEqual({
      colorFlags: { green: true, blue: true, red: true, black: true, white: true},
      colorOrder: ['green', 'blue', 'red', 'black', 'white'],
    });
  });

  test('parses valid arguments short', () => {
    const args = ['node', 'index.js', '--', 'true', 'true', 'true', 'true', '--GBRW'];
    const parsed = parseArgs(args);

    expect(parsed).toEqual({
      colorFlags: { green: true, blue: true, red: true, white: true},
      colorOrder: ['green', 'blue', 'red', 'white'],
    });
  });

  test('throws an error if insufficient arguments are provided', () => {
    const args = ['node', 'index.js', '--', 'true', 'false'];
    expect(() => parseArgs(args)).toThrow(
      'Invalid color order format. Expect either `--RGB` or a JSON array.'
    );
  });

  test('throws an error for unsupported colors', () => {
    const args = ['node', 'index.js', 'true', 'false', 'true', '["yellow","blue","red"]'];
    expect(() => parseArgs(args)).toThrow(
      'Invalid color in order: "yellow". Supported colors: green, blue, red, white, black'
    );
  });
});
