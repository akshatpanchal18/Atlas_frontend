import { useEffect, type ReactNode } from "react";
import { useRestoreSessionQuery } from "./store/api/auth-api";
import { useAppDispatch } from "./hooks/redux";
import { setToken, setInitialized, clearAuth } from "./store/reducer/auth";
import { Spinner } from "./components/custom/spinner";

interface AppInitializeProps {
  children: ReactNode;
}

const AppInitialize = ({ children }: AppInitializeProps) => {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isLoading, isUninitialized, isError } = useRestoreSessionQuery();

  useEffect(() => {
    if (isUninitialized || isLoading) return;

    if (isSuccess && data?.accessToken) {
      dispatch(setToken(data.accessToken));
    } else {
      dispatch(clearAuth());
    }

    dispatch(setInitialized(true));
  }, [isSuccess, isLoading, isUninitialized, isError, data, dispatch]);

  if (isLoading || isUninitialized) {
    return <div style={{ padding: 40 }}>Loading...</div>; // plain div, not Spinner, to rule out Spinner bug
  }

  return <>{children}</>;
};
export default AppInitialize;
