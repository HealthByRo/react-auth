import isServerError from './isServerError';

describe('isServerError', () => {
  it('return true isServerError when error does not contain response from server - error is string', () => {
    const error = Error('Some error');

    expect(isServerError(error)).toBe(false);
  });

  it('return true isServerError when error does not contain response from server - error is object', () => {
    const error = Error({ message: 'Some error' });

    expect(isServerError(error)).toBe(false);
  });

  it('return false isServerError when error contains response from server but no "status" property', () => {
    const error = Error({ message: 'Some error' });
    error.response = {};

    expect(isServerError(error)).toBe(false);
  });

  it('return false isServerError when error contains response from server which contains "status" which is lower than 500', () => {
    const error = Error({ message: 'Some error' });
    error.response = {
      status: 499,
    };

    expect(isServerError(error)).toBe(false);
  });

  it('return false isServerError when error contains response from server which contains "status" which is lower than 600 (I know this status does not contain)', () => {
    const error = Error({ message: 'Some error' });
    error.response = {
      status: 600,
    };

    expect(isServerError(error)).toBe(false);
  });

  it('return false isServerError when error contains response from server which contains "status" is 500', () => {
    const error = Error({ message: 'Some error' });
    error.response = {
      status: 500,
    };

    expect(isServerError(error)).toBe(true);
  });

  it('return false isServerError when error contains response from server which contains "status" is 599', () => {
    const error = Error({ message: 'Some error' });
    error.response = {
      status: 500,
    };

    expect(isServerError(error)).toBe(true);
  });
});
