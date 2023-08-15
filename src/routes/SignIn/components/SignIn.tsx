import React, {useCallback, useEffect} from 'react';
import "../styles/_signin.scss";
import generateRandomString from "../../../utils/generateRandomString";
import generateCodeChallenge from "../../../utils/generateCodeChallenge";
import {STORAGE_KEYS} from "../../../config/constants";
import {useAppContext} from "../../../contexts/AppContext";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate])

  const handleSignInClick = useCallback(() => {
    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      const { REACT_APP_SPOTIFY_CLIENT_ID, REACT_APP_SPOTIFY_REDIRECT_URI } = process.env;

      let state = generateRandomString(16);
      let scope = 'user-read-private user-read-email';

      localStorage.setItem(STORAGE_KEYS.CODE_VERIFIER, codeVerifier);

      let args = new URLSearchParams({
        response_type: 'code',
        client_id: REACT_APP_SPOTIFY_CLIENT_ID,
        scope,
        redirect_uri: REACT_APP_SPOTIFY_REDIRECT_URI,
        state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });

      window.location.href = 'https://accounts.spotify.com/authorize?' + args;
    });
  }, []);

  return <div className="sign-in">
    <div className="sign-in__box">
      <h1 className="sign-in__box__title">Connect to Spotify</h1>
      <button className="btn" onClick={handleSignInClick}>Connect</button>
    </div>
  </div>
};

export default SignIn;
