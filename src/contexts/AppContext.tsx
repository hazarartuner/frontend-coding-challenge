import { createContext, FC, ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { SpotifyUser } from '../types';
import api from '../api';
import getTokenDataFromStorage from '../utils/getTokenDataFromStorage';

type ContextValue = {
  user?: SpotifyUser;
  setUser(user?: SpotifyUser): void;
  isLoading: boolean;
};

const initialValue = {
  user: undefined,
  isLoading: true,
  setUser() {},
};

const AppContext = createContext<ContextValue>(initialValue);

export const useAppContext = () => useContext(AppContext);

export const AppProvider: FC<{ children: ReactElement }> = (props) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SpotifyUser | undefined>();
  const tokenData = getTokenDataFromStorage();

  useEffect(() => {
    // Do not get /me request if you don't have the "access_token"
    if (!tokenData?.access_token) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    api
      .get<SpotifyUser>(`${process.env.REACT_APP_SPOTIFY_API_BASE_URI}/me`)
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch(() => {
        setUser(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [tokenData?.access_token]);

  const value = useMemo(
    (): ContextValue => ({
      isLoading,
      user,
      setUser,
    }),
    [isLoading, user, setUser],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
