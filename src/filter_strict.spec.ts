import { assertType, describe, expect, it, vi } from 'vitest';
import asyncFilterStrict from './filter_strict.js';

import {
  doubleInputArr,
  getTimer,
  inputArr,
  largerThanTwo,
  largerThanTwoInRandomTime,
  makeDelayed,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
  throws,
} from '../test-utils.js';

describe('asyncFilterStrict()', () => {
  it('example from README works as described', async () => {
    const indexes: number[] = [];

    const asyncFilteredArr = await asyncFilterStrict([1, 2, 3], async (el, index) => {
      indexes.push(index);
      return el > 1;
    });

    expect(asyncFilteredArr).toEqual([2, 3]);
    expect(indexes).toEqual([0, 1, 2]);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncFilterStrict(
      [1, 2, 3],
      makeDelayed((el) => el > 1, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay * 3 - 1);
    expect(timeElapsed).toBeLessThan(delay * 1.25 * 3);
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

    await asyncFilterStrict(inputArr, filter);

    expect.assertions(1 + inputArr.length);

    expect(filter).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .filter()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    inputArr.filter(mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it('iterates through an array properly with side effects', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    await asyncFilterStrict(inputArr, mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .filter()', () => {
    const filter = vi.fn().mockImplementation(largerThanTwo);

    const result = inputArr.filter(filter);

    expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('filters array properly', async () => {
    const filter = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncFilterStrict(inputArr, filter);

    expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it.skip('assertions below are valid for synchronous .filter()', () => {
    const mapper = vi.fn().mockImplementation(throws);

    expect(() => inputArr.filter(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = vi.fn().mockImplementation(throws);

    await expect(() => asyncFilterStrict(inputArr, mapper)).rejects.toThrow('Some error');
  });

  it('returns type T[] given function that returns type Promise<boolean>', async () => {
    assertType<typeof inputArr>(await asyncFilterStrict(inputArr, largerThanTwoInRandomTime));
  });

  it('returns type never[] given function that returns type Promise<false>', async () => {
    async function falseInRandomTime() {
      return new Promise<false>((resolve) =>
        setTimeout(() => {
          resolve(false);
        }, Math.random() * 100),
      );
    }

    assertType<never[]>(await asyncFilterStrict(inputArr, falseInRandomTime));
  });
});
