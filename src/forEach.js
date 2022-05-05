import asyncMap from './map';

export default function asyncForEach(arr, fn) {
  return new Promise((resolve, reject) => {
    asyncMap(arr, fn)
      .then(() => resolve())
      .catch(reject);
  });
}
