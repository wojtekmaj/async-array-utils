import asyncSomeStrict from './some_strict';

import {
  inputArr,
  largerThanTwo,
  largerThanTwoInRandomTime,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
} from '../test-utils';

const firstElementLargerThanTwo = inputArr.findIndex(largerThanTwo);

describe('asyncSomeStrict()', () => {
  it('assertions below are valid for synchronous .some()', () => {
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

  it('assertions below are valid for synchronous .some()', () => {
    const mapper = jest.fn().mockImplementation(largerThanTwo);

    const result = inputArr.some(mapper);

    expect(result).toEqual(true);
  });

  it('returns truthy result properly', async () => {
    const mapper = jest.fn().mockImplementation(largerThanTwoInRandomTime);

    const result = await asyncSomeStrict(inputArr, mapper);

    expect(result).toEqual(true);
  });

  it('assertions below are valid for synchronous .some()', () => {
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
