import {AxiosError} from "axios";

export type SpotifyTokenData = {
  code: string;
  codeVerifier: string
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export type SpotifyApiError = AxiosError<{
  error: string;
  error_description: string;
}>

export type SpotifyUser = {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  type: string;
  uri: string;
  followers: {
    href: null | string;
    total: number;
  };
  country: string;
  product: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  email: string;
};
