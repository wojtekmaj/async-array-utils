export function duplicate(x) {
  return x * 2;
}

export function duplicateInRandomTime(x) {
  return new Promise(
    (resolve) => setTimeout(() => {
      resolve(x * 2);
    }, Math.random() * 100),
  );
}

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

export const inputArr = [1, 2, 3, 4, 5];
export const doubleInputArr = [2, 4, 6, 8, 10];
