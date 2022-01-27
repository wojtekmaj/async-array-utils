import asyncForEach from './forEach';

export default function asyncSome(arr, fn) {
  return new Promise((resolve) => {
    asyncForEach(
      arr,
      (cur, idx, arr2) =>
        new Promise((resolve2) => {
          fn(cur, idx, arr2).then((result) => {
            if (!result) {
              resolve(false);
            }
            resolve2();
          });
        }),
    ).then(() => {
      resolve(true);
    });
  });
}
