import asyncForEachStrict from './forEach_strict';

function asyncFindIndex<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<false>,
): Promise<-1>;
function asyncFindIndex<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<boolean>,
): Promise<number>;
function asyncFindIndex<T>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<boolean>,
): Promise<number> {
  let resolved: boolean;
  return new Promise<number>((resolve, reject) => {
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
                resolve(idx);
                resolved = true;
              }
              resolve2();
            })
            .catch(reject2);
        }),
    )
      .then(() => {
        resolve(-1);
        resolved = true;
      })
      .catch((error) => {
        reject(error);
        resolved = true;
      });
  });
}

export default asyncFindIndex;
