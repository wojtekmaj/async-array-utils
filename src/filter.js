import asyncForEach from './forEach';

export default function asyncSome(arr, fn) {
  const result = [];

  // eslint-disable-next-line no-shadow
  return asyncForEach(arr, async (cur, idx, arr) => {
    const cond = await fn(cur, idx, arr);

    if (cond) {
      result[idx] = cur;
    }
  })
    .then(() => result.filter((cur, idx) => idx in result));
}
