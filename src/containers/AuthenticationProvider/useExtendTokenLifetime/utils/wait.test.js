import wait from './wait';

jest.useFakeTimers();

describe('wait', () => {
  it('wait certain number of milliseconds to resolve', (done) => {
    wait(5000).then(done);

    jest.advanceTimersByTime(5000);
  });

  it('wait more then certain number of milliseconds to resolve', (done) => {
    wait(5000).then(done);

    jest.advanceTimersByTime(5001);
  });

  it('does not wait certain number of milliseconds to resolve', () => {
    expect.assertions(0);

    wait(5000).then(() => {
      expect(true).toBe(true);
    });

    jest.advanceTimersByTime(4999);
  });
});
