import {
  asyncMap,
  asyncMapStrict,
  asyncForEach,
  asyncForEachStrict,
  asyncReduce,
} from './index';

function duplicate(x) {
  return x * 2;
}

function duplicateInRandomTime(x) {
  return new Promise(
    (resolve) => setTimeout(() => {
      resolve(x * 2);
    }, Math.random() * 100),
  );
}

function makePushDuplicate() {
  const arr = [];

  function pushDuplicate(x) {
    arr.push(x * 2);
  }

  return [arr, pushDuplicate];
}

function makePushDuplicateInRandomTime() {
  const arr = [];

  async function pushDuplicate(x) {
    arr.push(await duplicateInRandomTime(x));
  }

  return [arr, pushDuplicate];
}

const inputArr = [1, 2, 3, 4, 5];
const doubleInputArr = [2, 4, 6, 8, 10];

describe('asyncMap()', () => {
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

describe('asyncForEachStrict()', () => {
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

describe('asyncReduce()', () => {
  it.skip('assertions below are valid for synchronous .reduce()', () => {
    const mapper = jest.fn().mockImplementation((temp, cur, idx) => [...temp, `${idx}:${cur}`]);

    const result = ['a', 'b', 'c'].reduce(mapper, ['start']);

    expect(mapper).toHaveBeenCalledTimes(3);
    expect(result).toEqual(['start', '0:a', '1:b', '2:c']);
  });

  it('reduces an array properly', async () => {
    const mapper = jest.fn().mockImplementation(async (temp, cur, idx) => [...temp, `${idx}:${cur}`]);

    const result = await asyncReduce(['a', 'b', 'c'], mapper, ['start']);

    expect(mapper).toHaveBeenCalledTimes(3);
    expect(result).toEqual(['start', '0:a', '1:b', '2:c']);
  });
});
