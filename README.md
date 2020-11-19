[![npm](https://img.shields.io/npm/v/@wojtekmaj/async-array-utils.svg)](https://www.npmjs.com/package/@wojtekmaj/async-array-utils) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/async-array-utils.svg) [![CI](https://github.com/wojtekmaj/async-array-utils/workflows/CI/badge.svg)](https://github.com/wojtekmaj/async-array-utils/actions) ![dependencies](https://img.shields.io/david/wojtekmaj/async-array-utils.svg) ![dev dependencies](https://img.shields.io/david/dev/wojtekmaj/async-array-utils.svg) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# Async-Array-Utils
A collection of array-related async utilities.

## tl;dr
* Install by executing `npm install @wojtekmaj/async-array-utils` or `yarn add @wojtekmaj/async-array-utils`.
* Import by adding `import * as asyncArrayUtils from '@wojtekmaj/async-array-utils'`.
* Do stuff with it!
    ```js
    const asyncMappedArr = await asyncMap([1, 2, 3], async (x) => x * 2);
    ```

## User guide

### Table of contents

* [`asyncEvery()`](#asyncEvery)
* [`asyncForEach()`](#asyncForEach)
* [`asyncForEachStrict()`](#asyncForEachStrict)
* [`asyncMap()`](#asyncMap)
* [`asyncMapStrict()`](#asyncMapStrict)
* [`asyncReduce()`](#asyncReduce)
* [`asyncSome()`](#asyncSome)
* [`asyncSomeStrict()`](#asyncSomeStrict)

### `asyncEvery()`

Tests whether all elements in the array pass the test implemented by the provided asynchronous function. It returns a Boolean value.

#### Sample usage

```js
import { asyncEvery } from '@wojtekmaj/async-array-utils';

const largerThanZero = await asyncEvery([1, 2, 3], async (el) => el > 0); // true
```

### `asyncForEach()`

Executes a provided asynchronous function once for each array element.

Note: For optimization purposes, all iterations are ran concurrently. If you rely on any side effects, consider `asyncForEachStrict()` instead.

#### Sample usage

```js
import { asyncForEach } from '@wojtekmaj/async-array-utils';

await asyncForEach(
  [1, 2, 3],
  async (el) => { console.log(el * 2); }
); // undefined; 3 console.logs
```

### `asyncForEachStrict()`

Like `asyncForEach()`, but runs iterations non-concurrently.

#### Sample usage

```js
import { asyncForEachStrict } from '@wojtekmaj/async-array-utils';

const indexes = [];
await asyncForEachStrict(
  [1, 2, 3],
  async (el, index) => {
    indexes.push(index);
    console.log(el * 2);
  },
); // undefined; 3 console.logs
console.log(indexes); // [0, 1, 2]
```

### `asyncMap()`

Creates a new array populated with the results of calling a provided asynchronous function on every element in the calling array.

Note: For optimization purposes, all iterations are ran concurrently. If you rely on any side effects, consider `asyncMapStrict()` instead.

#### Sample usage

```js
import { asyncMap } from '@wojtekmaj/async-array-utils';

const asyncMappedArr = await asyncMap([1, 2, 3], async (el) => el * 2); // [2, 4, 6]
```

### `asyncMapStrict()`

Like `asyncMap()`, but runs iterations non-concurrently.

#### Sample usage

```js
import { asyncMapStrict } from '@wojtekmaj/async-array-utils';

const indexes = [];
await asyncMapStrict(
  [1, 2, 3],
  async (el, index) => {
    indexes.push(index);
    return el * 2;
  },
); // [2, 4, 6]
console.log(indexes); // [0, 1, 2]
```

### `asyncReduce()`

Executes a reducer asynchronous function (that you provide) on each element of the array, resulting in a single output value.

#### Sample usage

```js
import { asyncReduce } from '@wojtekmaj/async-array-utils';

const result = await asyncReduce(
  [1, 2, 3],
  async (tmp, cur, idx) => { return tmp + cur },
  0
); // 6
```

### `asyncSome()`

Tests whether at least one element in the array pass the test implemented by the provided asynchronous function. It returns a Boolean value.

Note: For optimization purposes, all iterations are ran concurrently. If you rely on any side effects or execution order, consider `asyncMapStrict()` instead.

#### Sample usage

```js
import { asyncSome } from '@wojtekmaj/async-array-utils';

const largerThanZero = await asyncSome([1, 2, 3], async (el) => el > 0); // true
```

### `asyncSomeStrict()`

Like `asyncSome()`, but runs iterations non-concurrently.

#### Sample usage

```js
import { asyncSomeStrict } from '@wojtekmaj/async-array-utils';

const indexes = [];
const largerThanZero = await asyncSomeStrict(
  [1, 2, 3],
  async (el, index) => {
    indexes.push(index);
    return el > 0;
  },
); // true
console.log(indexes); // [0, 1, 2]
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="http://wojtekmaj.pl">http://wojtekmaj.pl</a>
    </td>
  </tr>
</table>
