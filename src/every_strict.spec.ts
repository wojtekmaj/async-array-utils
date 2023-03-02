import { describe, expect, it, vi } from 'vitest';
import asyncEveryStrict from './every_strict';

import {
  doubleInputArr,
  getTimer,
  inputArr,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
  makeDelayed,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
  throws,
} from '../test-utils';

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

describe('asyncEveryStrict()', () => {
  it('example from README works as described', async () => {
    const indexes: number[] = [];

    const largerThanZero = await asyncEveryStrict([1, 2, 3], async (el, index) => {
      indexes.push(index);
      return el > 0;
    });

    expect(largerThanZero).toBe(true);
    expect(indexes).toEqual([0, 1, 2]);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncEveryStrict(
      [1, 2, 3],
      makeDelayed((el) => el > 0, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay * 3);
    expect(timeElapsed).toBeLessThan(delay * 1.25 * 3);
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

    await asyncEveryStrict(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = vi.fn().mockImplementation((el) => {
      pushDuplicate(el);
      return largerOrEqualThanZero(el);
    });

    inputArr.every(mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it('iterates through an array properly with side effects', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = vi.fn().mockImplementation(async (el) => {
      await pushDuplicate(el);
      return largerOrEqualThanZero(el);
    });

    await asyncEveryStrict(inputArr, mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = vi.fn().mockImplementation(largerOrEqualThanZero);

    const result = inputArr.every(mapper);

    expect(result).toEqual(true);
  });

  it('returns truthy result properly', async () => {
    const mapper = vi.fn().mockImplementation(largerOrEqualThanZeroInRandomTime);

    const result = await asyncEveryStrict(inputArr, mapper);

    expect(result).toEqual(true);
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = vi.fn().mockImplementation(largerThanOneHundred);

    const result = inputArr.every(mapper);

    expect(result).toEqual(false);
  });

  it('returns falsy result properly', async () => {
    const mapper = vi.fn().mockImplementation(largerThanOneHundredInRandomTime);

    const result = await asyncEveryStrict(inputArr, mapper);

    expect(result).toEqual(false);
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = vi.fn().mockImplementation(throws);

    expect(() => inputArr.every(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = vi.fn().mockImplementation(throws);

    await expect(() => asyncEveryStrict(inputArr, mapper)).rejects.toThrow('Some error');
  });

  it('returns type boolean given function that returns type Promise<boolean>', async () => {
    // @ts-expect-no-error
    const result: boolean = await asyncEveryStrict(inputArr, largerOrEqualThanZeroInRandomTime);

    expect(typeof result).toBe('boolean');
  });

  it('returns type true given function that returns type Promise<true>', async () => {
    async function trueInRandomTime() {
      return new Promise<true>((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, Math.random() * 100),
      );
    }

    // @ts-expect-no-error
    const result: true = await asyncEveryStrict(inputArr, trueInRandomTime);

    expect(result).toBe(true);
  });

  it('returns type false given function that returns type Promise<false>', async () => {
    async function falseInRandomTime() {
      return new Promise<false>((resolve) =>
        setTimeout(() => {
          resolve(false);
        }, Math.random() * 100),
      );
    }

    // @ts-expect-no-error
    const result: false = await asyncEveryStrict(inputArr, falseInRandomTime);

    expect(result).toBe(false);
  });
});
