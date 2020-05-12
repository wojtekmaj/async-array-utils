export default async function asyncMapStrict(arr, fn) {
  const result = [];

  for (let idx = 0; idx < arr.length; idx += 1) {
    const cur = arr[idx];

    // eslint-disable-next-line no-await-in-loop
    result.push(await fn(cur, idx, arr));
  }

  return result;
}
