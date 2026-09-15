import { useAppSelector } from "@/hooks/redux";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { token, initialized } = useAppSelector((state) => state.auth);

  if (!initialized) {
    return null; // or Spinner
  }

  if (!token) {
    return <Navigate to="/auth/get-start" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
