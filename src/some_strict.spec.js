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

  it('assertions below are valid for synchronous .map()', () => {
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
