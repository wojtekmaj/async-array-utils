import asyncSome from './some';

import {
  inputArr,
  largerThanTwo,
  largerThanTwoInRandomTime,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
  getTimer,
  makeDelayed,
} from '../test-utils';

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

    await asyncSome([1, 2, 3], makeDelayed((el) => el < 0, delay));

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay);
    expect(timeElapsed).toBeLessThan(delay + 10);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = jest.fn().mockImplementation(largerThanTwo);

    inputArr.some(mapper);

    expect.assertions(firstElementLargerThanTwo);

    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates over values properly', async () => {
    const mapper = jest.fn().mockImplementation(largerThanTwoInRandomTime);

    await asyncSome(inputArr, mapper);

    expect.assertions(firstElementLargerThanTwo);

    inputArr.slice(0, firstElementLargerThanTwo).forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = jest.fn().mockImplementation(largerThanTwo);

    const result = inputArr.some(mapper);

    expect(result).toEqual(true);
  });

  it('returns truthy result properly', async () => {
    const mapper = jest.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncSome(inputArr, mapper);

    expect(result).toEqual(true);
  });

  it.skip('assertions below are valid for synchronous .some()', () => {
    const mapper = jest.fn().mockImplementation(largerThanOneHundred);

    const result = inputArr.some(mapper);

    expect(result).toEqual(false);
  });

  it('returns falsy result properly', async () => {
    const mapper = jest.fn().mockImplementation(largerThanOneHundredInRandomTime);

    const result = await asyncSome(inputArr, mapper);

    expect(result).toEqual(false);
  });
});
