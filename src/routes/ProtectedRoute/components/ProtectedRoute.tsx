import {FC, ReactElement} from "react";
import { Navigate } from 'react-router-dom';
import {useAppContext} from "../../../contexts/AppContext";

const ProtectedRoute: FC<{ children: ReactElement }> = ({ children }) => {
  const { isLoading, user } = useAppContext();

  if (!isLoading && !user) {
    return <Navigate to="/sign-in" />
  }

  return children;
}

export default ProtectedRoute;
