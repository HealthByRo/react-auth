import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  render,
  fireEvent,
} from '@testing-library/react';
import useIsUserAuthenticated from '.';

const TestComponent = (props) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useIsUserAuthenticated(isUserAuthenticated, props.authenticatedCallback);

  return (
    <button
      type="button"
      onClick={() => setIsUserAuthenticated(true)}
    >
      Authenticate User
    </button>
  );
};

TestComponent.propTypes = {
  authenticatedCallback: PropTypes.func.isRequired,
};

describe('useIsUserAuthenticated', () => {
  it('invokes a callback when the user is authenticated', () => {
    const authenticatedCallback = jest.fn();
    const container = render(<TestComponent authenticatedCallback={authenticatedCallback} />);
    const button = container.queryByText('Authenticate User');

    expect(authenticatedCallback).not.toHaveBeenCalled();

    fireEvent.click(button);

    expect(authenticatedCallback).toHaveBeenCalled();
  });
});
