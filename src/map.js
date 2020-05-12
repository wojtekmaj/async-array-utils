export default async function asyncMap(arr, fn) {
  return Promise.all(arr.map(fn));
}
