import asyncForEachStrict from './forEach_strict.js';

function asyncFind<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<false>,
): Promise<undefined>;
function asyncFind<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<boolean>,
): Promise<T | undefined>;
function asyncFind<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<boolean>,
): Promise<T | undefined> {
  let resolved: boolean;
  return new Promise<T | undefined>((resolve, reject) => {
    asyncForEachStrict(
      arr,
      (cur, idx, arr2) =>
        new Promise<void>((resolve2, reject2) => {
          if (resolved) {
            return;
          }
          fn(cur, idx, arr2)
            .then((result) => {
              if (result) {
                resolve(cur);
                resolved = true;
              }
              resolve2();
            })
            .catch(reject2);
        }),
    )
      .then(() => {
        resolve(undefined);
        resolved = true;
      })
      .catch((error) => {
        reject(error);
        resolved = true;
      });
  });
}

export default asyncFind;
