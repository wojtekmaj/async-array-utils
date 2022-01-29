import asyncForEachStrict from './forEach_strict';

export default function asyncSomeStrict(arr, fn) {
  let resolved;
  return new Promise((resolve) => {
    asyncForEachStrict(
      arr,
      (cur, idx, arr2) =>
        new Promise((resolve2) => {
          if (resolved) {
            return;
          }
          fn(cur, idx, arr2).then((result) => {
            if (result) {
              resolve(true);
              resolved = true;
            }
            resolve2();
          });
        }),
    ).then(() => {
      resolve(false);
      resolved = true;
    });
  });
}
