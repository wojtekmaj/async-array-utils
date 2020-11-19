import asyncMap from './map';

export default function asyncForEachStrict(arr, fn) {
  return new Promise((resolve) => {
    asyncMap(arr, fn).then(() => resolve());
  });
}
