import asyncForEachStrict from './forEach_strict';

export default function asyncEveryStrict(arr, fn) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-shadow
    asyncForEachStrict(arr, async (cur, idx, arr) => {
      const result = await fn(cur, idx, arr);

      if (!result) {
        resolve(false);
      }
    }).then(() => {
      resolve(true);
    });
  });
}
