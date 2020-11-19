import asyncForEach from './forEach';

export default function asyncSome(arr, fn) {
  const result = [];

  // eslint-disable-next-line no-shadow
  return asyncForEach(arr, (cur, idx, arr) => new Promise((resolve) => {
    fn(cur, idx, arr).then((cond) => {
      if (cond) {
        result[idx] = cur;
      }
      resolve();
    });
  }))
    .then(() => result.filter((cur, idx) => idx in result));
}
