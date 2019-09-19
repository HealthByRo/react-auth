import React from 'react';
import { render, act } from '@testing-library/react';
import MockDate from 'mockdate';
import extendTokenLifetime from './extendTokenLifetime';
import useExtendTokenLifetime from '.';
import flushPromises from '../utils/flushPromises';

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

      beforeEach(async () => {
        extendTokenLifetime
          .mockReset()
          .mockImplementation(() => new Promise((_resolve) => { resolve = _resolve; }));

        await act(async () => {
          container = render(<TestComponent />);
        });
      });

      it('renders "Is not ready" section', () => {
        expect(container.queryByText('Is not ready')).not.toBeNull();
      });

      it('does NOT render "Is ready" section', () => {
        expect(container.queryByText('Is ready')).toBeNull();
      });

      it('calls extendTokenLifetime immediately with PASSED_TOKEN_DATA', () => {
        expect(extendTokenLifetime).toHaveBeenCalledWith(PASSED_TOKEN_DATA);
      });

      it('calls extendTokenLifetime function once in case when passed token does not change', async () => {
        await act(async () => {
          container.rerender(<TestComponent />);
        });

        expect(extendTokenLifetime).toHaveBeenCalledTimes(1);
      });

      describe('when component unmount', () => {
        it('does not set isReady flag in state when api request resolve', async (done) => {
          container.unmount();

          await act(async () => {
            resolve(MOCK_RESPONSE);
          });

          done();
        });
      });
    });

    describe('when extendTokenLifetime succeed "isReady" flag became true', () => {
      beforeEach(async () => {
        onFailure.mockReset();
        onSuccess.mockReset();
        extendTokenLifetime
          .mockReset()
          .mockResolvedValue(MOCK_RESPONSE);

        await act(async () => {
          container = render(<TestComponent />);
        });
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
    });

    describe('when extendTokenLifetime fails "isReady" flag became true', () => {
      const error = Error('SOME_ERROR');

      beforeEach(async () => {
        onFailure.mockReset();
        onSuccess.mockReset();
        extendTokenLifetime
          .mockReset()
          .mockRejectedValue(error);

        await act(async () => {
          container = render(<TestComponent />);
        });
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
      beforeEach(async () => {
        PASSED_TOKEN_DATA = tokenData;

        extendTokenLifetime.mockReset();

        await act(async () => {
          container = render(<TestComponent />);
        });
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

      describe('when passed tokenData become a valid token data and "isReady" flag is true', () => {
        beforeEach(async () => {
          PASSED_TOKEN_DATA = {
            key: 'INITIAL_TOKEN_KEY',
            expireAt: new Date(NOW + UPDATED_TOKEN_EXPIRE_IN).toISOString(), // expired in 10 minutes,
          };

          onSuccess.mockReset();
          extendTokenLifetime
            .mockReset()
            .mockResolvedValue(MOCK_RESPONSE);

          await act(async () => {
            container.rerender(<TestComponent />);
          });
        });

        it('wait with call extendTokenLifetime to expiration time of token, and extend it several seconds before expire', async () => {
          expect(extendTokenLifetime).toHaveBeenCalledTimes(0);

          jest.advanceTimersByTime(UPDATED_TOKEN_EXPIRE_IN);
          await flushPromises();

          expect(extendTokenLifetime).toHaveBeenCalledTimes(1);
        });

        it('does NOT render "Is not ready" section', () => {
          expect(container.queryByText('Is not ready')).toBeNull();
        });

        it('renders "Is ready" section', () => {
          expect(container.queryByText('Is ready')).not.toBeNull();
        });
      });
    });
  });
});
