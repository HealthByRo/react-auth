/* eslint-disable no-await-in-loop */
import { extendTokenLifetime as extendTokenLifetimeApi } from '../../../api';
import isExpired from './utils/isExpired';
import wait from './utils/wait';
import isNoInternetConnectionError from './utils/isNoInternetConnectionError';
import isServerError from './utils/isServerError';

export default async function extendTokenLifetime(tokenData) {
  do {
    try {
      const response = await extendTokenLifetimeApi(tokenData.key);

      return response;
    } catch (error) {
      if (!isNoInternetConnectionError(error) && !isServerError(error)) {
        break;
      }
    }

    await wait(5000);
  } while (!isExpired(tokenData.expireAt));

  throw Error('Token expired');
}
