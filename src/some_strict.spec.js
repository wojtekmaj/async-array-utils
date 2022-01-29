import asyncSomeStrict from './some_strict';

import {
  doubleInputArr,
  inputArr,
  largerThanTwo,
  largerThanTwoInRandomTime,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
  makeDelayed,
  getTimer,
} from '../test-utils';

const firstElementLargerThanTwo = inputArr.findIndex(largerThanTwo);

describe('asyncSomeStrict()', () => {
  it('example from README works as described', async () => {
    const indexes = [];

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

    expect(timeElapsed).toBeGreaterThanOrEqual(delay);
    expect(timeElapsed).toBeLessThan(delay * 1.25 * 3);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = jest.fn().mockImplementation(largerThanTwo);

    inputArr.some(mapper);

    expect.assertions(1 + firstElementLargerThanTwo);

    expect(mapper).toHaveBeenCalledTimes(firstElementLargerThanTwo + 1);
    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates over values properly', async () => {
    const mapper = jest.fn().mockImplementation(largerThanTwoInRandomTime);

    await asyncSomeStrict(inputArr, mapper);

    expect.assertions(1 + firstElementLargerThanTwo);

    expect(mapper).toHaveBeenCalledTimes(firstElementLargerThanTwo + 1);
    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    inputArr.some(mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it('iterates through an array properly with side effects', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    await asyncSomeStrict(inputArr, mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = jest.fn().mockImplementation(largerThanTwo);

    const result = inputArr.some(mapper);

    expect(result).toEqual(true);
  });

  it('returns truthy result properly', async () => {
    const mapper = jest.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncSomeStrict(inputArr, mapper);

    expect(result).toEqual(true);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = jest.fn().mockImplementation(largerThanOneHundred);

    const result = inputArr.some(mapper);

    expect(result).toEqual(false);
  });

  it('returns falsy result properly', async () => {
    const mapper = jest.fn().mockImplementation(largerThanOneHundredInRandomTime);

    const result = await asyncSomeStrict(inputArr, mapper);

    expect(result).toEqual(false);
  });
});
