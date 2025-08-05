import { assertType, describe, expect, it, vi } from 'vitest';

import asyncEvery from './every.js';

import {
  getTimer,
  inputArr,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
  makeDelayed,
  throws,
} from '../test-utils.js';

function largerOrEqualThanZero(x: number) {
  return x >= 0;
}

function largerOrEqualThanZeroInRandomTime(x: number) {
  return new Promise<boolean>((resolve) =>
    setTimeout(() => {
      resolve(x >= 0);
    }, Math.random() * 100),
  );
}

describe('asyncEvery()', () => {
  it('example from README works as described', async () => {
    const largerThanZero = await asyncEvery([1, 2, 3], async (el) => el > 0);

    expect(largerThanZero).toBe(true);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncEvery(
      [1, 2, 3],
      makeDelayed((el) => el > 0, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay - 1);
    expect(timeElapsed).toBeLessThan(delay * 1.25);
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = vi.fn().mockImplementation(largerOrEqualThanZero);

    inputArr.every(mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates over values properly', async () => {
    const mapper = vi.fn().mockImplementation(largerOrEqualThanZeroInRandomTime);

    await asyncEvery(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = vi.fn().mockImplementation(largerOrEqualThanZero);

    const result = inputArr.every(mapper);

    expect(result).toEqual(true);
  });

  it('returns truthy result properly', async () => {
    const mapper = vi.fn().mockImplementation(largerOrEqualThanZeroInRandomTime);

    const result = await asyncEvery(inputArr, mapper);

    expect(result).toEqual(true);
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = vi.fn().mockImplementation(largerThanOneHundred);

    const result = inputArr.every(mapper);

    expect(result).toEqual(false);
  });

  it('returns falsy result properly', async () => {
    const mapper = vi.fn().mockImplementation(largerThanOneHundredInRandomTime);

    const result = await asyncEvery(inputArr, mapper);

    expect(result).toEqual(false);
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = vi.fn().mockImplementation(throws);

    expect(() => inputArr.every(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = vi.fn().mockImplementation(throws);

    await expect(() => asyncEvery(inputArr, mapper)).rejects.toThrow('Some error');
  });

  it('returns type boolean given function that returns type Promise<boolean>', async () => {
    assertType<boolean>(await asyncEvery(inputArr, largerOrEqualThanZeroInRandomTime));
  });

  it('returns type true given function that returns type Promise<true>', async () => {
    async function trueInRandomTime() {
      return new Promise<true>((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, Math.random() * 100),
      );
    }

    assertType<true>(await asyncEvery(inputArr, trueInRandomTime));
  });

  it('returns type false given function that returns type Promise<false>', async () => {
    async function falseInRandomTime() {
      return new Promise<false>((resolve) =>
        setTimeout(() => {
          resolve(false);
        }, Math.random() * 100),
      );
    }

    assertType<false>(await asyncEvery(inputArr, falseInRandomTime));
  });
});
