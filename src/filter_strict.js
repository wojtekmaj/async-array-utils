import asyncForEachStrict from './forEach_strict';

export default function asyncFilterStrict(arr, fn) {
  const result = [];

  // eslint-disable-next-line no-shadow
  return asyncForEachStrict(arr, async (cur, idx, arr) => {
    const cond = await fn(cur, idx, arr);

    if (cond) {
      result[idx] = cur;
    }
  })
    .then(() => result.filter((cur, idx) => idx in result));
}
