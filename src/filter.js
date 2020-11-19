import asyncForEach from './forEach';

export default function asyncSome(arr, fn) {
  const result = [];

  return asyncForEach(arr, (cur, idx, arr2) => new Promise((resolve) => {
    fn(cur, idx, arr2).then((cond) => {
      if (cond) {
        result[idx] = cur;
      }
      resolve();
    });
  }))
    .then(() => result.filter((cur, idx) => idx in result));
}
