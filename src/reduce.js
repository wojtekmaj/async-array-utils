export default async function asyncReduce(arr, fn, initialValue) {
  let temp = initialValue;

  for (let idx = 0; idx < arr.length; idx += 1) {
    const cur = arr[idx];

    // eslint-disable-next-line no-await-in-loop
    temp = await fn(temp, cur, idx);
  }

  return temp;
}
