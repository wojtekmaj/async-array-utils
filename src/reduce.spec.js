import asyncReduce from './reduce';

describe('asyncReduce()', () => {
  it('example from README works as described', async () => {
    const result = await asyncReduce(
      [1, 2, 3],
      async (tmp, cur) => tmp + cur,
      0,
    );

    expect(result).toBe(6);
  });

  it.skip('assertions below are valid for synchronous .reduce()', () => {
    const mapper = jest.fn().mockImplementation((temp, cur, idx) => [...temp, `${idx}:${cur}`]);

    const result = ['a', 'b', 'c'].reduce(mapper, ['start']);

    expect(mapper).toHaveBeenCalledTimes(3);
    expect(result).toEqual(['start', '0:a', '1:b', '2:c']);
  });

  it('reduces an array properly', async () => {
    const mapper = jest.fn().mockImplementation(async (temp, cur, idx) => [...temp, `${idx}:${cur}`]);

    const result = await asyncReduce(['a', 'b', 'c'], mapper, ['start']);

    expect(mapper).toHaveBeenCalledTimes(3);
    expect(result).toEqual(['start', '0:a', '1:b', '2:c']);
  });
});
