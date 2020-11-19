import asyncForEachStrict from './forEach_strict';
import {
  doubleInputArr,
  inputArr,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
} from '../test-utils';

describe('asyncForEachStrict()', () => {
  it('example from README works as described', async () => {
    const consoleLog = jest.fn();
    const indexes = [];

    await asyncForEachStrict(
      [1, 2, 3],
      async (el, index) => {
        indexes.push(index);
        consoleLog(el * 2);
      },
    );

    expect(consoleLog).toHaveBeenCalledTimes(3);
    expect(consoleLog).toHaveBeenCalledWith(2);
    expect(consoleLog).toHaveBeenCalledWith(4);
    expect(consoleLog).toHaveBeenCalledWith(6);

    expect(indexes).toEqual([0, 1, 2]);
  });

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

    await asyncForEachStrict(inputArr, mapper);

    expect.assertions(1 + inputArr.length);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    inputArr.forEach((el) => {
      expect(arr).toContain(el * 2);
    });
  });

  it.skip('assertions below are valid for synchronous .forEach()', () => {
    const [arr, pushDuplicate] = makePushDuplicate();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    inputArr.forEach(mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
  });

  it('iterates through an array properly with side effects', async () => {
    const [arr, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    await asyncForEachStrict(inputArr, mapper);

    expect(mapper).toHaveBeenCalledTimes(inputArr.length);
    expect(arr).toEqual(doubleInputArr);
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

    const result = await asyncForEachStrict(inputArr, mapper);

    expect(result).toBe(undefined);
  });
});
