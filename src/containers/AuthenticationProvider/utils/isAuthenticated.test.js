import isAuthenticated from './isAuthenticated';
import {
  TOKEN_STATUS_VALID,
  TOKEN_STATUS_INVALID,
} from '../constants';

describe('isAuthenticated', () => {
  it('return false when tokenData and userData are not defined', () => {
    expect(isAuthenticated()).toBe(false);
  });

  it('return false when tokenData and userData are nulls', () => {
    expect(isAuthenticated(null, null)).toBe(false);
  });

  it('return false when tokenData and userData are object but tokenData status is not valid', () => {
    const tokenData = {};
    const userData = {};

    expect(isAuthenticated(tokenData, userData)).toBe(false);
  });

  it('return false when tokenData and userData are object but tokenData status is not valid', () => {
    const tokenData = {
      status: TOKEN_STATUS_INVALID,
    };
    const userData = {};

    expect(isAuthenticated(tokenData, userData)).toBe(false);
  });

  it('return false when tokenData is undefined and userData', () => {
    const tokenData = undefined;
    const userData = {};

    expect(isAuthenticated(tokenData, userData)).toBe(false);
  });

  it('return true when tokenData and userData are object and tokenData status valid', () => {
    const tokenData = {
      status: TOKEN_STATUS_VALID,
    };
    const userData = {};

    expect(isAuthenticated(tokenData, userData)).toBe(true);
  });
});
