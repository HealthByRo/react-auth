export default function isServerError(error) {
  const status = error.response && error.response.status;

  return status >= 500 && status < 600;
}
