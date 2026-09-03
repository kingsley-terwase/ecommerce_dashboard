import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Route-level guard for anything under DashboardLayout. Runs before any
 * component renders, so an unauthenticated visit to a protected path
 * redirects to /login immediately — no blank layout, no API round trip.
 *
 * This is separate from AxiosInstance's 401 interceptor, which handles the
 * *other* case: a session that was valid but expired mid-use. Both matter.
 */

export default function RequireAuth() {
    // @ts-ignore
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}