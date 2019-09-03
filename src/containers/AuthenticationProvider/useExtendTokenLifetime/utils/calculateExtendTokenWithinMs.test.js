import MockDate from 'mockdate';
import calculateExpiryTime from './calculateExpiryTime';
import calculateExtendTokenWithinMs, { EXTEND_BEFORE_AUTO_SIGN_OUT_TIME } from './calculateExtendTokenWithinMs';

jest.mock('./calculateExpiryTime', () => jest.fn());

describe('calculateExtendTokenWithinMs', () => {
  let NOW;
  const fiveMinutes = 5 * 60 * 1000;

  beforeEach(() => {
    NOW = 1492090098140;
    MockDate.set(NOW);
  });

  it('return expiration time calculated by calculateExpiryTime when calling without "autoSignOutWithin" param', () => {
    const expireAt = NOW + fiveMinutes;
    calculateExpiryTime.mockReturnValue(fiveMinutes);

    expect(calculateExtendTokenWithinMs(expireAt)).toEqual(calculateExpiryTime(expireAt));
  });

  it('return expiration time calculated by calculateExpiryTime when calling with "autoSignOutWithin" param and this param is higher then value returned by calculateExpiryTime', () => {
    const expireAt = NOW + fiveMinutes;
    const autoSignOutWithin = fiveMinutes + 1 + EXTEND_BEFORE_AUTO_SIGN_OUT_TIME;

    calculateExpiryTime.mockReturnValue(fiveMinutes);

    expect(calculateExtendTokenWithinMs(expireAt, autoSignOutWithin)).toEqual(calculateExpiryTime(expireAt));
  });

  it('return "autoSignOutWithin" minus EXTEND_BEFORE_AUTO_SIGN_OUT_TIME when calling with "autoSignOutWithin" param and this param is lower then value returned by calculateExpiryTime', () => {
    const expireAt = NOW + fiveMinutes;
    const autoSignOutWithin = fiveMinutes - 1;
    calculateExpiryTime.mockReturnValue(fiveMinutes);

    expect(calculateExtendTokenWithinMs(expireAt, autoSignOutWithin)).toEqual(autoSignOutWithin - EXTEND_BEFORE_AUTO_SIGN_OUT_TIME);
  });
});
