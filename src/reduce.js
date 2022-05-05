import asyncForEachStrict from './forEach_strict';

export default function asyncReduce(arr, fn, initialValue) {
  let temp = initialValue;

  return new Promise((resolve, reject) => {
    asyncForEachStrict(
      arr,
      (cur, idx) =>
        new Promise((resolve2, reject2) => {
          fn(temp, cur, idx)
            .then((result) => {
              temp = result;
              resolve2();
            })
            .catch(reject2);
        }),
    )
      .then(() => {
        resolve(temp);
      })
      .catch(reject);
  });
}
