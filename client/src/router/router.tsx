import { Router } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { ReactElement, Suspense } from "react";
import { routes } from "./routes";
import Auth from "../pages/Auth";
import ErrorPage from "../pages/ErrorPage";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import LoveFinder from "../pages/LoveFinder";

const PrivateRoute = ({ element }: { element: ReactElement }) => {
  const isAuth = sessionStorage.getItem("isLogedIn") === "true";

  // if (!isAuth) return <ErrorPage />;

  return element;
};

export const router = createBrowserRouter([
  {
    path: routes.AUTH,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Auth />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: routes.MAIN,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute element={<Dashboard />} />
      </Suspense>
    ),
  },
  {
    path: routes.USER_PROFILE,
    element: (
      <Suspense>
        <PrivateRoute element={<Profile />} />
      </Suspense>
    ),
  },
  {
    path: routes.FEEDS,
    element: (
      <Suspense>
        <PrivateRoute element={<LoveFinder/>}/>
      </Suspense>
    )
  }
]);
