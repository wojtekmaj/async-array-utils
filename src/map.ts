export default function asyncMap<T, U>(
  arr: T[],
  fn: (cur: T, idx: number, arr: T[]) => Promise<U>,
): Promise<U[]> {
  return new Promise((resolve, reject) => {
    Promise.all(arr.map(fn)).then(resolve).catch(reject);
  });
}
