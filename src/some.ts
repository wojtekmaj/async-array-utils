import asyncForEach from './forEach.js';

function asyncSome<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<true>,
): Promise<true>;
function asyncSome<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<false>,
): Promise<false>;
function asyncSome<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<boolean>,
): Promise<boolean>;
function asyncSome<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<boolean>,
): Promise<boolean> {
  let resolved: boolean;
  return new Promise((resolve, reject) => {
    asyncForEach(
      arr,
      (cur, idx, arr2) =>
        new Promise<void>((resolve2, reject2) => {
          if (resolved) {
            return;
          }
          fn(cur, idx, arr2)
            .then((result) => {
              if (result) {
                resolve(true);
                resolved = true;
              }
              resolve2();
            })
            .catch(reject2);
        }),
    )
      .then(() => {
        resolve(false);
        resolved = true;
      })
      .catch((error) => {
        reject(error);
        resolved = true;
      });
  });
}

export default asyncSome;
