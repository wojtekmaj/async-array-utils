import asyncEveryStrict from './every_strict';

import {
  doubleInputArr,
  inputArr,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
} from '../test-utils';

function largerOrEqualThanZero(x) {
  return x >= 0;
}

function largerOrEqualThanZeroInRandomTime(x) {
  return new Promise(
    (resolve) => setTimeout(() => {
      resolve(x >= 0);
    }, Math.random() * 100),
  );
}

describe('asyncEvery()', () => {
  it('example from README works as described', async () => {
    const indexes = [];

    const largerThanZero = await asyncEveryStrict(
      [1, 2, 3],
      async (el, index) => {
        indexes.push(index);
        return el > 0;
      },
    );

    expect(largerThanZero).toBe(true);
    expect(indexes).toEqual([0, 1, 2]);
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = jest.fn().mockImplementation(largerOrEqualThanZero);

    inputArr.every(mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('iterates over values properly', async () => {
    const mapper = jest.fn().mockImplementation(largerOrEqualThanZeroInRandomTime);

    await asyncEveryStrict(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = jest.fn().mockImplementation((el) => {
      pushDuplicate(el);
      return largerOrEqualThanZero(el);
    });

    inputArr.every(mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it('iterates through an array properly with side effects', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = jest.fn().mockImplementation(async (el) => {
      await pushDuplicate(el);
      return largerOrEqualThanZero(el);
    });

    await asyncEveryStrict(inputArr, mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = jest.fn().mockImplementation(largerOrEqualThanZero);

    const result = inputArr.every(mapper);

    expect(result).toEqual(true);
  });

  it('returns truthy result properly', async () => {
    const mapper = jest.fn().mockImplementation(largerOrEqualThanZeroInRandomTime);

    const result = await asyncEveryStrict(inputArr, mapper);

    expect(result).toEqual(true);
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = jest.fn().mockImplementation(largerThanOneHundred);

    const result = inputArr.every(mapper);

    expect(result).toEqual(false);
  });

  it('returns falsy result properly', async () => {
    const mapper = jest.fn().mockImplementation(largerThanOneHundredInRandomTime);

    const result = await asyncEveryStrict(inputArr, mapper);

    expect(result).toEqual(false);
  });
});
