import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context";

export default function Default() {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
