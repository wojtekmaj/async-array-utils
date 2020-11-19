export function getRandomTime() {
  return Math.random() * 100;
}

export function getTimer() {
  let startTime;

  function start() {
    startTime = new Date();
  }

  function stop() {
    const endTime = new Date();

    return endTime - startTime;
  }

  return { start, stop };
}

export function makeDelayed(fn, delay = getRandomTime()) {
  return function delayedFunction(x) {
    return new Promise(
      (resolve) => setTimeout(() => {
        resolve(fn(x));
      }, delay),
    );
  };
}

export function duplicate(x) {
  return x * 2;
}

export const duplicateInRandomTime = makeDelayed(duplicate);

export function largerThanTwo(x) {
  return x > 2;
}

export const largerThanTwoInRandomTime = makeDelayed(largerThanTwo);

export function largerThanOneHundred(x) {
  return x > 100;
}

export const largerThanOneHundredInRandomTime = makeDelayed(largerThanOneHundred);

export function makePushDuplicate() {
  const arr = [];

  function pushDuplicate(x) {
    arr.push(x * 2);
  }

  return [arr, pushDuplicate];
}

export function makePushDuplicateInRandomTime() {
  const arr = [];

  async function pushDuplicate(x) {
    arr.push(await duplicateInRandomTime(x));
  }

  return [arr, pushDuplicate];
}

export const inputArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const doubleInputArr = inputArr.map(duplicate);
