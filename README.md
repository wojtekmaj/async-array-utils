# async-array-utils
A collection of array-related async utilities.

## tl;dr
* Install by executing `npm install @wojtekmaj/async-array-utils` or `yarn add @wojtekmaj/async-array-utils`.
* Import by adding `import * as asyncArrayUtils from '@wojtekmaj/async-array-utils'`.
* Do stuff with it!
    ```js
    const asyncMappedArr = await asyncMap([1, 2, 3], async (x) => x * 2);
    ```

## User guide

### General utils

#### `asyncMap()`

Creates a new array populated with the results of calling a provided asynchronous function on every element in the calling array.

Note: For optimization purposes, all iterations are ran concurrently. If you rely on any side effects, consider `asyncMapStrict()` instead.

##### Sample usage

```js
import { asyncMap } from '@wojtekmaj/async-array-utils';

const asyncMappedArr = await asyncMap([1, 2, 3], async (el, index) => el * 2); // [2, 4, 6]
```

#### `asyncMapStrict()`

Like `asyncMap()`, but runs iterations non-concurrently.

##### Sample usage

```js
import { asyncMapStrict } from '@wojtekmaj/async-array-utils';

const indexes = [];
await asyncMapStrict([1, 2, 3], async (el, index) => { indexes.push(index); return el * 2; }); // [2, 4, 6]
console.log(indexes); // [0, 1, 2]
```

#### `asyncForEach()`

Executes a provided asynchronous function once for each array element.

Note: For optimization purposes, all iterations are ran concurrently. If you rely on any side effects, consider `asyncForEachStrict()` instead.

##### Sample usage

```js
import { asyncForEach } from '@wojtekmaj/async-array-utils';

await asyncForEach(
  [1, 2, 3],
  async (el) => { console.log(el * 2); }
); // undefined; 3 console.logs
```

#### `asyncForEachStrict()`

Like `asyncForEach()`, but runs iterations non-concurrently.

##### Sample usage

```js
import { asyncForEachStrict } from '@wojtekmaj/async-array-utils';

const indexes = [];
await asyncForEachStrict(
  [1, 2, 3],
  async (el) => { indexes.push(index); console.log(el * 2); }
); // undefined; 3 console.logs
console.log(indexes); // [0, 1, 2]
```

#### `asyncReduce()`

Executes a reducer asynchronous function (that you provide) on each element of the array, resulting in a single output value.

##### Sample usage

```js
import { asyncReduce } from '@wojtekmaj/async-array-utils';

const result = await asyncReduce(
  [1, 2, 3],
  async (tmp, cur, idx) => { return tmp + cur },
  0
); // 6
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
