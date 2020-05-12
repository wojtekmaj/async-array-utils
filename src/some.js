import asyncForEach from './forEach';

export default function asyncSome(arr, fn) {
  return new Promise((resolve) => {
    let resolved = false;
    asyncForEach(arr, (cur, idx, arr2) => new Promise((resolve2) => {
      fn(cur, idx, arr2).then((result) => {
        if (result) {
          resolved = true;
          resolve(true);
        }
        resolve2();
      });
    })).then(() => {
      if (!resolved) {
        resolve(false);
      }
    });
  });
}
