const { parseArgs } = require('../src/utils/argsParser');

describe('parseArgs', () => {
  test('parses valid arguments', () => {
    const args = ['node', 'index.js', 'true', 'true', 'true', '["green","blue","red"]'];
    const parsed = parseArgs(args);

    expect(parsed).toEqual({
      colorFlags: { green: true, blue: true, red: true },
      colorOrder: ['green', 'blue', 'red'],
    });
  });

  test('throws an error if insufficient arguments are provided', () => {
    const args = ['node', 'index.js', 'true', 'false'];
    expect(() => parseArgs(args)).toThrow(
      'Invalid color order format. Expected a JSON array'
    );
  });

  test('throws an error for invalid color order format', () => {
    const args = ['node', 'index.js', 'true', 'false', 'true', 'invalid', '--RGB'];
    expect(() => parseArgs(args)).toThrow('Invalid color order format. Expected a JSON array.');
  });

  test('throws an error for unsupported colors', () => {
    const args = ['node', 'index.js', 'true', 'false', 'true', '["yellow","blue","red"]'];
    expect(() => parseArgs(args)).toThrow(
      'Invalid color in order: "yellow". Supported colors: red, green, blue'
    );
  });
});
