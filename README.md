[![npm](https://img.shields.io/npm/v/@wojtekmaj/async-array-utils.svg)](https://www.npmjs.com/package/@wojtekmaj/async-array-utils) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/async-array-utils.svg) [![CI](https://github.com/wojtekmaj/async-array-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/wojtekmaj/async-array-utils/actions)

# Async-Array-Utils

A collection of array-related async utilities.

## tl;dr

- Install by executing `npm install @wojtekmaj/async-array-utils` or `yarn add @wojtekmaj/async-array-utils`.
- Import by adding `import * as asyncArrayUtils from '@wojtekmaj/async-array-utils'`.
- Do stuff with it!
  ```ts
  const asyncMappedArr = await asyncMap([1, 2, 3], async (x) => x * 2);
  ```

## User guide

### Table of contents

- [`asyncEvery()`](#asyncEvery)
- [`asyncEveryStrict()`](#asyncEveryStrict)
- [`asyncFilter()`](#asyncFilter)
- [`asyncFilterStrict()`](#asyncFilterStrict)
- [`asyncFind()`](#asyncFind)
- [`asyncFindIndex()`](#asyncFindIndex)
- [`asyncForEach()`](#asyncForEach)
- [`asyncForEachStrict()`](#asyncForEachStrict)
- [`asyncMap()`](#asyncMap)
- [`asyncMapStrict()`](#asyncMapStrict)
- [`asyncReduce()`](#asyncReduce)
- [`asyncSome()`](#asyncSome)
- [`asyncSomeStrict()`](#asyncSomeStrict)

### `asyncEvery()`

Tests whether all elements in the array pass the test implemented by the provided asynchronous function. It returns a Boolean value.

Note: For optimization purposes, all iterations are ran concurrently. If you rely on any side effects, consider `asyncEveryStrict()` instead.

#### Sample usage

```ts
import { asyncEvery } from '@wojtekmaj/async-array-utils';

const largerThanZero = await asyncEvery([1, 2, 3], async (el) => el > 0); // true
```

### `asyncEveryStrict()`

Like `asyncEvery()`, but runs iterations non-concurrently.

#### Sample usage

```ts
import { asyncEveryStrict } from '@wojtekmaj/async-array-utils';

const indexes = [];
const largerThanZero = await asyncEveryStrict([1, 2, 3], async (el, index) => {
  indexes.push(index);
  return el > 0;
}); // true
console.log(indexes); // [0, 1, 2]
```

### `asyncFilter()`

Creates a new array with all elements that pass the test implemented by the provided asynchronous function.

Note: For optimization purposes, all iterations are ran concurrently. If you rely on any side effects, consider `asyncFilterStrict()` instead.

#### Sample usage

```ts
import { asyncFilter } from '@wojtekmaj/async-array-utils';

const asyncFilteredArr = await asyncFilter([1, 2, 3], async (el) => el > 1); // [2, 3]
```

### `asyncFilterStrict()`

Like `asyncFilter()`, but runs iterations non-concurrently.

#### Sample usage

```ts
import { asyncFilterStrict } from '@wojtekmaj/async-array-utils';

const indexes = [];
const asyncFilteredArr = await asyncFilterStrict([1, 2, 3], async (el, index) => {
  indexes.push(index);
  return el > 1;
}); // [2, 3]
console.log(indexes); // [0, 1, 2]
```

### `asyncFind()`

Returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, `undefined` is returned.

#### Sample usage

```ts
import { asyncFind } from '@wojtekmaj/async-array-utils';

const asyncFoundEl = await asyncFind([1, 2, 3], async (el) => el > 1); // 2
```

### `asyncFindIndex()`

Returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, `-1` is returned.

#### Sample usage

```ts
import { asyncFindIndex } from '@wojtekmaj/async-array-utils';

const asyncFoundIndex = await asyncFindIndex([1, 2, 3], async (el) => el > 1); // 1
```

### `asyncForEach()`

Executes a provided asynchronous function once for each array element.

Note: For optimization purposes, all iterations are ran concurrently. If you rely on any side effects, consider `asyncForEachStrict()` instead.

#### Sample usage

```ts
import { asyncForEach } from '@wojtekmaj/async-array-utils';

await asyncForEach([1, 2, 3], async (el) => {
  console.log(el * 2);
}); // undefined; 3 console.logs
```

### `asyncForEachStrict()`

Like `asyncForEach()`, but runs iterations non-concurrently.

#### Sample usage

```ts
import { asyncForEachStrict } from '@wojtekmaj/async-array-utils';

const indexes = [];
await asyncForEachStrict([1, 2, 3], async (el, index) => {
  indexes.push(index);
  console.log(el * 2);
}); // undefined; 3 console.logs
console.log(indexes); // [0, 1, 2]
```

### `asyncMap()`

Creates a new array populated with the results of calling a provided asynchronous function on every element in the calling array.

Note: For optimization purposes, all iterations are ran concurrently. If you rely on any side effects, consider `asyncMapStrict()` instead.

#### Sample usage

```ts
import { asyncMap } from '@wojtekmaj/async-array-utils';

const asyncMappedArr = await asyncMap([1, 2, 3], async (el) => el * 2); // [2, 4, 6]
```

### `asyncMapStrict()`

Like `asyncMap()`, but runs iterations non-concurrently.

#### Sample usage

```ts
import { asyncMapStrict } from '@wojtekmaj/async-array-utils';

const indexes = [];
const asyncMappedArr = await asyncMapStrict([1, 2, 3], async (el, index) => {
  indexes.push(index);
  return el * 2;
}); // [2, 4, 6]
console.log(indexes); // [0, 1, 2]
```

### `asyncReduce()`

Executes a reducer asynchronous function (that you provide) on each element of the array, resulting in a single output value.

#### Sample usage

```ts
import { asyncReduce } from '@wojtekmaj/async-array-utils';

const result = await asyncReduce(
  [1, 2, 3],
  async (tmp, cur, idx) => {
    return tmp + cur;
  },
  0,
); // 6
```

### `asyncSome()`

Tests whether at least one element in the array pass the test implemented by the provided asynchronous function. It returns a Boolean value.

Note: For optimization purposes, all iterations are ran concurrently. If you rely on any side effects or execution order, consider `asyncMapStrict()` instead.

#### Sample usage

```ts
import { asyncSome } from '@wojtekmaj/async-array-utils';

const largerThanZero = await asyncSome([1, 2, 3], async (el) => el > 0); // true
```

### `asyncSomeStrict()`

Like `asyncSome()`, but runs iterations non-concurrently.

#### Sample usage

```ts
import { asyncSomeStrict } from '@wojtekmaj/async-array-utils';

const indexes = [];
const largerThanZero = await asyncSomeStrict([1, 2, 3], async (el, index) => {
  indexes.push(index);
  return el > 0;
}); // true
console.log(indexes); // [0]
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td >
      <img src="https://avatars.githubusercontent.com/u/5426427?v=4&s=128" width="64" height="64" alt="Wojciech Maj">
    </td>
    <td>
      <a href="https://github.com/wojtekmaj">Wojciech Maj</a>
    </td>
  </tr>
</table>
