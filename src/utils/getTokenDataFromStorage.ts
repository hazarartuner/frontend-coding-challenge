import { STORAGE_KEYS } from '../config/constants';
import { SpotifyTokenData } from '../types';

export default function getTokenDataFromStorage() {
  const tokenDataStr = localStorage.getItem(STORAGE_KEYS.TOKEN_DATA);
  let tokenData: SpotifyTokenData | undefined;

  if (tokenDataStr) {
    try {
      tokenData = JSON.parse(tokenDataStr) as SpotifyTokenData;
    } catch (e) {
      // no need to do something
    }
  }

  return tokenData;
}
