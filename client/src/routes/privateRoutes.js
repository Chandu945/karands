import {Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
    const { auth } = useAuth();

    return (
        auth?.token
            ? <Outlet />
            : <Navigate to="/login"/>
    );
}

export default ProtectedRoutes;