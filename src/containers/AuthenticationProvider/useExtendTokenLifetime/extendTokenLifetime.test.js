/* eslint-disable no-await-in-loop */
import MockDate from 'mockdate';
import { extendTokenLifetime as extendTokenLifetimeApi } from '../../../api';
import extendTokenLifetime from './extendTokenLifetime';
import flushPromises from '../utils/flushPromises';

jest.mock('../../../api', () => ({
  extendTokenLifetime: jest.fn(),
}));

jest.useFakeTimers();

describe('extendTokenLifetime', () => {
  const NOW = 1492090098140;
  const expireIn = 5 * 60 * 1000; // 5min
  const tokenData = {
    key: 'TEST_TOKEN',
    expireAt: new Date(NOW + expireIn),
  };

  beforeEach(() => {
    MockDate.set(NOW);
    extendTokenLifetimeApi.mockReset();
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('invokes extendTokenLifetimeApi with tokenData.key', () => {
    extendTokenLifetime(tokenData);
    expect(extendTokenLifetimeApi).toHaveBeenCalledWith(tokenData.key);
  });

  it('returns promise with response when succeed on first try', async () => {
    const response = {};
    extendTokenLifetimeApi.mockReturnValue(Promise.resolve(response));

    const result = await extendTokenLifetime(tokenData);

    expect(result).toBe(response);
    expect(extendTokenLifetimeApi).toHaveBeenCalledTimes(1);
  });

  [
    {
      description: 'lack of internet (error without response)',
      error: {},
    },
    {
      description: 'server',
      error: {
        response: {
          status: 500,
        },
      },
    },
  ].forEach((testOptions) => {
    const {
      error: requestError,
      description,
    } = testOptions;

    describe(`when extendTokenLifetimeApi failed X time due to ${description} requestError`, () => {
      beforeEach(() => {
        MockDate.set(NOW);
      });

      afterEach(() => {
        MockDate.reset();
      });

      it('invokes extendTokenLifetimeApi X+1 times and wait for each call 5s and finally return resolve with response', async (done) => {
        const response = {};
        const numberOfTries = 3;
        let tries = 0;

        MockDate.set(NOW);

        extendTokenLifetimeApi
          .mockReset()
          .mockImplementation(() => (
            new Promise((resolve, reject) => {
              tries += 1;

              if (tries >= numberOfTries) {
                resolve(response);
              } else {
                reject(requestError);
              }
            })
          ));

        extendTokenLifetime(tokenData).then((result) => {
          expect(result).toEqual(response);
          expect(extendTokenLifetimeApi).toHaveBeenCalledTimes(numberOfTries);
          done();
        });

        for (let i = 0; i < numberOfTries; i += 1) {
          jest.advanceTimersByTime(5000);
          await flushPromises();
        }
      });

      it('invokes extendTokenLifetimeApi 2 times and wait for each call 5s and finally fails with "Token expired" error when token became expired', async (done) => {
        const numberOfTries = 2;
        let currentTime = NOW + expireIn - 2 * 5000;

        extendTokenLifetimeApi
          .mockReset()
          .mockImplementation(() => (
            new Promise((resolve, reject) => {
              reject(requestError);

              // increase time on every try
              currentTime += 5000;
              MockDate.set(currentTime);
            })
          ));

        extendTokenLifetime(tokenData)
          .then(() => {
            done();
          })
          .catch((error) => {
            expect(error).toEqual(Error('Token expired'));
            expect(extendTokenLifetimeApi).toHaveBeenCalledTimes(2);
            done();
          });

        for (let i = 0; i <= numberOfTries; i += 1) {
          jest.advanceTimersByTime(5000);
          await flushPromises();
        }
      });
    });
  });

  it('invokes extendTokenLifetimeApi once and fails with "Token expired" error when server response with HTTP error 400', async (done) => {
    const numberOfTries = 1;
    const requestError = {
      response: {
        data: 'Token Expired',
        status: 400,
      },
    };

    extendTokenLifetimeApi
      .mockReset()
      .mockRejectedValue(requestError);

    extendTokenLifetime(tokenData)
      .then(() => {
        done();
      })
      .catch((error) => {
        expect(error).toEqual(Error('Token expired'));
        expect(extendTokenLifetimeApi).toHaveBeenCalledTimes(numberOfTries);
        done();
      });

    for (let i = 0; i < numberOfTries; i += 1) {
      jest.advanceTimersByTime(5000);
      await flushPromises();
    }
  });
});
