export default function asyncMap(arr, fn) {
  return Promise.all(arr.map(fn));
}
