import asyncMapStrict from './map_strict';

export default function asyncForEachStrict<T, U>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<U>,
): Promise<void> {
  return new Promise((resolve, reject) => {
    asyncMapStrict(arr, fn)
      .then(() => resolve())
      .catch(reject);
  });
}
