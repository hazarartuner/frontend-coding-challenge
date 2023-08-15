import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import { toast } from 'react-toastify';
import {STORAGE_KEYS} from "../../../config/constants";
import useGetToken from "../../../api/hooks/useGetToken";
import Loader from "../../../common/components/Loader";
import {useAppContext} from "../../../contexts/AppContext";
import api from "../../../api";
import {SpotifyUser} from "../../../types";

const Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');
  const code = searchParams.get('code');
  const codeVerifier = localStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);
  const { setUser } = useAppContext();

  const { mutateAsync: getToken } = useGetToken();

  useEffect(() => {
    async function signIn() {
      if (error) {
        toast('Access denied', { type: 'error' })
        navigate('/sign-in');
        return;
      }

      if (!code) {
        toast('There is no "code" parameter!', { type: 'error' })
        return;
      }

      if (!codeVerifier) {
        toast('There is no "codeVerifier"!', { type: 'error' })
        return;
      }

      // Get token data
      const response = await getToken({ code, codeVerifier });

      // store the token data to use it later requests
      localStorage.setItem(STORAGE_KEYS.TOKEN_DATA, JSON.stringify(response.data));

      // get current user
      const me = await api.get<SpotifyUser>(`${process.env.REACT_APP_SPOTIFY_API_BASE_URI}/me`);

      // set current user in AppContext
      setUser(me.data);

      // For better UX, hold the user a bit then redirect
      setTimeout(() => {
        // show success message
        toast('Successfully signed in', { type: 'success' });

        navigate('/');
      }, 1000);
    }

    signIn()
      .catch((error) => {
        // Calculate the error message. It may come from spotify api but
        // also it can be any other type of error
        const { error_description } = error?.response?.data ?? {};
        const description = error_description ? error_description : 'Unexpected error happened';

        // we may send the error to the error service
        console.error(error);

        // show the error message
        toast(description, { type: 'error' });

        // Navigate the user to the sign-in page to let the user try again.
        navigate('/sign-in');
      });
  }, [error, code, codeVerifier, getToken, navigate, setUser]);

  return <Loader />;
};

export default Callback;
