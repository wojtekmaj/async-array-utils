export default function asyncMapStrict<T, U>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<U>,
): Promise<U[]> {
  return new Promise((resolve, reject) => {
    const result: U[] = [];
    arr
      .reduce(
        (promise, cur, idx) =>
          promise.then(() =>
            fn(cur, idx, arr).then((res) => {
              result.push(res);
            }),
          ),
        Promise.resolve(),
      )
      .then(() => resolve(result))
      .catch(reject);
  });
}
