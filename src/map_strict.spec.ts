import { describe, expect, it, vi } from 'vitest';
import asyncMapStrict from './map_strict';

import {
  doubleInputArr,
  duplicate,
  duplicateInRandomTime,
  getTimer,
  inputArr,
  makeDelayed,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
  throws,
} from '../test-utils';

describe('asyncMapStrict()', () => {
  it('example from README works as described', async () => {
    const indexes: number[] = [];

    const asyncMappedArr = await asyncMapStrict([1, 2, 3], async (el, index) => {
      indexes.push(index);
      return el * 2;
    }); // [2, 4, 6]

    expect(asyncMappedArr).toEqual([2, 4, 6]);
    expect(indexes).toEqual([0, 1, 2]);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncMapStrict(
      [1, 2, 3],
      makeDelayed((el) => el * 2, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay * 3);
    expect(timeElapsed).toBeLessThan(delay * 1.25 * 3);
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

    await asyncMapStrict(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    inputArr.map(mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it('maps values properly with side effects', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = vi.fn().mockImplementation(pushDuplicate);

    await asyncMapStrict(inputArr, mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const mapper = vi.fn().mockImplementation(duplicate);

    const result = inputArr.map(mapper);

    expect(result).toEqual(doubleInputArr);
  });

  it('returns result properly', async () => {
    const mapper = vi.fn().mockImplementation(duplicateInRandomTime);

    const result = await asyncMapStrict(inputArr, mapper);

    expect(result).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const mapper = vi.fn().mockImplementation(throws);

    expect(() => inputArr.map(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = vi.fn().mockImplementation(throws);

    await expect(() => asyncMapStrict(inputArr, mapper)).rejects.toThrow('Some error');
  });

  it('returns type true[] given function that returns type Promise<true>', async () => {
    async function stringInRandomTime() {
      return new Promise<string>((resolve) =>
        setTimeout(() => {
          resolve('foo');
        }, Math.random() * 100),
      );
    }

    // @ts-expect-no-error
    const result: string[] = await asyncMapStrict([1, 2, 3], stringInRandomTime);

    expect(result).toEqual(['foo', 'foo', 'foo']);
  });
});
