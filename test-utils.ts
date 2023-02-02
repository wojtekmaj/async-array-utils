export function getRandomTime() {
  return Math.random() * 100;
}

export function getTimer() {
  let startTime: Date;

  function start() {
    startTime = new Date();
  }

  function stop() {
    const endTime = new Date();

    return endTime.getTime() - startTime.getTime();
  }

  return { start, stop };
}

export function makeDelayed<T extends any[], R>(
  fn: (...args: T) => R,
  delay = getRandomTime(),
): (...args: T) => Promise<R> {
  return function delayedFunction(...args) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(fn(...args));
      }, delay),
    );
  };
}

export function duplicate(x: number) {
  return x * 2;
}

export const duplicateInRandomTime = makeDelayed(duplicate);

export function largerThanTwo(x: number) {
  return x > 2;
}

export const largerThanTwoInRandomTime = makeDelayed(largerThanTwo);

export function largerThanOneHundred(x: number) {
  return x > 100;
}

export const largerThanOneHundredInRandomTime = makeDelayed(largerThanOneHundred);

export function makePushDuplicate(): [number[], (x: number) => void] {
  const arr: number[] = [];

  function pushDuplicate(x: number) {
    arr.push(x * 2);
  }

  return [arr, pushDuplicate];
}

export function makePushDuplicateInRandomTime(): [number[], (x: number) => Promise<void>] {
  const arr: number[] = [];

  async function pushDuplicate(x: number) {
    arr.push(await duplicateInRandomTime(x));
  }

  return [arr, pushDuplicate];
}

export function throws() {
  throw new Error('Some error');
}

export const inputArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const doubleInputArr = inputArr.map(duplicate);
