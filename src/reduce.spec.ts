import { assertType, describe, expect, it, vi } from 'vitest';
import asyncReduce from './reduce.js';

import { getTimer, makeDelayed, throws } from '../test-utils.js';

describe('asyncReduce()', () => {
  it('example from README works as described', async () => {
    const result = await asyncReduce([1, 2, 3], async (tmp, cur) => tmp + cur, 0);

    expect(result).toBe(6);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncReduce(
      [1, 2, 3],
      makeDelayed((tmp, cur) => tmp + cur, delay),
      0,
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay * 3);
    expect(timeElapsed).toBeLessThan(delay * 1.25 * 3);
  });

  it.skip('assertions below are valid for synchronous .reduce()', () => {
    const mapper = vi.fn().mockImplementation((temp, cur, idx) => [...temp, `${idx}:${cur}`]);

    const result = ['a', 'b', 'c'].reduce(mapper, ['start']);

    expect(mapper).toHaveBeenCalledTimes(3);
    expect(result).toEqual(['start', '0:a', '1:b', '2:c']);
  });

  it('reduces an array properly', async () => {
    const mapper = vi.fn().mockImplementation(async (temp, cur, idx) => [...temp, `${idx}:${cur}`]);

    const result = await asyncReduce(['a', 'b', 'c'], mapper, ['start']);

    expect(mapper).toHaveBeenCalledTimes(3);
    expect(result).toEqual(['start', '0:a', '1:b', '2:c']);
  });

  it.skip('assertions below are valid for synchronous .reduce()', () => {
    const mapper = vi.fn().mockImplementation(throws);

    expect(() => ['a', 'b', 'c'].reduce(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = vi.fn().mockImplementation(throws);

    await expect(() => asyncReduce(['a', 'b', 'c'], mapper)).rejects.toThrow('Some error');
  });

  it('returns type string given function that returns Promise<string> and no initial value', async () => {
    const result = await asyncReduce(['a', 'b', 'c'], async (temp, cur) => cur);

    assertType<string>(result);

    expect(result).toBe('c');

    // Sanity check
    const resultSync = ['a', 'b', 'c'].reduce((temp, cur) => cur);

    assertType<string>(resultSync);

    expect(resultSync).toBe('c');
  });

  it('returns type string[] given function that returns Promise<string> and initial value of type string[]', async () => {
    const result = await asyncReduce(
      ['a', 'b', 'c'],
      async (temp, cur) => [...temp, cur],
      [] as string[],
    );

    assertType<string[]>(result);

    expect(result).toEqual(['a', 'b', 'c']);

    // Sanity check
    const resultSync = ['a', 'b', 'c'].reduce((temp, cur) => [...temp, cur], [] as string[]);

    assertType<string[]>(resultSync);

    expect(resultSync).toEqual(['a', 'b', 'c']);
  });

  it('returns type number[] given function that returns Promise<number> and initial value of type number', async () => {
    const result = await asyncReduce(['a', 'b', 'c'], async (temp, cur, idx) => [...temp, idx], [
      0,
    ]);

    assertType<number[]>(result);

    expect(result).toEqual([0, 0, 1, 2]);

    // Sanity check
    const resultSync = ['a', 'b', 'c'].reduce((temp, cur, idx) => [...temp, idx], [0]);

    assertType<number[]>(resultSync);

    expect(resultSync).toEqual([0, 0, 1, 2]);
  });
});
