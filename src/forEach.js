import asyncMap from './map';

export default async function asyncForEach(arr, fn) {
  await asyncMap(arr, fn);
}
