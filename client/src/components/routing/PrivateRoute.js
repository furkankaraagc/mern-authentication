import { Outlet, Navigate } from "react-router-dom";
export const PrivateRoute = () => {
  return localStorage.getItem("authToken") ? (
    <Outlet />
  ) : (
    <Navigate to='/login' />
  );
};
