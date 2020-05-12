import asyncMapStrict from './map_strict';

import {
  doubleInputArr,
  duplicate,
  duplicateInRandomTime,
  inputArr,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
} from '../test-utils';

describe('asyncMapStrict()', () => {
  it.skip('assertions below are valid for synchronous .map()', () => {
    const mapper = jest.fn().mockImplementation(duplicate);

    inputArr.map(mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it('maps values properly', async () => {
    const mapper = jest.fn().mockImplementation(duplicateInRandomTime);

    await asyncMapStrict(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    inputArr.forEach(mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it('maps values properly with side effects', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    await asyncMapStrict(inputArr, mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const mapper = jest.fn().mockImplementation(duplicate);

    const result = inputArr.map(mapper);

    expect(result).toEqual(doubleInputArr);
  });

  it('returns result properly', async () => {
    const mapper = jest.fn().mockImplementation(duplicateInRandomTime);

    const result = await asyncMapStrict(inputArr, mapper);

    expect(result).toEqual(doubleInputArr);
  });
});
