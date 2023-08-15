# **FRONTEND CODING CHALLENGE**
Basic Spotify clone challenge. The service will be responsible for API response and loading state handling.

The Authentication flow is made by PKCE Flow because it is the recommended flow for single page apps.

# **Getting Started**
- Clone the base code from GitHub link
- Create a new `.env` file by using the `.env.sample` file. This file contains three environment variables, all of which you need to set properly.

- REACT_APP_SPOTIFY_CLIENT_ID: Obtain this from your developer account

- REACT_APP_SPOTIFY_REDIRECT_URI: This is the URI that you must also configure in your Spotify developer app. This app expects a pathname of `/callback` for the redirect URI. For instance, if your app runs at http://localhost:3000, set the redirect URI to http://localhost:3000/callback both in the .env file and on your app's settings page.

- REACT_APP_SPOTIFY_API_BASE_URI: **You don't need to change it, you can use like inside the .env.sample without changing it. This is the base path for the api calls.**

- You can look at [Spotify API Documentation](https://developer.spotify.com/documentation/)

- You can start the app in development mode by using `yarn start`.

- You can also use the Dockerfile to run the app in a Docker environment.

When you first launch the app, you should see a page with a Connect button. Clicking on this button will take you to a permissions page where you can grant access to the app. After granting access, you will be redirected to the home page to see the app in action.
