import React from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import { tokenDataInLocalStorage } from './utils/setTestTokenInStorage';
import AuthProvider from '.';
import Context from './context';
import useExtendTokenLifetime from './useExtendTokenLifetime';
import useApiClientSync from './useApiClientSync';
import useLocalStorageSync from './useLocalStorageSync';
import useSignOutSync from './useSignOutSync';
import useAuthResponseCallback from './useAuthResponseCallback';
import cancelAutoSignOutTimer from './useAutoSignOut/utils/cancelTimer';
import resetAutoSignOutTimer from './useAutoSignOut/utils/resetTimer';
import runAutoSignOutTimer from './useAutoSignOut/utils/runTimer';
import setLastActive from './useAutoSignOut/utils/setLastActive';
import { TOKEN_STATUS_VALID } from './constants';

jest.mock('../../config', () => ({
  autoSignOutWithin: 1000,
}));

jest.mock('./useExtendTokenLifetime', () => jest.fn());
jest.mock('./useApiClientSync', () => jest.fn());
jest.mock('./useLocalStorageSync', () => jest.fn());
jest.mock('./useSignOutSync', () => jest.fn());
jest.mock('./useAuthResponseCallback', () => jest.fn());
jest.mock('./useAutoSignOut/utils/cancelTimer', () => jest.fn());
jest.mock('./useAutoSignOut/utils/resetTimer', () => jest.fn());
jest.mock('./useAutoSignOut/utils/runTimer', () => jest.fn());
jest.mock('./useAutoSignOut/utils/setLastActive', () => jest.fn());

