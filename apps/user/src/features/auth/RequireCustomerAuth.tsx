import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth.context";

export default function RequireCustomerAuth() {
  const location = useLocation();
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <div className="px-4 py-20 text-center text-sm text-black/45">Loading your account...</div>;
  }

  if (!isAuthenticated) {
    const redirect = `${location.pathname}${location.search}`;
    return <Navigate to={`/sign-in?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  return <Outlet />;
}
