import asyncForEach from './forEach';

import {
  getTimer,
  inputArr,
  makeDelayed,
  makePushDuplicate,
  makePushDuplicateInRandomTime,
  throws,
} from '../test-utils';

describe('asyncForEach()', () => {
  it('example from README works as described', async () => {
    const consoleLog = jest.fn();

    await asyncForEach([1, 2, 3], async (el) => {
      consoleLog(el * 2);
    }); // undefined; 3 console.logs

    expect(consoleLog).toHaveBeenCalledTimes(3);
    expect(consoleLog).toHaveBeenCalledWith(2);
    expect(consoleLog).toHaveBeenCalledWith(4);
    expect(consoleLog).toHaveBeenCalledWith(6);
  });

  it('takes exactly the time necessary to execute', async () => {
    const delay = 100;

    const timer = getTimer();

    timer.start();

    await asyncForEach(
      [1, 2, 3],
      makeDelayed((el) => el * 2, delay),
    );

    const timeElapsed = timer.stop();

    expect(timeElapsed).toBeGreaterThanOrEqual(delay);
    expect(timeElapsed).toBeLessThan(delay * 1.25);
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
    const [, pushDuplicate] = makePushDuplicateInRandomTime();
    const mapper = jest.fn().mockImplementation(pushDuplicate);

    const result = await asyncForEach(inputArr, mapper);

    expect(result).toBe(undefined);
  });

  it.skip('assertions below are valid for synchronous .forEach()', () => {
    const mapper = jest.fn().mockImplementation(throws);

    expect(() => inputArr.forEach(mapper)).toThrow('Some error');
  });

  it('throws if function passed throws', async () => {
    const mapper = jest.fn().mockImplementation(throws);

    await expect(() => asyncForEach(inputArr, mapper)).rejects.toThrow('Some error');
  });
});
