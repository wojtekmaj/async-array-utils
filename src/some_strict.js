export default async function asyncSomeStrict(arr, fn) {
  for (let idx = 0; idx < arr.length; idx += 1) {
    const cur = arr[idx];

    // eslint-disable-next-line no-await-in-loop
    const result = await fn(cur, idx, arr);

    if (result) {
      return true;
    }
  }

  return false;
}
