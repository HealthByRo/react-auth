import React, { useState } from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import useLocalStorageSync from '.';
import getAuthDataFromStorage from '../utils/getAuthDataFromStorage';
import removeAuthDataFromStorage from '../utils/removeAuthDataFromStorage';
import generateLastUserTokenKey from '../utils/generateLastUserTokenKey';

jest.mock('../../../api', () => ({
  removeAuthorizationTokenInHeaders: jest.fn(),
  setAuthorizationTokenInHeaders: jest.fn(),
}));

let mockTokenData;
let mockUserData;
let mockTokenKey;

function TestComponent() {
  const [tokenData, setTokenData] = useState();
  const [userData, setUserData] = useState();

  useLocalStorageSync(tokenData, userData);

  return (
    <>
      <button
        type="button"
        onClick={() => setUserData(mockUserData)}
      >
        Set user data
      </button>

      <button
        type="button"
        onClick={() => setTokenData(mockTokenData)}
      >
        Set token data
      </button>

      <button
        type="button"
        onClick={() => {
          setTokenData(mockTokenData);
          setUserData(mockUserData);
        }}
      >
        Set both: user and token data
      </button>
    </>
  );
}

describe('processAuthResponse', () => {
  let container;

  beforeEach(() => {
    container = render(<TestComponent />);
  });

  afterEach(() => {
    removeAuthDataFromStorage();
  });

  describe('when clicks on "Set token data" button which set mocked token data', () => {
    beforeEach(() => {
      mockTokenData = {
        key: 'TEST_TOKEN',
        status: 'TEST_STATUS',
        expiredAt: 'TEST_DATE_TIME',
      };

      const button = container.queryByText('Set token data');

      fireEvent.click(button);
    });

    it('auth data saved in localStorage is equal to mockTokenData', () => {
      expect(getAuthDataFromStorage().tokenData).toEqual(mockTokenData);
    });

    it('last tokens saved in auth data in localStorage are defined (is object which contains hashed email as a key and toke.key as value)', () => {
      expect(getAuthDataFromStorage().lastTokens).toBeUndefined();
    });

    it('auth data saved in localStorage match snapshot', () => {
      expect(getAuthDataFromStorage()).toMatchSnapshot();
    });

    describe('when clicks on "Set user data" button which set mocked user data', () => {
      beforeEach(() => {
        mockUserData = {
          id: 'TEST_USER_ID',
          email: 'TEST_USER_EMAIL',
        };

        const button = container.queryByText('Set user data');

        fireEvent.click(button);
      });

      it('last tokens saved in auth data in localStorage are not defined', () => {
        expect(getAuthDataFromStorage().lastTokens).toEqual({
          [generateLastUserTokenKey(mockUserData.email)]: mockTokenData.key,
        });
      });

      it('auth data saved in localStorage match snapshot', () => {
        expect(getAuthDataFromStorage()).toMatchSnapshot();
      });

      describe('when clicks on "Set both: user and token data" button which set mocked token data and user data at the same time', () => {
        let oldMockTokenData;
        let oldMockUserData;
        mockTokenData = {
          key: 'TEST_TOKEN_UPDATED',
          status: 'TEST_STATUS_UPDATED',
          expiredAt: 'TEST_DATE_TIME_UPDATED',
        };
        mockUserData = {
          id: 'TEST_USER_ID_UPDATED',
          email: 'TEST_USER_EMAIL_UPDATED',
        };

        beforeEach(() => {
          oldMockTokenData = mockTokenData;
          oldMockUserData = mockUserData;
          mockTokenKey = 'TEST_TOKEN_UPDATED';
          mockTokenData = {
            key: mockTokenKey,
            status: 'TEST_STATUS_UPDATED',
            expiredAt: 'TEST_DATE_TIME_UPDATED',
          };
          mockUserData = {
            id: 'TEST_USER_ID_UPDATED',
            email: 'TEST_USER_EMAIL_UPDATED',
          };

          const button = container.queryByText('Set both: user and token data');

          fireEvent.click(button);
        });

        it('auth data saved in localStorage is equal to updated mockTokenData', () => {
          expect(getAuthDataFromStorage().tokenData).toEqual(mockTokenData);
        });

        it('last tokens saved in auth data in localStorage are defined and contains two entries', () => {
          expect(getAuthDataFromStorage().lastTokens).toEqual({
            [generateLastUserTokenKey(oldMockUserData.email)]: oldMockTokenData.key,
            [generateLastUserTokenKey(mockUserData.email)]: mockTokenData.key,
          });
        });

        it('auth data saved in localStorage match snapshot', () => {
          expect(getAuthDataFromStorage()).toMatchSnapshot();
        });
      });

      describe('when clicks on "Set token data" button which set null (it means user logout)', () => {
        beforeEach(() => {
          mockTokenData = null;

          const button = container.queryByText('Set token data');

          fireEvent.click(button);
        });

        it('auth data in localStorage is undefined', () => {
          expect(getAuthDataFromStorage()).toBeUndefined();
        });

        it('auth data saved in localStorage match snapshot', () => {
          expect(getAuthDataFromStorage()).toMatchSnapshot();
        });
      });
    });
  });

  describe('when clicks on "Set user data" button which set mocked user data (setting only user data does not save anything in local storage', () => {
    beforeEach(() => {
      mockUserData = {
        id: 'TEST_USER_ID',
        email: 'TEST_USER_EMAIL',
      };

      const button = container.queryByText('Set user data');

      fireEvent.click(button);
    });

    it('auth data saved in localStorage is empty undefined', () => {
      expect(getAuthDataFromStorage()).toBeUndefined();
    });
  });
});
