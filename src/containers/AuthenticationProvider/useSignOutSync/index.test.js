import React, { useState } from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react';
import { signOut } from '../../../api';
import useSignOutSync from '.';

jest.mock('../../../api', () => ({
  signOut: jest.fn(),
}));

function TestComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useSignOutSync(isAuthenticated);

  return (
    <>
      <button
        key="true"
        type="button"
        onClick={() => setIsAuthenticated(true)}
      >
        Set to true
      </button>

      <button
        key="false"
        type="button"
        onClick={() => setIsAuthenticated(false)}
      >
        Set to false
      </button>
    </>
  );
}

describe('useSignOutSync', () => {
  let container;
  let buttonSetToTrue;
  let buttonSetToFalse;

  describe('on initial render "isAuthenticated" flag is false', () => {
    beforeEach(() => {
      container = render(<TestComponent />);
      buttonSetToTrue = container.queryByText('Set to true');
      buttonSetToFalse = container.queryByText('Set to false');
    });

    it('does not call signOut', () => {
      expect(signOut).not.toHaveBeenCalled();
    });

    [
      {
        apiFnImplementation: () => Promise.reject(),
        description: 'api function fails',
      }, {
        apiFnImplementation: () => Promise.resolve(),
        description: 'api function success',
      },
    ].forEach((testCase) => {
      const {
        apiFnImplementation,
        description,
      } = testCase;

      describe(`when "isAuthenticated" flag switch to true - ${description}`, () => {
        beforeEach(() => {
          signOut
            .mockReset()
            .mockImplementation(apiFnImplementation);

          fireEvent.click(buttonSetToTrue);
        });

        it('calls signOut', () => {
          expect(signOut).toHaveBeenCalled();
        });

        it('does not call signOut on more time on re-render', () => {
          container.rerender(<TestComponent />);

          expect(signOut).toHaveBeenCalledTimes(1);
        });

        describe('when "isAuthenticated" flag switch to false', () => {
          beforeEach(() => {
            fireEvent.click(buttonSetToFalse);
          });

          it('does not call signOut one more time', () => {
            expect(signOut).toHaveBeenCalledTimes(1);
          });

          it('does not call signOut on more time on re-render', () => {
            container.rerender(<TestComponent />);

            expect(signOut).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
});
