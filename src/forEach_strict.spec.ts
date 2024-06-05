import { describe, expect, it, vi } from 'vitest';
import asyncForEachStrict from './forEach_strict.js';
import {
  doubleInputArr,
  getTimer,
  inputArr,
  makeDelayed,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
  throws,
} from '../test-utils.js';

describe('asyncForEachStrict()', () => {
  it('example from README works as described', async () => {
    const consoleLog = vi.fn();
    const indexes: number[] = [];

    await asyncForEachStrict([1, 2, 3], async (el, index) => {
      indexes.push(index);
      consoleLog(el * 2);
    });

    expect(consoleLog).toHaveBeenCalledTimes(3);
    expect(consoleLog).toHaveBeenCalledWith(2);
    expect(consoleLog).toHaveBeenCalledWith(4);
    expect(consoleLog).toHaveBeenCalledWith(6);

    expect(indexes).toEqual([0, 1, 2]);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncForEachStrict(
      [1, 2, 3],
      makeDelayed((el) => el * 2, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay * 3);
    expect(timeElapsed).toBeLessThan(delay * 1.25 * 3);
  });

  it.skip('assertions below are valid for synchronous .forEach()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    inputArr.forEach(mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates through an array properly', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    await asyncForEachStrict(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .forEach()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    inputArr.forEach(mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it('iterates through an array properly with side effects', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    await asyncForEachStrict(inputArr, mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .forEach()', () => {
    const [, pushDuplicate] = makePushDuplicate();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    const result = inputArr.forEach(mapper);

    expect(result).toBe(undefined);
  });

  it('returns undefined', async () => {
    const [, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    const result = await asyncForEachStrict(inputArr, mapper);

    expect(result).toBe(undefined);
  });

  it.skip('assertions below are valid for synchronous .forEach()', () => {
    const mapper = vi.fn().mockImplementation(throws);

    expect(() => inputArr.forEach(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = vi.fn().mockImplementation(throws);

    await expect(() => asyncForEachStrict(inputArr, mapper)).rejects.toThrow('Some error');
  });
});
