import asyncForEach from './forEach';

export default function asyncSome(arr, fn) {
  let resolved;
  return new Promise((resolve, reject) => {
    asyncForEach(
      arr,
      (cur, idx, arr2) =>
        new Promise((resolve2, reject2) => {
          if (resolved) {
            return;
          }
          fn(cur, idx, arr2)
            .then((result) => {
              if (!result) {
                resolve(false);
                resolved = true;
              }
              resolve2();
            })
            .catch(reject2);
        }),
    )
      .then(() => {
        resolve(true);
        resolved = true;
      })
      .catch((error) => {
        reject(error);
        resolved = true;
      });
  });
}
