import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user, authLoading } = useAuth();

    // Wait for /me
    if (authLoading) {
        return <div>Loading...</div>;
    }

    // /me finished and user is not authenticated
    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;