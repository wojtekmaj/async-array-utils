import asyncForEachStrict from './forEach_strict';

export default function asyncEveryStrict(arr, fn) {
  return new Promise((resolve) => {
    asyncForEachStrict(arr, (cur, idx, arr2) => new Promise((resolve2) => {
      fn(cur, idx, arr2).then((result) => {
        if (!result) {
          resolve(false);
        }
        resolve2();
      });
    }))
      .then(() => { resolve(true); });
  });
}
