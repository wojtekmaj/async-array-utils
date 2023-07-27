import { describe, expect, it, vi } from 'vitest';
import asyncSome from './some.js';

import {
  inputArr,
  largerThanTwo,
  largerThanTwoInRandomTime,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
  getTimer,
  makeDelayed,
  throws,
} from '../test-utils.js';

const firstElementLargerThanTwo = inputArr.findIndex(largerThanTwo);

describe('asyncSome()', () => {
  it('example from README works as described', async () => {
    const largerThanZero = await asyncSome([1, 2, 3], async (el) => el > 0);

    expect(largerThanZero).toBe(true);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncSome(
      [1, 2, 3],
      makeDelayed((el) => el < 0, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay);
    expect(timeElapsed).toBeLessThan(delay * 1.25);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = vi.fn().mockImplementation(largerThanTwo);

    inputArr.some(mapper);

    expect.assertions(firstElementLargerThanTwo);

    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates over values properly', async () => {
    const mapper = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    await asyncSome(inputArr, mapper);

    expect.assertions(firstElementLargerThanTwo);

    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = vi.fn().mockImplementation(largerThanTwo);

    const result = inputArr.some(mapper);

    expect(result).toEqual(true);
  });

  it('returns truthy result properly', async () => {
    const mapper = vi.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncSome(inputArr, mapper);

    expect(result).toEqual(true);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = vi.fn().mockImplementation(largerThanOneHundred);

    const result = inputArr.some(mapper);

    expect(result).toEqual(false);
  });

  it('returns falsy result properly', async () => {
    const mapper = vi.fn().mockImplementation(largerThanOneHundredInRandomTime);

    const result = await asyncSome(inputArr, mapper);

    expect(result).toEqual(false);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = vi.fn().mockImplementation(throws);

    expect(() => inputArr.some(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = vi.fn().mockImplementation(throws);

    await expect(() => asyncSome(inputArr, mapper)).rejects.toThrow('Some error');
  });

  it('returns type boolean given function that returns type Promise<boolean>', async () => {
    // @ts-expect-no-error
    const result: boolean = await asyncSome(inputArr, largerThanOneHundredInRandomTime);

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
    const result: true = await asyncSome(inputArr, trueInRandomTime);

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
    const result: false = await asyncSome(inputArr, falseInRandomTime);

    expect(result).toBe(false);
  });
});
