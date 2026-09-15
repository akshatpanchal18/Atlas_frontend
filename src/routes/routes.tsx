import GetStart from "@/feature/auth/pages/get-start";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoutes from "./protected-routes";
import PublicRoutes from "./public-routes";

import AuthLayout from "@/feature/auth";

import SuccessPage from "@/feature/auth/components/success-page";
import Subscription from "@/feature/subscription";
import MainLayout from "@/layout/main-layout";
import OtpStep from "@/feature/auth/pages/otp-page";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <div>Home</div>,
      },
      {
        path: "onboard",
        element: <div>ONBOARDING PAGE</div>,
        children: [
          {
            path: "details",
            element: <div>Details</div>,
          },
          {
            path: "plan",
            element: <Subscription />,
          },
        ],
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
        path: "verify",
        element: <OtpStep />,
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
