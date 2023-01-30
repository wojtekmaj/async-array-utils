import asyncForEachStrict from './forEach_strict';

export default function asyncReduce<T>(
  arr: T[],
  fn: (previousValue: T, currentValue: T, currentIndex: number) => Promise<T>,
): Promise<T>;
export default function asyncReduce<T>(
  arr: T[],
  fn: (previousValue: T, currentValue: T, currentIndex: number) => Promise<T>,
  initialValue: T,
): Promise<T>;
export default function asyncReduce<T, U>(
  arr: T[],
  fn: (previousValue: U, currentValue: T, currentIndex: number) => Promise<U>,
  initialValue: U,
): Promise<U>;
export default function asyncReduce<T, U>(
  arr: T[],
  fn: (previousValue: T | U | undefined, currentValue: T, currentIndex: number) => Promise<T | U>,
  initialValue?: T | U,
): Promise<T | U | undefined> {
  let temp = initialValue;

  return new Promise((resolve, reject) => {
    asyncForEachStrict(
      arr,
      (cur, idx) =>
        new Promise<void>((resolve2, reject2) => {
          fn(temp, cur, idx)
            .then((result) => {
              temp = result;
              resolve2();
            })
            .catch(reject2);
        }),
    )
      .then(() => {
        resolve(temp);
      })
      .catch(reject);
  });
}
