import { describe, expect, it } from 'vitest';
import {
  asyncFilter,
  asyncFilterStrict,
  asyncFind,
  asyncFindIndex,
  asyncForEach,
  asyncForEachStrict,
  asyncEvery,
  asyncEveryStrict,
  asyncMap,
  asyncMapStrict,
  asyncReduce,
  asyncSome,
  asyncSomeStrict,
} from './index.js';

describe('index', () => {
  it('has asyncFilter exported properly', () => {
    expect(asyncFilter).toBeInstanceOf(Function);
  });

  it('has asyncFilterStrict exported properly', () => {
    expect(asyncFilterStrict).toBeInstanceOf(Function);
  });

  it('has asyncFind exported properly', () => {
    expect(asyncFind).toBeInstanceOf(Function);
  });

  it('has asyncFindIndex exported properly', () => {
    expect(asyncFindIndex).toBeInstanceOf(Function);
  });

  it('has asyncForEach exported properly', () => {
    expect(asyncForEach).toBeInstanceOf(Function);
  });

  it('has asyncForEachStrict exported properly', () => {
    expect(asyncForEachStrict).toBeInstanceOf(Function);
  });

  it('has asyncEvery exported properly', () => {
    expect(asyncEvery).toBeInstanceOf(Function);
  });

  it('has asyncEveryStrict exported properly', () => {
    expect(asyncEveryStrict).toBeInstanceOf(Function);
  });

  it('has asyncMap exported properly', () => {
    expect(asyncMap).toBeInstanceOf(Function);
  });

  it('has asyncMapStrict exported properly', () => {
    expect(asyncMapStrict).toBeInstanceOf(Function);
  });

  it('has asyncReduce exported properly', () => {
    expect(asyncReduce).toBeInstanceOf(Function);
  });

  it('has asyncSome exported properly', () => {
    expect(asyncSome).toBeInstanceOf(Function);
  });

  it('has asyncSomeStrict exported properly', () => {
    expect(asyncSomeStrict).toBeInstanceOf(Function);
  });
});
