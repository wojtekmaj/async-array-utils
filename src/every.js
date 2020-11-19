import asyncForEach from './forEach';

export default function asyncSome(arr, fn) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-shadow
    asyncForEach(arr, async (cur, idx, arr) => {
      const result = await fn(cur, idx, arr);

      if (!result) {
        resolve(false);
      }
    }).then(() => {
      resolve(true);
    });
  });
}
