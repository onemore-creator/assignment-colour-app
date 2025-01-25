const { getColors } = require('../src/utils/getColors');
const { getColor } = require('../src/apiMock');

describe('getColors', () => {
  test('fetches enabled colors in the specified order as HEX values', async () => {
    const colorFlags = { green: true, blue: false, red: true };
    const colorOrder = ['green', 'blue', 'red'];

    const result = await getColors(colorFlags, colorOrder, () => {});
    expect(result.map(color => color.HEX)).toEqual(['#00ff00', '#ff0000']);
  });

  test('fetches enabled colors in the specified order as RGB values', async () => {
    const colorFlags = { green: true, blue: false, red: true };
    const colorOrder = ['green', 'blue', 'red'];

    const result = await getColors(colorFlags, colorOrder, () => {});
    expect(result.map(color => `rgb(${color.RGB.R}, ${color.RGB.G}, ${color.RGB.B})`)).toEqual([
      'rgb(0, 255, 0)',
      'rgb(255, 0, 0)',
    ]);
  });

  test('returns an empty array when no colors are enabled', async () => {
    const colorFlags = { green: false, blue: false, red: false };
    const colorOrder = ['green', 'blue', 'red'];

    const result = await getColors(colorFlags, colorOrder, () => {});
    expect(result).toEqual([]);
  });

  test('handles empty color order gracefully', async () => {
    const colorFlags = { green: true, blue: true, red: true };
    const colorOrder = [];

    const result = await getColors(colorFlags, colorOrder, () => {});
    expect(result).toEqual([]);
  });

  test('throws an error for unknown colors', async () => {
    const colorFlags = { red: true, blue: true, unknown: true };
    const colorOrder = ['red', 'blue', 'unknown'];

    await expect(getColors(colorFlags, colorOrder, () => {})).rejects.toThrow('Unknown color');
  });

  test('callback is invoked with correct results', async () => {
    const colorFlags = { green: true, blue: true, red: true };
    const colorOrder = ['red', 'blue', 'green'];

    const mockCallback = jest.fn();
    await getColors(colorFlags, colorOrder, mockCallback);

    expect(mockCallback).toHaveBeenCalledWith([
      { name: 'red', HEX: '#ff0000', RGB: { R: 255, G: 0, B: 0 } },
      { name: 'blue', HEX: '#0000ff', RGB: { R: 0, G: 0, B: 255 } },
      { name: 'green', HEX: '#00ff00', RGB: { R: 0, G: 255, B: 0 } },
    ]);
  });
});
