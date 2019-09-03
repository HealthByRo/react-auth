import apiClient from 'api-client';
import MockAdapter from 'axios-mock-adapter';
import { tokenAndUserData } from '../test.data';
import {
  extendTokenLifetime,
  removeAuthorizationTokenInHeaders,
  setAuthorizationTokenInHeaders,
  signOut,
} from '.';

describe('redux-auth API', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(apiClient);
  });

  describe('when calling extendTokenLifetime(token)', () => {
    it('should return promise and resolve it with tokenAndUserData and send token in headers', (done) => {
      const token = 'XYZ';
      mock.onPost('/auth/token/extend-lifetime', {}).reply(200, tokenAndUserData);

      extendTokenLifetime(token)
        .then((response) => {
          expect(response.data).toEqual(tokenAndUserData);
          expect(response.config.headers.Authorization).toEqual(`Token ${token}`);
          done();
        });
    });
  });

  describe('when calling signOut()', () => {
    it('should return promise and resolve it with undefined', (done) => {
      mock.onPost('/auth/logout').reply(204);

      signOut()
        .then((response) => {
          expect(response.data).toBeUndefined();
          done();
        });
    });
  });

  describe('when calling setAuthorizationTokenInHeaders(authHeader)', () => {
    const token = 'XYZ123';

    beforeEach(() => {
      setAuthorizationTokenInHeaders(token);
    });

    it('should request headers have "Authorization" header', (done) => {
      mock.onPost('/users/', {}).reply(200, tokenAndUserData);

      apiClient.post('/users/', {})
        .then((response) => {
          expect(response.config.headers.Authorization).toEqual(`Token ${token}`);
          done();
        });
    });

    describe('when calling removeAuthorizationTokenInHeaders()', () => {
      beforeEach(() => {
        removeAuthorizationTokenInHeaders();
      });

      it('should request headers have not "Authorization" header', (done) => {
        mock.onPost('/users/', {}).reply(200, tokenAndUserData);

        apiClient.post('/users/', {})
          .then((response) => {
            expect(response.config.headers.Authorization).toEqual(undefined);
            done();
          });
      });
    });
  });
});
