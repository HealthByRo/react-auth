import React, { useState } from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import useApiClientSync from '.';
import {
  removeAuthorizationTokenInHeaders,
  setAuthorizationTokenInHeaders,
} from '../../../api';

jest.mock('../../../api', () => ({
  removeAuthorizationTokenInHeaders: jest.fn(),
  setAuthorizationTokenInHeaders: jest.fn(),
}));

let mockTokenData = {
  key: 'TEST_TOKEN',
  status: 'TEST_STATUS',
  expiredAt: 'TEST_DATE_TIME',
};

function TestComponent() {
  const [tokenData, setTokenData] = useState(null);

  useApiClientSync(tokenData);

  return (
    <button
      type="button"
      onClick={() => setTokenData(mockTokenData)}
    >
      Set token data
    </button>
  );
}

describe('processAuthResponse', () => {
  let container;

  beforeEach(() => {
    setAuthorizationTokenInHeaders.mockReset();
    removeAuthorizationTokenInHeaders.mockReset();
    container = render(<TestComponent />);
  });

  describe('when clicks on "Set token data" button which set mocked token data', () => {
    let button;

    beforeEach(() => {
      button = container.queryByText('Set token data');
      setAuthorizationTokenInHeaders.mockReset();
      fireEvent.click(button);
    });

    it('calls setAuthorizationTokenInHeaders with tokenData.key', () => {
      expect(setAuthorizationTokenInHeaders).toHaveBeenCalledWith(mockTokenData.key);
    });

    it('does not call setAuthorizationTokenInHeaders one more time when re-render', () => {
      container.rerender();
      expect(setAuthorizationTokenInHeaders).toHaveBeenCalledTimes(1);
    });

    describe('when clicks on "Set token data" button which set null (it means user logout)', () => {
      beforeEach(() => {
        mockTokenData = null;

        fireEvent.click(button);
      });

      it('does not call setAuthorizationTokenInHeaders one more time', () => {
        expect(setAuthorizationTokenInHeaders).toHaveBeenCalledTimes(1);
      });

      it('calls removeAuthorizationTokenInHeaders', () => {
        expect(removeAuthorizationTokenInHeaders).toHaveBeenCalled();
      });

      it('does not call removeAuthorizationTokenInHeaders one more time when re-render', () => {
        container.rerender();
        fireEvent.click(button);
        expect(removeAuthorizationTokenInHeaders).toHaveBeenCalledTimes(1);
      });
    });
  });
});
