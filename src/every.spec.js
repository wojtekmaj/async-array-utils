import asyncEvery from './every';

import {
  inputArr,
  largerThanOneHundred,
  largerThanOneHundredInRandomTime,
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
    const largerThanZero = await asyncEvery([1, 2, 3], async (el) => el > 0);

    expect(largerThanZero).toBe(true);
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

    await asyncEvery(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = jest.fn().mockImplementation(largerOrEqualThanZero);

    const result = inputArr.every(mapper);

    expect(result).toEqual(true);
  });

  it('returns truthy result properly', async () => {
    const mapper = jest.fn().mockImplementation(largerOrEqualThanZeroInRandomTime);

    const result = await asyncEvery(inputArr, mapper);

    expect(result).toEqual(true);
  });

  it.skip('assertions below are valid for synchronous .every()', () => {
    const mapper = jest.fn().mockImplementation(largerThanOneHundred);

    const result = inputArr.every(mapper);

    expect(result).toEqual(false);
  });

  it('returns falsy result properly', async () => {
    const mapper = jest.fn().mockImplementation(largerThanOneHundredInRandomTime);

    const result = await asyncEvery(inputArr, mapper);

    expect(result).toEqual(false);
  });
});
