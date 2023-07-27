import asyncMap from './map.js';

export default function asyncForEach<T, U>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<U>,
): Promise<void> {
  return new Promise((resolve, reject) => {
    asyncMap(arr, fn)
      .then(() => resolve())
      .catch(reject);
  });
}
