import isTokenValid from './isTokenValid';

describe('isTokenValid', () => {
  it('returns false when passed object does not contain status', () => {
    expect(isTokenValid({})).toBe(false);
  });

  it('returns false when passed object contains status but is not equal to "valid"', () => {
    expect(isTokenValid({ status: 'XYZ' })).toBe(false);
  });

  it('returns true when passed object contains status and is equal to "valid"', () => {
    expect(isTokenValid({ status: 'valid' })).toBe(true);
  });
});
