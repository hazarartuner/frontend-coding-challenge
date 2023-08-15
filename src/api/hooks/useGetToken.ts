import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { SpotifyApiError, SpotifyTokenData } from '../../types';

type Params = {
  code: string;
  codeVerifier: string;
};

type SuccessResponse = {
  data: SpotifyTokenData;
};

const useGetToken = () =>
  useMutation<SuccessResponse, SpotifyApiError, Params>((params) => {
    const { code, codeVerifier } = params;

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      code_verifier: codeVerifier,
    });

    // In axios instance that is named "api", there is an interceptor
    // to apply "Authorization" header to all the requests. But in this
    // request, there must be no authorization header, therefore I used
    // the global axios instance to not send authorization header.
    return axios.post(`https://accounts.spotify.com/api/token`, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  });

export default useGetToken;
