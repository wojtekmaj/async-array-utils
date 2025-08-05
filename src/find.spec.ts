import { assertType, describe, expect, it, vi } from 'vitest';

import asyncFind from './find.js';

import {
  getTimer,
  inputArr,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
  largerThanTwo,
  largerThanTwoInRandomTime,
  makeDelayed,
  throws,
} from '../test-utils.js';

const firstElementLargerThanTwo = inputArr.findIndex(largerThanTwo);

describe('asyncFind()', () => {
  it('example from README works as described', async () => {
    const asyncFoundEl = await asyncFind([1, 2, 3], async (el) => el > 1);

    expect(asyncFoundEl).toEqual(2);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncFind(
      [1, 2, 3],
      makeDelayed((el) => el > 1, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay * 2 - 1);
    expect(timeElapsed).toBeLessThan(delay * 1.25 * 2);
  });

  it('assertions below are valid for synchronous .find()', () => {
    const filter = vi.fn().mockImplementation(largerThanTwo);

    inputArr.find(filter);

    expect.assertions(1 + firstElementLargerThanTwo);

    expect(filter).toHaveBeenCalledTimes(firstElementLargerThanTwo + 1);
    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates over values properly', async () => {
    const filter = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    await asyncFind(inputArr, filter);

    expect.assertions(1 + firstElementLargerThanTwo);

    expect(filter).toHaveBeenCalledTimes(firstElementLargerThanTwo + 1);
    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .find()', () => {
    const filter = vi.fn().mockImplementation(largerThanTwo);

    inputArr.find(filter);

    expect.assertions(1 + firstElementLargerThanTwo);

    expect(filter).toHaveBeenCalledTimes(firstElementLargerThanTwo + 1);
    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates over values properly', async () => {
    const filter = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    await asyncFind(inputArr, filter);

    expect.assertions(1 + firstElementLargerThanTwo);

    expect(filter).toHaveBeenCalledTimes(firstElementLargerThanTwo + 1);
    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .find()', () => {
    const filter = vi.fn().mockImplementation(largerThanTwo);

    const result = inputArr.find(filter);

    expect(result).toEqual(3);
  });

  it('returns truthy result properly', async () => {
    const filter = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncFind(inputArr, filter);

    expect(result).toEqual(3);
  });

  it.skip('assertions below are valid for synchronous .find()', () => {
    const filter = vi.fn().mockImplementation(largerThanOneHundred);

    const result = inputArr.find(filter);

    expect(result).toEqual(undefined);
  });

  it('returns undefined result properly', async () => {
    const filter = vi.fn().mockImplementation(largerThanOneHundredInRandomTime);

    const result = await asyncFind(inputArr, filter);

    expect(result).toEqual(undefined);
  });

  it.skip('assertions below are valid for synchronous .find()', () => {
    const filter = vi.fn().mockImplementation(throws);

    expect(() => inputArr.find(filter)).toThrow();
  });

  it('throws if function passed throws', async () => {
    const filter = vi.fn().mockImplementation(throws);

    await expect(asyncFind(inputArr, filter)).rejects.toThrow('Some error');
  });

  it('returns type T | undefined given function that returns type Promise<boolean>', async () => {
    const result = await asyncFind(inputArr, largerThanTwoInRandomTime);

    assertType<number | undefined>(result);

    expect(typeof result).toEqual('number');
  });

  it('returns type undefined given function that returns type Promise<false>', async () => {
    async function falseInRandomTime() {
      return new Promise<false>((resolve) =>
        setTimeout(() => {
          resolve(false);
        }, Math.random() * 100),
      );
    }

    const result = await asyncFind(inputArr, falseInRandomTime);

    assertType<undefined>(result);

    expect(result).toEqual(undefined);
  });
});
