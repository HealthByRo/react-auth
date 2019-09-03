import MockDate from 'mockdate';
import calculateExpiryTime from './calculateExpiryTime';

describe('calculateExpiryTime', () => {
  let NOW;

  beforeEach(() => {
    NOW = 1492090098140;
    MockDate.set(NOW);
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('resultInMinutes is equal to expireTimestamp + 4.5min', () => {
    const expireTimestampInMs = NOW + (5 * 60 * 1000);
    const expectedTimeInMs = NOW + (4.5 * 60 * 1000);

    const expireTimestampInSec = expireTimestampInMs / 1000;
    const resultInMs = calculateExpiryTime(new Date(expireTimestampInSec).toISOString());

    expect(resultInMs).toBeLessThan(expectedTimeInMs);
  });
});
