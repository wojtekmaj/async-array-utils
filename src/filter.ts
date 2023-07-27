import asyncForEach from './forEach.js';

function asyncFilter<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<false>,
): Promise<never[]>;
function asyncFilter<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<boolean>,
): Promise<T[]>;
function asyncFilter<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<boolean>,
): Promise<T[] | never[]> {
  const result: T[] = [];

  return asyncForEach<T, void>(
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

export default asyncFilter;
