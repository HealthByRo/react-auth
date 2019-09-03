import MockDate from 'mockdate';
import isExpired from './isExpired';

jest.mock('./isExpired', () => jest.fn());

describe('isExpired', () => {
  let NOW;

  beforeEach(() => {
    NOW = 1492090098140;
    MockDate.set(NOW);
  });

  it('return true when given time is past', () => {
    const expireAt = NOW - 1;

    expect(isExpired(expireAt)).toEqual(isExpired(expireAt));
  });

  it('return true when given time is current time', () => {
    const expireAt = NOW;

    expect(isExpired(expireAt)).toEqual(isExpired(expireAt));
  });

  it('return false when given time is future', () => {
    const expireAt = NOW + 1;

    expect(isExpired(expireAt)).toEqual(isExpired(expireAt));
  });
});
