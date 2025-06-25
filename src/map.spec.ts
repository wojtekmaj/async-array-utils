import { assertType, describe, expect, it, vi } from 'vitest';
import asyncMap from './map.js';

import {
  doubleInputArr,
  duplicate,
  duplicateInRandomTime,
  getTimer,
  inputArr,
  makeDelayed,
  throws,
} from '../test-utils.js';

describe('asyncMap()', () => {
  it('example from README works as described', async () => {
    const asyncMappedArr = await asyncMap([1, 2, 3], async (el) => el * 2); // [2, 4, 6]

    expect(asyncMappedArr).toEqual([2, 4, 6]);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncMap(
      [1, 2, 3],
      makeDelayed((el) => el * 2, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay - 1);
    expect(timeElapsed).toBeLessThan(delay * 1.25);
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const mapper = vi.fn().mockImplementation(duplicate);

    inputArr.map(mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('maps values properly', async () => {
    const mapper = vi.fn().mockImplementation(duplicateInRandomTime);

    await asyncMap(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const mapper = vi.fn().mockImplementation(duplicate);

    const result = inputArr.map(mapper);

    expect(result).toEqual(doubleInputArr);
  });

  it('returns result properly', async () => {
    const mapper = vi.fn().mockImplementation(duplicateInRandomTime);

    const result = await asyncMap(inputArr, mapper);

    expect(result).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const mapper = vi.fn().mockImplementation(throws);

    expect(() => inputArr.map(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = vi.fn().mockImplementation(throws);

    await expect(() => asyncMap(inputArr, mapper)).rejects.toThrow('Some error');
  });

  it('returns type string[] given function that returns type Promise<string>', async () => {
    async function stringInRandomTime() {
      return new Promise<string>((resolve) =>
        setTimeout(() => {
          resolve('foo');
        }, Math.random() * 100),
      );
    }

    const result = await asyncMap([1, 2, 3], stringInRandomTime);

    assertType<string[]>(result);

    expect(result).toEqual(['foo', 'foo', 'foo']);
  });
});
