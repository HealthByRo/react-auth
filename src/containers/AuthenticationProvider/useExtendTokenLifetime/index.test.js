import React from 'react';
import { render } from '@testing-library/react';
import MockDate from 'mockdate';
import extendTokenLifetime from './extendTokenLifetime';
import useExtendTokenLifetime from '.';

jest.mock('./extendTokenLifetime', () => jest.fn());

const NOW = 1492090098140;
const UPDATED_TOKEN_EXPIRE_IN = 30 * 60 * 1000;
let PASSED_TOKEN_DATA;
const MOCK_RESPONSE = {
  userData: 'TEST_USER_DATA',
  tokenData: {
    key: 'UPDATED_TOKEN_KEY',
    expireAt: new Date(NOW + UPDATED_TOKEN_EXPIRE_IN).toISOString(), // expired in 30 minutes,
  },
};

const onSuccess = jest.fn();
const onFailure = jest.fn();

function TestComponent() {
  const [isReady] = useExtendTokenLifetime(PASSED_TOKEN_DATA, onSuccess, onFailure);

  return (
    <>
      {isReady === true && <section key={1}>Is ready</section>}
      {isReady === false && <section key={2}>Is not ready</section>}
    </>
  );
}

describe('useExtendTokenLifetime', () => {
  let container;

  beforeEach(() => {
    MockDate.set(NOW);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('when passed tokenData is not expired', () => {
    beforeEach(() => {
      PASSED_TOKEN_DATA = {
        key: 'INITIAL_TOKEN_KEY',
        expireAt: new Date(NOW + 10 * 60 * 1000).toISOString(), // expired in 10 minutes,
      };

      extendTokenLifetime.mockReset();
    });

    describe('on initial render "isReady" flag is false', () => {
      let resolve;

      beforeEach(() => {
        extendTokenLifetime
          .mockReset()
          .mockImplementation(() => new Promise((_resolve) => { resolve = _resolve; }));

        container = render(<TestComponent />);
      });

      it('renders "Is not ready" section', () => {
        expect(container.queryByText('Is not ready')).not.toBeNull();
      });

      it('does NOT render "Is ready" section', () => {
        expect(container.queryByText('Is ready')).toBeNull();
      });

      it('calls extendTokenLifetime with PASSED_TOKEN_DATA.key', () => {
        expect(extendTokenLifetime).toHaveBeenCalledWith(PASSED_TOKEN_DATA.key);
      });

      it('calls extendTokenLifetime function once in case when passed token does not change', () => {
        container.rerender(<TestComponent />);

        expect(extendTokenLifetime).toHaveBeenCalledTimes(1);
      });

      describe('when component unmount', () => {
        it('does not set isReady flag in state when api request resolve', async (done) => {
          container.unmount();
          resolve();
          done();
        });
      });
    });

    describe('when extendTokenLifetime fails "isReady" flag became true', () => {
      beforeEach(() => {
        onFailure.mockReset();
        onSuccess.mockReset();
        extendTokenLifetime
          .mockReset()
          .mockResolvedValue(MOCK_RESPONSE);

        container = render(<TestComponent />);
      });

      it('does NOT render "Is not ready" section', () => {
        expect(container.queryByText('Is not ready')).toBeNull();
      });

      it('renders "Is ready" section', () => {
        expect(container.queryByText('Is ready')).not.toBeNull();
      });

      it('does NOT call onFailure function', () => {
        expect(onFailure).not.toHaveBeenCalled();
      });

      it('calls onSuccess function with response from extendTokenLifetime function', () => {
        expect(onSuccess).toHaveBeenCalledWith(MOCK_RESPONSE);
      });

      it('calls extendTokenLifetime one more time before token expire', () => {
        expect(extendTokenLifetime).toHaveBeenCalledTimes(1);

        jest.advanceTimersByTime(UPDATED_TOKEN_EXPIRE_IN);

        expect(extendTokenLifetime).toHaveBeenCalledTimes(2);
      });
    });

    describe('when extendTokenLifetime succeed "isReady" flag became true', () => {
      const error = Error('SOME_ERROR');

      beforeEach(() => {
        onFailure.mockReset();
        onSuccess.mockReset();
        extendTokenLifetime
          .mockReset()
          .mockRejectedValue(error);

        container = render(<TestComponent />);
      });

      it('does NOT render "Is not ready" section', () => {
        expect(container.queryByText('Is not ready')).toBeNull();
      });

      it('renders "Is ready" section', () => {
        expect(container.queryByText('Is ready')).not.toBeNull();
      });

      it('calls onFailure function with error', () => {
        expect(onFailure).toHaveBeenCalledWith(error);
      });

      it('does NOT call onSuccess function', () => {
        expect(onSuccess).not.toHaveBeenCalled();
      });
    });
  });

  [
    {
      description: 'when passed tokenData is expired 10 minutes ago',
      tokenData: {
        key: 'INITIAL_TOKEN_KEY',
        expireAt: new Date(NOW - 10 * 60 * 1000).toISOString(),
      },
    },
    {
      description: 'when passed tokenData is not defined',
      tokenData: undefined,
    },
  ].forEach((testCase) => {
    const {
      description,
      tokenData,
    } = testCase;

    describe(description, () => {
      beforeEach(() => {
        PASSED_TOKEN_DATA = tokenData;

        extendTokenLifetime.mockReset();
        container = render(<TestComponent />);
      });

      it('does not call extendTokenLifetime', () => {
        expect(extendTokenLifetime).not.toHaveBeenCalled();
      });

      it('does NOT render "Is not ready" section', () => {
        expect(container.queryByText('Is not ready')).toBeNull();
      });

      it('renders "Is ready" section', () => {
        expect(container.queryByText('Is ready')).not.toBeNull();
      });

      describe('when passed tokenData become a valid token data', () => {
        beforeEach(() => {
          PASSED_TOKEN_DATA = {
            key: 'INITIAL_TOKEN_KEY',
            expireAt: new Date(NOW + 10 * 60 * 1000).toISOString(), // expired in 10 minutes,
          };

          onSuccess.mockReset();
          extendTokenLifetime
            .mockReset()
            .mockResolvedValue(MOCK_RESPONSE);

          container.rerender(<TestComponent />);
        });

        it('calls extendTokenLifetime', () => {
          expect(extendTokenLifetime).toHaveBeenCalled();
        });

        it('does NOT render "Is not ready" section', () => {
          expect(container.queryByText('Is not ready')).toBeNull();
        });

        it('renders "Is ready" section', () => {
          expect(container.queryByText('Is ready')).not.toBeNull();
        });

        it('calls extendTokenLifetime one more time before token expire', () => {
          expect(extendTokenLifetime).toHaveBeenCalledTimes(1);

          jest.advanceTimersByTime(UPDATED_TOKEN_EXPIRE_IN);

          expect(extendTokenLifetime).toHaveBeenCalledTimes(2);
        });
      });
    });
  });
});
