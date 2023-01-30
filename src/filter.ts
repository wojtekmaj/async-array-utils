import asyncForEach from './forEach';

export default function asyncFilter<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<boolean>,
): Promise<T[]> {
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
