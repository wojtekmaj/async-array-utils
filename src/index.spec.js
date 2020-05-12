import {
  asyncForEach,
  asyncForEachStrict,
  asyncMap,
  asyncMapStrict,
  asyncReduce,
} from './index';

describe('index', () => {
  it('has asyncForEach exported properly', () => {
    expect(asyncForEach).toBeInstanceOf(Function);
  });

  it('has asyncForEachStrict exported properly', () => {
    expect(asyncForEachStrict).toBeInstanceOf(Function);
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
});
