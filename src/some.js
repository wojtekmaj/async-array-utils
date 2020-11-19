import asyncForEach from './forEach';

export default function asyncSome(arr, fn) {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-shadow
    asyncForEach(arr, (cur, idx, arr) => new Promise((resolve2) => {
      fn(cur, idx, arr).then((result) => {
        if (result) {
          resolve(true);
        }
        resolve2();
      });
    }))
      .then(() => { resolve(false); });
  });
}
