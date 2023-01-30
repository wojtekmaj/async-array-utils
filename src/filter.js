import asyncForEach from './forEach';

export default function asyncFilter(arr, fn) {
  const result = [];

  return asyncForEach(
    arr,
    (cur, idx, arr2) =>
      new Promise((resolve, reject) => {
        fn(cur, idx, arr2)
          .then((cond) => {
            if (cond) {
              result[idx] = cur;
            }
            resolve();
          })
          .catch(reject);
      }),
  ).then(() => result.filter((cur, idx) => idx in result));
}
