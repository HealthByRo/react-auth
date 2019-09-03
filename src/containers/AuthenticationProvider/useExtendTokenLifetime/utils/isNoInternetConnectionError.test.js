import isNoInternetConnectionError from './isNoInternetConnectionError';

describe('isNoInternetConnectionError', () => {
  it('return true isNoInternetConnectionError when error does not contain response from server - error is string', () => {
    const error = Error('Some error');

    expect(isNoInternetConnectionError(error)).toBe(true);
  });

  it('return true isNoInternetConnectionError when error does not contain response from server - error is object', () => {
    const error = Error({ message: 'Some error' });

    expect(isNoInternetConnectionError(error)).toBe(true);
  });

  it('return false isNoInternetConnectionError when error contains response from server', () => {
    const error = Error({ message: 'Some error' });
    error.response = {};

    expect(isNoInternetConnectionError(error)).toBe(false);
  });
});
