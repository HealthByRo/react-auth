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
import {
  TOKEN_STATUS_VALID,
  TOKEN_STATUS_INVALID,
  TOKEN_STATUS_AWAITING_SECOND_FACTOR,
} from '../constants';

jest.mock('../../../api', () => ({
  removeAuthorizationTokenInHeaders: jest.fn(),
  setAuthorizationTokenInHeaders: jest.fn(),
}));

let validToken = {
  key: 'valid_key',
  status: TOKEN_STATUS_VALID,
  expiredAt: 'mock_date',
};

let invalidToken = {
  key: 'invalid_key',
  status: TOKEN_STATUS_INVALID,
  expiredAt: 'mock_date',
};

let awaitingSecondFactorToken = {
  key: 'awaiting_second_factor_key',
  status: TOKEN_STATUS_AWAITING_SECOND_FACTOR,
  expiredAt: 'mock_date',
};

function TestComponent({ mockedToken }) {
  useApiClientSync(mockedToken);

  return null;
}

describe('useApiClientSync', () => {
  let container;

  beforeEach(() => {
    setAuthorizationTokenInHeaders.mockReset();
    removeAuthorizationTokenInHeaders.mockReset();
  });

  describe('when token is valid', () => {
    let button;

    beforeEach(() => {
      container = render(<TestComponent mockedToken={validToken} />);
    });

    it('sets authorization token in header', () => {
      expect(setAuthorizationTokenInHeaders).toHaveBeenCalledWith('valid_key');
    });

    it('does not set authorization token in header one more time when re-render', () => {
      container.rerender();
      expect(setAuthorizationTokenInHeaders).toHaveBeenCalledTimes(1);
    });
  });

  describe('when token is invalid', () => {
    let button;

    beforeEach(() => {
      container = render(<TestComponent mockedToken={invalidToken} />);
    });

    it('sets authorization token in header', () => {
      expect(setAuthorizationTokenInHeaders).toHaveBeenCalledWith('invalid_key');
    });

    it('does not set authorization token in header one more time when re-render', () => {
      container.rerender();
      expect(setAuthorizationTokenInHeaders).toHaveBeenCalledTimes(1);
    });
  });

  describe('when token is null', () => {
    let button;

    beforeEach(() => {
      container = render(<TestComponent mockedToken={null} />);
    });

    it('removes authorization token from header', () => {
      expect(removeAuthorizationTokenInHeaders).toHaveBeenCalled();
    });

    it('does NOT remove authorization token from header one more time when re-render', () => {
      container.rerender();
      expect(removeAuthorizationTokenInHeaders).toHaveBeenCalledTimes(1);
    });
  });

  describe('when token is awaiting second factor', () => {
    let button;

    beforeEach(() => {
      container = render(<TestComponent mockedToken={awaitingSecondFactorToken} />);
    });

    it('removes authorization token from header', () => {
      expect(removeAuthorizationTokenInHeaders).toHaveBeenCalled();
    });

    it('does NOT remove authorization token from header one more time when re-render', () => {
      container.rerender();
      expect(removeAuthorizationTokenInHeaders).toHaveBeenCalledTimes(1);
    });
  });
});
