export default function debounce(callback, delay = 0) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;

      callback(...args);
    }, delay);
  };
}
