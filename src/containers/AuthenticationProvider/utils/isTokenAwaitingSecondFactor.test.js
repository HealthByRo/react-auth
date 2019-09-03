import isTokenAwaitingSecondFactor from './isTokenAwaitingSecondFactor';

describe('isTokenAwaitingSecondFactor', () => {
  it('returns false when passed object does not contain status', () => {
    expect(isTokenAwaitingSecondFactor({})).toBe(false);
  });

  it('returns false when passed object contains status but is not equal to "awaiting_second_factor"', () => {
    expect(isTokenAwaitingSecondFactor({ status: 'XYZ' })).toBe(false);
  });

  it('returns true when passed object contains status and is equal to "awaiting_second_factor"', () => {
    expect(isTokenAwaitingSecondFactor({ status: 'awaiting_second_factor' })).toBe(true);
  });
});
