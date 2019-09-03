import generateLastUserTokenKey from './generateLastUserTokenKey';

describe('generateLastUserTokenKey', () => {
  const hashedText = '1f4c5192dbd03cc51959aec3c8004f76';

  it('generates md5 hash from text "andy@acme.com"', () => {
    expect(generateLastUserTokenKey('andy@acme.com')).toEqual(hashedText);
  });

  it('generates md5 hash from text "ANDY@ACME.COM"', () => {
    expect(generateLastUserTokenKey('ANDY@ACME.COM')).toEqual(hashedText);
  });

  it('generates md5 hash from text " ANDY@ACME.COM "', () => {
    expect(generateLastUserTokenKey(' ANDY@ACME.COM ')).toEqual(hashedText);
  });
});
