import React, { useState } from 'react';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import useAuthResponseCallback from '.';
import getAuthDataFromStorage from '../utils/getAuthDataFromStorage';

let response;

let authResponseProcessorInstances;

function TestComponent() {
  const [something, setSomething] = useState(1);
  const [tokenData, setTokenData] = useState();
  const [userData, setUserData] = useState();
  const authResponseProcessor = useAuthResponseCallback(tokenData, userData, setTokenData, setUserData);

  authResponseProcessorInstances.add(authResponseProcessor);

  return (
    <>
      <section
        key={1}
        data-testid="tokenDataId"
      >
        {JSON.stringify(tokenData)}
      </section>

      <section
        key={2}
        data-testid="userDataId"
      >
        {JSON.stringify(userData)}
      </section>

      <section
        key={3}
        data-testid="somethingDataId"
      >
        {something}
      </section>

      <button
        type="button"
        onClick={() => authResponseProcessor(response)}
      >
        Set response data to authResponseProcessor
      </button>

      <button
        type="button"
        onClick={() => setSomething(something + 1)}
      >
        Something
      </button>
    </>
  );
}

describe('processAuthResponse', () => {
  let container;

  beforeEach(() => {
    authResponseProcessorInstances = new Set();
    container = render(<TestComponent />);
  });

  describe('when authResponseProcessor is not called', () => {
    it('does not render anything inside section with test-dataid "tokenDataId"', () => {
      expect(container.getByTestId('tokenDataId').firstChild).toBeNull();
    });

    it('does not render anything inside section with test-dataid "userDataId"', () => {
      expect(container.getByTestId('userDataId').firstChild).toBeNull();
    });

    it('auth data saved in localStorage is not defined', () => {
      expect(getAuthDataFromStorage()).toBeUndefined();
    });

    it('creates one instance of authResponseProcessor even component has been rerender', () => {
      const button = container.queryByText('Something');

      fireEvent.click(button);

      expect(authResponseProcessorInstances.size).toEqual(1);
    });
  });

  describe('when clicks on "Set response data to authResponseProcessor" button which invoke authResponseProcessor(response)', () => {
    beforeEach(() => {
      response = {
        data: {
          tokenData: {
            key: 'TEST_TOKEN',
            status: 'TEST_STATUS',
            expiredAt: 'TEST_DATE_TIME',
          },
          userData: {
            id: 'TEST_USER_ID',
            email: 'TEST_USER_EMAIL',
          },
        },
      };

      const button = container.queryByText('Set response data to authResponseProcessor');

      fireEvent.click(button);
    });

    it('creates second instance of authResponseProcessor', () => {
      const button = container.queryByText('Something');

      fireEvent.click(button);

      expect(authResponseProcessorInstances.size).toEqual(2);
    });

    it('renders serialized tokenData from response inside section with test-dataid "tokenDataId"', () => {
      expect(container.getByTestId('tokenDataId').firstChild).not.toBeNull();
      expect(container.getByTestId('tokenDataId').firstChild).toMatchSnapshot();
    });

    it('renders serialized userData from response inside section with test-dataid "userDataId"', () => {
      expect(container.getByTestId('userDataId').firstChild).not.toBeNull();
      expect(container.getByTestId('userDataId').firstChild).toMatchSnapshot();
    });
  });
});
