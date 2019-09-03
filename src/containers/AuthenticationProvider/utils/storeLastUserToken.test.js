import storeLastUserToken from './storeLastUserToken';
import getAuthDataFromStorage from './getAuthDataFromStorage';
import setAuthDataInStorage from './setAuthDataInStorage';

describe('storeLastUserToken', () => {
  beforeEach(() => {
    setAuthDataInStorage({});
  });

  describe('when calling storeLastUserToken("KEY_1", "TOKEN_1")', () => {
    beforeEach(() => {
      storeLastUserToken('KEY_1', 'TOKEN_1');
    });

    it('auth data in local storage contains "TOKEN_1" under "KEY_1"', () => {
      const currentAuthData = getAuthDataFromStorage();

      expect(currentAuthData.lastTokens.KEY_1).toEqual('TOKEN_1');
    });

    describe('when calling storeLastUserToken("KEY_2", "TOKEN_2")', () => {
      beforeEach(() => {
        storeLastUserToken('KEY_2', 'TOKEN_2');
      });

      it('auth data in local storage still contains "TOKEN_1" under "KEY_1"', () => {
        const currentAuthData = getAuthDataFromStorage();

        expect(currentAuthData.lastTokens.KEY_1).toEqual('TOKEN_1');
      });

      it('auth data in local storage contains "TOKEN_2" under "KEY_2"', () => {
        const currentAuthData = getAuthDataFromStorage();

        expect(currentAuthData.lastTokens.KEY_2).toEqual('TOKEN_2');
      });

      describe('when calling storeLastUserToken("KEY_1", "TOKEN_1_UPDATED")', () => {
        beforeEach(() => {
          storeLastUserToken('KEY_1', 'TOKEN_1_UPDATED');
        });

        it('auth data in local storage contains "TOKEN_1_UPDATED" under "KEY_1"', () => {
          const currentAuthData = getAuthDataFromStorage();

          expect(currentAuthData.lastTokens.KEY_1).toEqual('TOKEN_1_UPDATED');
        });

        it('auth data in local storage still contains "TOKEN_2" under "KEY_2"', () => {
          const currentAuthData = getAuthDataFromStorage();

          expect(currentAuthData.lastTokens.KEY_2).toEqual('TOKEN_2');
        });
      });
    });
  });
});
