import { Navigate, useLocation } from "react-router";

import { useAuth } from "@/context/auth/authContext";
import AuthLoader from "@/components/loaders/AuthLoader";

type Props = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <AuthLoader />;
  }

  if (!user) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
