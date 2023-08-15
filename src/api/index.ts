import axios from 'axios';
import getTokenDataFromStorage from '../utils/getTokenDataFromStorage';

const api = axios.create({
  baseURL: process.env.REACT_APP_SPOTIFY_API_BASE_URI,
});

// interceptor for adding access token to the header
api.interceptors.request.use(
  (config) => {
    const tokenData = getTokenDataFromStorage();

    if (tokenData) {
      config.headers.Authorization = `Bearer ${tokenData.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * Refresh Token Interceptor
 * In Spotify's documentation, the refresh token flow is not clear or there
 * may have a bug. Because, when I try to refresh the tokens, I get "invalid_client" error.
 * There are other users who get the similar issues. Therefore, I comment outed the refresh token
 * implementation for now.
 *
 * https://community.spotify.com/t5/Spotify-for-Developers/Why-is-refreshing-access-token-returning-quot-invalid-client/m-p/5272284#M3361
 */
// api.interceptors.response.use(response => {
//   return response;
// }, async error => {
//   const originalRequest = error.config;
//   const tokenData = getTokenDataFromStorage();
//
//   if (error.response.status === 401 && tokenData?.refresh_token) {
//     const body = new URLSearchParams({
//       grant_type: 'authorization_code',
//       refresh_token: tokenData?.refresh_token,
//       client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
//     });
//
//     const response = await api.post('https://accounts.spotify.com/api/token', body.toString(), {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     });
//
//     // store the token data to use it later requests
//     localStorage.setItem(STORAGE_KEYS.TOKEN_DATA, JSON.stringify(response.data));
//
//     // resend the original request
//     return api(originalRequest);
//   }
//
//   return Promise.reject(error);
// });

export default api;
