export default function asyncMap(arr, fn) {
  return new Promise((resolve, reject) => {
    Promise.all(arr.map(fn)).then(resolve).catch(reject);
  });
}
