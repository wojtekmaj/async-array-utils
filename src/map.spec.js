import asyncMap from './map';

import {
  doubleInputArr,
  duplicate,
  duplicateInRandomTime,
  inputArr,
} from '../test-utils';

describe('asyncMap()', () => {
  it('example from README works as described', async () => {
    const asyncMappedArr = await asyncMap([1, 2, 3], async (el) => el * 2); // [2, 4, 6]

    expect(asyncMappedArr).toEqual([2, 4, 6]);
  });

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

    await asyncMap(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el, idx) => {
      expect(mapper).toHaveBeenCalledWith(el, idx, inputArr);
    });
  });

  it.skip('assertions below are valid for synchronous .map()', () => {
    const mapper = jest.fn().mockImplementation(duplicate);

    const result = inputArr.map(mapper);

    expect(result).toEqual(doubleInputArr);
  });

  it('returns result properly', async () => {
    const mapper = jest.fn().mockImplementation(duplicateInRandomTime);

    const result = await asyncMap(inputArr, mapper);

    expect(result).toEqual(doubleInputArr);
  });
});
