import asyncMapStrict from './map_strict';

export default function asyncForEachStrict(arr, fn) {
  return new Promise((resolve, reject) => {
    asyncMapStrict(arr, fn)
      .then(() => resolve())
      .catch(reject);
  });
}
