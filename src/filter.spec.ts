import { describe, expect, it, vi } from 'vitest';
import asyncFilter from './filter';

import {
  getTimer,
  inputArr,
  largerThanTwo,
  largerThanTwoInRandomTime,
  makeDelayed,
  throws,
} from '../test-utils';

describe('asyncFilter()', () => {
  it('example from README works as described', async () => {
    const asyncFilteredArr = await asyncFilter([1, 2, 3], async (el) => el > 1);

    expect(asyncFilteredArr).toEqual([2, 3]);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncFilter(
      [1, 2, 3],
      makeDelayed((el) => el > 1, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay);
    expect(timeElapsed).toBeLessThan(delay * 1.25);
  });

  it.skip('assertions below are valid for synchronous .filter()', () => {
    const filter = vi.fn().mockImplementation(largerThanTwo);

    inputArr.filter(filter);

    expect.assertions(1 + inputArr.length);

    expect(filter).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates over values properly', async () => {
    const filter = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    await asyncFilter(inputArr, filter);

    expect.assertions(1 + inputArr.length);

    expect(filter).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .filter()', () => {
    const filter = vi.fn().mockImplementation(largerThanTwo);

    const result = inputArr.filter(filter);

    expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('filters array properly', async () => {
    const filter = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncFilter(inputArr, filter);

    expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it.skip('assertions below are valid for synchronous .filter()', () => {
    const mapper = vi.fn().mockImplementation(throws);

    expect(() => inputArr.filter(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = vi.fn().mockImplementation(throws);

    await expect(() => asyncFilter(inputArr, mapper)).rejects.toThrow('Some error');
  });

  it('returns type T[] given function that returns type Promise<boolean>', async () => {
    // @ts-expect-no-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: number[] = await asyncFilter(inputArr, largerThanTwoInRandomTime);
  });

  it('returns type never[] given function that returns type Promise<false>', async () => {
    async function falseInRandomTime() {
      return new Promise<false>((resolve) =>
        setTimeout(() => {
          resolve(false);
        }, Math.random() * 100),
      );
    }

    // @ts-expect-no-error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result: never[] = await asyncFilter(inputArr, falseInRandomTime);
  });
});
