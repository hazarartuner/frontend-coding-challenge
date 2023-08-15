export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_SPOTIFY_CLIENT_ID: string;
      REACT_APP_SPOTIFY_REDIRECT_URI: string;
      REACT_APP_SPOTIFY_API_BASE_URI: string;
    }
  }
}
