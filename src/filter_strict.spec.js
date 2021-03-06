import asyncFilterStrict from './filter_strict';

import {
  doubleInputArr,
  getTimer,
  inputArr,
  largerThanTwo,
  largerThanTwoInRandomTime,
  makeDelayed,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
} from '../test-utils';

describe('asyncFilterStrict()', () => {
  it('example from README works as described', async () => {
    const indexes = [];

    const asyncFilteredArr = await asyncFilterStrict(
      [1, 2, 3],
      async (el, index) => {
        indexes.push(index);
        return el > 1;
      },
    );

    expect(asyncFilteredArr).toEqual([2, 3]);
    expect(indexes).toEqual([0, 1, 2]);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncFilterStrict([1, 2, 3], makeDelayed((el) => el > 1, delay));

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThan(delay * 3);
    expect(timeElapsed).toBeLessThan((delay + 10) * 3);
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

    await asyncFilterStrict(inputArr, filter);

    expect.assertions(1 + inputArr.length);

    expect(filter).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(filter).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    inputArr.filter(mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it('iterates through an array properly with side effects', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    await asyncFilterStrict(inputArr, mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .filter()', () => {
    const filter = jest.fn().mockImplementation(largerThanTwo);

    const result = inputArr.filter(filter);

    expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('filters array properly', async () => {
    const filter = jest.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncFilterStrict(inputArr, filter);

    expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
