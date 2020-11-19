import asyncForEachStrict from './forEach_strict';

export default function asyncReduce(arr, fn, initialValue) {
  let temp = initialValue;

  return new Promise((resolve) => {
    // eslint-disable-next-line no-shadow
    asyncForEachStrict(arr, (cur, idx) => new Promise((resolve2) => {
      // eslint-disable-next-line no-await-in-loop
      fn(temp, cur, idx).then((result) => { temp = result; resolve2(); });
    }))
      .then(() => { resolve(temp); });
  });
}
