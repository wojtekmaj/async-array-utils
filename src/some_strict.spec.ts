import { assertType, describe, expect, it, vi } from 'vitest';

import asyncSomeStrict from './some_strict.js';

import {
  doubleInputArr,
  getTimer,
  inputArr,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
  largerThanTwo,
  largerThanTwoInRandomTime,
  makeDelayed,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
  throws,
} from '../test-utils.js';

const firstElementLargerThanTwo = inputArr.findIndex(largerThanTwo);

describe('asyncSomeStrict()', () => {
  it('example from README works as described', async () => {
    const indexes: number[] = [];

    const largerThanZero = await asyncSomeStrict([1, 2, 3], async (el, index) => {
      indexes.push(index);
      return el > 0;
    });

    expect(largerThanZero).toBe(true);
    expect(indexes).toEqual([0]);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncSomeStrict(
      [1, 2, 3],
      makeDelayed((el) => el < 0, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay - 1);
    expect(timeElapsed).toBeLessThan(delay * 1.25 * 3);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = vi.fn().mockImplementation(largerThanTwo);

    inputArr.some(mapper);

    expect.assertions(1 + firstElementLargerThanTwo);

    expect(mapper).toHaveBeenCalledTimes(firstElementLargerThanTwo + 1);
    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates over values properly', async () => {
    const mapper = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    await asyncSomeStrict(inputArr, mapper);

    expect.assertions(1 + firstElementLargerThanTwo);

    expect(mapper).toHaveBeenCalledTimes(firstElementLargerThanTwo + 1);
    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    inputArr.some(mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it('iterates through an array properly with side effects', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    await asyncSomeStrict(inputArr, mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = vi.fn().mockImplementation(largerThanTwo);

    const result = inputArr.some(mapper);

    expect(result).toEqual(true);
  });

  it('returns truthy result properly', async () => {
    const mapper = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncSomeStrict(inputArr, mapper);

    expect(result).toEqual(true);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = vi.fn().mockImplementation(largerThanOneHundred);

    const result = inputArr.some(mapper);

    expect(result).toEqual(false);
  });

  it('returns falsy result properly', async () => {
    const mapper = vi.fn().mockImplementation(largerThanOneHundredInRandomTime);

    const result = await asyncSomeStrict(inputArr, mapper);

    expect(result).toEqual(false);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = vi.fn().mockImplementation(throws);

    expect(() => inputArr.some(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = vi.fn().mockImplementation(throws);

    await expect(() => asyncSomeStrict(inputArr, mapper)).rejects.toThrow('Some error');
  });

  it('returns type boolean given function that returns type Promise<boolean>', async () => {
    assertType<boolean>(await asyncSomeStrict(inputArr, largerThanOneHundredInRandomTime));
  });

  it('returns type true given function that returns type Promise<true>', async () => {
    async function trueInRandomTime() {
      return new Promise<true>((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, Math.random() * 100),
      );
    }

    assertType<true>(await asyncSomeStrict(inputArr, trueInRandomTime));
  });

  it('returns type false given function that returns type Promise<false>', async () => {
    async function falseInRandomTime() {
      return new Promise<false>((resolve) =>
        setTimeout(() => {
          resolve(false);
        }, Math.random() * 100),
      );
    }

    assertType<false>(await asyncSomeStrict(inputArr, falseInRandomTime));
  });
});
