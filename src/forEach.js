import asyncMap from './map';

export default function asyncForEach(arr, fn) {
  return new Promise((resolve) => {
    asyncMap(arr, fn).then(() => resolve());
  });
}
