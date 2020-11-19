import asyncForEachStrict from './forEach_strict';

export default function asyncReduce(arr, fn, initialValue) {
  let temp = initialValue;

  return new Promise((resolve) => {
    asyncForEachStrict(arr, (cur, idx) => new Promise((resolve2) => {
      fn(temp, cur, idx).then((result) => {
        temp = result;
        resolve2();
      });
    }))
      .then(() => { resolve(temp); });
  });
}