describe('<AuthProvider />', () => {
  const mockValidTokenData = {
    key: 'MOCK_TOKEN_KEY',
    status: TOKEN_STATUS_VALID,
  };
  const authResponseCallbackMock = () => {};
  let mockTokenData;
  let mockUserData;
  let container;

  describe.only('when useExtendTokenLifetime return false', () => {
    beforeEach(() => {
      useExtendTokenLifetime.mockReturnValue([false]);

      container = render(
        <AuthProvider>
          <Context.Consumer>
            {({
              isAuthenticated,
              isReady,
              setTokenData,
              setUserData,
              signOut,
            }) => (
              <>
                {isReady === true && <section>Is ready</section>}
                {isReady === false && <section>Is not ready</section>}
                {isAuthenticated === true && <section>Is authenticated</section>}
                {isAuthenticated === false && <section>Is not authenticated</section>}
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
                  onClick={signOut}
                >
                  Sign out
                </button>
              </>
            )}
          </Context.Consumer>
        </AuthProvider>,
      );
    });

    afterEach(() => {
      cancelAutoSignOutTimer.mockReset();
      useApiClientSync.mockReset();
      useAuthResponseCallback.mockReset().mockReturnValue(authResponseCallbackMock);
      useExtendTokenLifetime.mockReset();
      useLocalStorageSync.mockReset();
      useSignOutSync.mockReset();
    });

    it('to match snapshot', () => {
      expect(container).toMatchSnapshot();
    });

    it('renders "Is not ready" section', () => {
      expect(container.queryByText('Is not ready')).not.toBeNull();
    });

    it('does NOT render "Is ready" section', () => {
      expect(container.queryByText('Is ready')).toBeNull();
    });

    it('renders "Is not authenticated" section', () => {
      expect(container.queryByText('Is not authenticated')).not.toBeNull();
    });

    it('does NOT render "Is authenticated" section', () => {
      expect(container.queryByText('Is authenticated')).toBeNull();
    });

    it('calls useExtendTokenLifetime hook on every render', () => {
      container.rerender(<AuthProvider />);

      expect(useExtendTokenLifetime).toHaveBeenCalledTimes(2);
    });

    it('calls useExtendTokenLifetime with tokenData, authResponseCallback, signOut', () => {
      container.rerender(<AuthProvider />);

      expect(useExtendTokenLifetime).toHaveBeenCalledWith(tokenDataInLocalStorage, authResponseCallbackMock, expect.any(Function));
    });

    it('calls useApiClientSync hook on every render', () => {
      container.rerender(<AuthProvider />);

      expect(useApiClientSync).toHaveBeenCalledTimes(2);
    });

    it('calls useLocalStorageSync hook on every render', () => {
      container.rerender(<AuthProvider />);

      expect(useLocalStorageSync).toHaveBeenCalledTimes(2);
    });

    it('calls useAuthResponseCallback hook on every render', () => {
      container.rerender(<AuthProvider />);

      expect(useAuthResponseCallback).toHaveBeenCalledTimes(2);
    });

    it('calls useAuthResponseCallback tokenData, userData, setTokenData and setUserData', () => {
      container.rerender(<AuthProvider />);

      expect(useAuthResponseCallback).toHaveBeenCalledWith(tokenDataInLocalStorage, undefined, expect.any(Function), expect.any(Function));
    });

    it('calls useSignOutSync hook on every render', () => {
      container.rerender(<AuthProvider />);

      expect(useSignOutSync).toHaveBeenCalledTimes(2);
    });

    it('calls cancelAutoSignOutTimer twice function when "isAuthenticated" is false and on unmount', () => {
      container.rerender(<AuthProvider />);

      expect(cancelAutoSignOutTimer).toHaveBeenCalledTimes(2);
    });

    describe('when click on "Set user data" button to set mocked user data', () => {
      beforeEach(() => {
        mockUserData = 'MOCK_USER_DATA';

        const setUserDataBtn = container.queryByText('Set user data');

        fireEvent.click(setUserDataBtn);
      });

      it('renders "Is not authenticated" section', () => {
        expect(container.queryByText('Is not authenticated')).not.toBeNull();
      });

      it('does NOT render "Is authenticated" section', () => {
        expect(container.queryByText('Is authenticated')).toBeNull();
      });

      describe('when click on "Set token data" button to set mocked token data', () => {
        beforeEach(() => {
          mockTokenData = mockValidTokenData;

          const setTokenDataBtn = container.queryByText('Set token data');

          fireEvent.click(setTokenDataBtn);
        });

        afterEach(() => {
          setLastActive.mockReset();
          runAutoSignOutTimer.mockReset();
        });

        it('does NOT render "Is not authenticated" section', () => {
          expect(container.queryByText('Is not authenticated')).toBeNull();
        });

        it('renders "Is authenticated" section', () => {
          expect(container.queryByText('Is authenticated')).not.toBeNull();
        });

        it('calls setLastActive function when "isAuthenticated" turns from false to true', () => {
          container.rerender(<AuthProvider />);

          expect(setLastActive).toHaveBeenCalledTimes(1);
        });

        it('calls runAutoSignOutTimer function when "isAuthenticated" turns from false to true', () => {
          container.rerender(<AuthProvider />);

          expect(runAutoSignOutTimer).toHaveBeenCalledTimes(1);
        });

        it('calls cancelAutoSignOutTimer function one more time when component unmount', () => {
          container.rerender(<AuthProvider />);
          container.unmount();

          expect(cancelAutoSignOutTimer).toHaveBeenCalledTimes(3);
        });

        it('calls useLocalStorageSync with tokenData, userData', () => {
          expect(useLocalStorageSync).toHaveBeenCalledWith(mockTokenData, mockUserData);
        });

        it('calls useApiClientSync with tokenData, userData', () => {
          expect(useApiClientSync).toHaveBeenCalledWith(mockTokenData);
        });

        it('calls useSignOutSync with true', () => {
          expect(useSignOutSync).toHaveBeenCalledWith(true);
        });

        describe.each([
          'Set token data',
          'Set user data',
          'Sign out',
        ])('when click on "%s" button to set undefined', (btnText) => {
          beforeEach(() => {
            mockTokenData = undefined;
            mockUserData = undefined;
            const setTokenDataBtn = container.queryByText(btnText);

            fireEvent.click(setTokenDataBtn);
          });

          it('renders "Is not authenticated" section', () => {
            expect(container.queryByText('Is not authenticated')).not.toBeNull();
          });

          it('does NOT render "Is authenticated" section', () => {
            expect(container.queryByText('Is authenticated')).toBeNull();
          });

          it('does NOT call setLastActive one more time', () => {
            container.rerender(<AuthProvider />);

            expect(setLastActive).toHaveBeenCalledTimes(1);
          });

          it('does NOT call runAutoSignOutTimer one more time', () => {
            container.rerender(<AuthProvider />);

            expect(runAutoSignOutTimer).toHaveBeenCalledTimes(1);
          });

          it('calls cancelAutoSignOutTimer function one more time when "isAuthenticated" turns to false', () => {
            container.rerender(<AuthProvider />);

            expect(cancelAutoSignOutTimer).toHaveBeenCalledTimes(3);
          });
        });

        describe('when click on a wrapper or key press', () => {
          beforeEach(() => {
            resetAutoSignOutTimer.mockReset();

            fireEvent.click(container.container.firstChild);
          });

          it('calls resetAutoSignOutTimer when click on main wrapper', () => {
            container.rerender(<AuthProvider />);

            expect(resetAutoSignOutTimer).toHaveBeenCalledTimes(1);
          });

          it('calls resetAutoSignOutTimer one more time when click on any other element eg. "Some button"', () => {
            container.rerender(
              <AuthProvider>
                <button type="button">
                  Some button
                </button>
              </AuthProvider>
            );
            const someBtn = container.queryByText('Some button');

            fireEvent.click(someBtn);

            expect(resetAutoSignOutTimer).toHaveBeenCalledTimes(2);
          });

          it('calls resetAutoSignOutTimer one more time when key press', () => {
            container.rerender(
              <AuthProvider>
                <textarea />
              </AuthProvider>
            );
            const textarea = container.container.querySelector('textarea');

            fireEvent.keyPress(textarea, { key: 'A', code: 65, charCode: 65 });

            expect(resetAutoSignOutTimer).toHaveBeenCalledTimes(2);
          });
        });
      });
    });

    describe('when click on "Set token data" button to set mocked token data', () => {
      beforeEach(() => {
        mockTokenData = mockValidTokenData;

        const setTokenDataBtn = container.queryByText('Set token data');

        fireEvent.click(setTokenDataBtn);
      });

      it('renders "Is not authenticated" section', () => {
        expect(container.queryByText('Is not authenticated')).not.toBeNull();
      });

      it('does NOT render "Is authenticated" section', () => {
        expect(container.queryByText('Is authenticated')).toBeNull();
      });
    });
  });

  describe.only('when useExtendTokenLifetime return true', () => {
    beforeEach(() => {
      useExtendTokenLifetime.mockReturnValue([true]);

      container = render(
        <AuthProvider>
          <Context.Consumer>
            {({ isReady }) => (
              <>
                {isReady === true && <section>Is ready</section>}
                {isReady === false && <section>Is not ready</section>}
              </>
            )}
          </Context.Consumer>
        </AuthProvider>,
      );
      expect(container.container).toMatchSnapshot();
    });

    it('renders "Is ready" section', () => {
      expect(container.queryByText('Is ready')).not.toBeNull();
    });

    it('does NOT render "Is not ready" section', () => {
      expect(container.queryByText('Is not ready')).toBeNull();
    });
  });
});
