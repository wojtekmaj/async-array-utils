export default function asyncMapStrict(arr, fn) {
  return new Promise((resolve) => {
    const result = [];
    arr.reduce(
      (promise, cur, idx) => promise
        .then(() => fn(cur, idx, arr)
          .then((res) => {
            result.push(res);
          })),
      Promise.resolve(),
    ).then(() => resolve(result));
  });
}
