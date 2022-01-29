import asyncForEach from './forEach';

export default function asyncSome(arr, fn) {
  let resolved;
  return new Promise((resolve) => {
    asyncForEach(
      arr,
      (cur, idx, arr2) =>
        new Promise((resolve2) => {
          if (resolved) {
            return;
          }
          fn(cur, idx, arr2).then((result) => {
            if (!result) {
              resolve(false);
              resolved = true;
            }
            resolve2();
          });
        }),
    ).then(() => {
      resolve(true);
      resolved = true;
    });
  });
}
