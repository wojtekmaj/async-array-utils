import asyncMapStrict from './map_strict';

export default async function asyncForEachStrict(arr, fn) {
  await asyncMapStrict(arr, fn);
}
