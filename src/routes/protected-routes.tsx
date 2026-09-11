import { useAppSelector } from "@/hooks/redux";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((s) => s.auth.token);
  if (!token) {
    return <Navigate to={"/auth/get-start"} replace />;
  }
  return children;
};

export default ProtectedRoutes;
