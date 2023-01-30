import asyncForEachStrict from './forEach_strict';

export default function asyncFilterStrict<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<boolean>,
): Promise<T[]> {
  const result: T[] = [];

  return asyncForEachStrict<T, void>(
    arr,
    (cur, idx, arr2) =>
      new Promise<void>((resolve, reject) => {
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
