export async function asyncMap(arr, fn) {
  return Promise.all(arr.map(fn));
}

export async function asyncMapStrict(arr, fn) {
  const result = [];

  for (let idx = 0; idx < arr.length; idx += 1) {
    const cur = arr[idx];

    // eslint-disable-next-line no-await-in-loop
    result.push(await fn(cur, idx, arr));
  }

  return result;
}

export async function asyncForEach(arr, fn) {
  await asyncMap(arr, fn);
}

export async function asyncForEachStrict(arr, fn) {
  await asyncMapStrict(arr, fn);
}

export async function asyncReduce(arr, fn, initialValue) {
  let temp = initialValue;

  for (let idx = 0; idx < arr.length; idx += 1) {
    const cur = arr[idx];

    // eslint-disable-next-line no-await-in-loop
    temp = await fn(temp, cur, idx);
  }

  return temp;
}
