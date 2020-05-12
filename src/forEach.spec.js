import asyncForEach from './forEach';

import {
  inputArr,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
} from '../test-utils';

describe('asyncForEach()', () => {
  it.skip('assertions below are valid for synchronous .forEach()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    inputArr.forEach(mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el) => {
      expect(arr).toContain(el * 2);
    });
  });

  it('iterates through an array properly', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    await asyncForEach(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el) => {
      expect(arr).toContain(el * 2);
    });
  });

  it.skip('assertions below are valid for synchronous .forEach()', () => {
    const [, pushDuplicate] = makePushDuplicate();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    const result = inputArr.forEach(mapper);

    expect(result).toBe(undefined);
  });

  it('returns undefined', async () => {
    const [, pushDuplicate] = makePushDuplicate();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    const result = await asyncForEach(inputArr, mapper);

    expect(result).toBe(undefined);
  });
});
