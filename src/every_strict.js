import asyncForEachStrict from './forEach_strict';

export default function asyncEveryStrict(arr, fn) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-shadow
    asyncForEachStrict(arr, (cur, idx, arr) => new Promise((resolve2) => {
      fn(cur, idx, arr).then((result) => {
        if (!result) {
          resolve(false);
        }
        resolve2();
      });
    }))
      .then(() => { resolve(true); });
  });
}
