export default function isNoInternetConnectionError(error) {
  return !error.response;
}
