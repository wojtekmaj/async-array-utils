import { describe, expect, it, vi } from 'vitest';
import asyncFindIndex from './findIndex';

import {
  getTimer,
  inputArr,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
  largerThanTwo,
  largerThanTwoInRandomTime,
  makeDelayed,
  throws,
} from '../test-utils';

const firstElementLargerThanTwo = inputArr.findIndex(largerThanTwo);

describe('asyncFindIndex()', () => {
  it('example from README works as described', async () => {
    const asyncFoundEl = await asyncFindIndex([1, 2, 3], async (el) => el > 1);

    expect(asyncFoundEl).toEqual(1);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncFindIndex(
      [1, 2, 3],
      makeDelayed((el) => el > 1, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay * 2);
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

    await asyncFindIndex(inputArr, filter);

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

    await asyncFindIndex(inputArr, filter);

    expect.assertions(1 + firstElementLargerThanTwo);

    expect(filter).toHaveBeenCalledTimes(firstElementLargerThanTwo + 1);
    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .find()', () => {
    const filter = vi.fn().mockImplementation(largerThanTwo);

    const result = inputArr.find(filter);

    expect(result).toEqual(2);
  });

  it('returns truthy result properly', async () => {
    const filter = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncFindIndex(inputArr, filter);

    expect(result).toEqual(2);
  });

  it.skip('assertions below are valid for synchronous .find()', () => {
    const filter = vi.fn().mockImplementation(largerThanOneHundred);

    const result = inputArr.find(filter);

    expect(result).toEqual(-1);
  });

  it('returns undefined result properly', async () => {
    const filter = vi.fn().mockImplementation(largerThanOneHundredInRandomTime);

    const result = await asyncFindIndex(inputArr, filter);

    expect(result).toEqual(-1);
  });

  it.skip('assertions below are valid for synchronous .find()', () => {
    const filter = vi.fn().mockImplementation(throws);

    expect(() => inputArr.find(filter)).toThrow();
  });

  it('throws if function passed throws', async () => {
    const filter = vi.fn().mockImplementation(throws);

    await expect(asyncFindIndex(inputArr, filter)).rejects.toThrow('Some error');
  });

  it('returns type number given function that returns type Promise<boolean>', async () => {
    // @ts-expect-no-error
    const result: number = await asyncFindIndex(inputArr, largerThanTwoInRandomTime);

    expect(typeof result).toEqual('number');
  });

  it('returns type -1 given function that returns type Promise<false>', async () => {
    async function falseInRandomTime() {
      return new Promise<false>((resolve) =>
        setTimeout(() => {
          resolve(false);
        }, Math.random() * 100),
      );
    }

    // @ts-expect-no-error
    const result: -1 = await asyncFindIndex(inputArr, falseInRandomTime);

    expect(result).toEqual(-1);
  });
});
