import SuccessPage from "@/feature/auth/components/success-page";
import AuthLayout from "@/feature/auth/layout";
import GetStart from "@/feature/auth/pages/get-start";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoutes from "./protected-routes";
import PublicRoutes from "./public-routes";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <div>Home</div>
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/plan",
        element: <div>Plans</div>,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <PublicRoutes>
        <AuthLayout />
      </PublicRoutes>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="get-start" replace />,
      },
      {
        path: "get-start",
        element: <GetStart />,
      },
      {
        path: "github/success",
        element: <SuccessPage provider="github" />,
      },
      {
        path: "google/success",
        element: <SuccessPage provider="google" />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default appRoutes;
