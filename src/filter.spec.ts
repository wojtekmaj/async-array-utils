import asyncFilter from './filter';

import {
  getTimer,
  inputArr,
  largerThanTwo,
  largerThanTwoInRandomTime,
  makeDelayed,
  throws,
} from '../test-utils';

describe('asyncFilter()', () => {
  it('example from README works as described', async () => {
    const asyncFilteredArr = await asyncFilter([1, 2, 3], async (el) => el > 1);

    expect(asyncFilteredArr).toEqual([2, 3]);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncFilter(
      [1, 2, 3],
      makeDelayed((el) => el > 1, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay);
    expect(timeElapsed).toBeLessThan(delay * 1.25);
  });

  it.skip('assertions below are valid for synchronous .filter()', () => {
    const filter = jest.fn().mockImplementation(largerThanTwo);

    inputArr.filter(filter);

    expect.assertions(1 + inputArr.length);

    expect(filter).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates over values properly', async () => {
    const filter = jest.fn().mockImplementation(largerThanTwoInRandomTime);

    await asyncFilter(inputArr, filter);

    expect.assertions(1 + inputArr.length);

    expect(filter).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .filter()', () => {
    const filter = jest.fn().mockImplementation(largerThanTwo);

    const result = inputArr.filter(filter);

    expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('filters array properly', async () => {
    const filter = jest.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncFilter(inputArr, filter);

    expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it.skip('assertions below are valid for synchronous .filter()', () => {
    const mapper = jest.fn().mockImplementation(throws);

    expect(() => inputArr.filter(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = jest.fn().mockImplementation(throws);

    await expect(() => asyncFilter(inputArr, mapper)).rejects.toThrow('Some error');
  });
});
