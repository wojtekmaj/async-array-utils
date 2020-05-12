import asyncForEach from './forEach';

export default async function asyncSome(arr, fn) {
  return new Promise((resolve) => {
    let resolved = false;
    // eslint-disable-next-line no-shadow
    asyncForEach(arr, async (cur, idx, arr) => {
      const result = await fn(cur, idx, arr);

      if (!result) {
        resolved = true;
        resolve(false);
      }
    }).then(() => {
      if (!resolved) {
        resolve(true);
      }
    });
  });
}
