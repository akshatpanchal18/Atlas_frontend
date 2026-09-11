import { useAppSelector } from "@/hooks/redux";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((s) => s.auth.token);
  if (token) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default PublicRoutes;
