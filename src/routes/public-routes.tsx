import { useAppSelector } from "@/hooks/redux";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRoutesProps {
  children: ReactNode;
}

const PublicRoutes = ({ children }: PublicRoutesProps) => {
  const { token, initialized, isOnboardRequired } = useAppSelector((state) => state.auth);

  if (initialized && token) {
    return <Navigate to={isOnboardRequired ? "/onboard" : "/"} replace />;
  }

  return <>{children}</>;
};

export default PublicRoutes;
