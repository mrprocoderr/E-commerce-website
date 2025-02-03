import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Log the current pathname and authentication status for debugging
  console.log(location.pathname, isAuthenticated);

  // Handle the root path "/"
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      return <Navigate to="/auth/login" />;
    } else {
      // If authenticated, redirect based on user role
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // Redirect unauthenticated users from protected routes
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Prevent authenticated users from accessing login or register pages
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      // Redirect admin users to the admin dashboard
      return <Navigate to="/admin/dashboard" />;
    } else {
      // Redirect other users to the shop home
      return <Navigate to="/shop/home" />;
    }
  }

  // Restrict access to admin routes for non-admin users
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Restrict access to shop routes for admin users
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Render children if none of the above conditions match
  return <>{children}</>;
}

export default CheckAuth;
