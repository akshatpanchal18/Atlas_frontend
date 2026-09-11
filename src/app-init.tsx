import { useEffect, type ReactNode } from "react";
import { useRestoreSessionQuery } from "./store/api/auth-api";
import { useAppDispatch } from "./hooks/redux";
import { setToken } from "./store/reducer/auth";
import { Spinner } from "./components/custom/spinner";
interface AppInitializeProps {
  children: ReactNode;
}

const AppInitialize = ({ children }: AppInitializeProps) => {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isLoading, isUninitialized } =
    useRestoreSessionQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.data.accessToken));
    }
  }, [isSuccess, data, dispatch]);

  if (isLoading || isUninitialized) {
    return <Spinner size="lg" />;
  }

  return children;
};

export default AppInitialize;
