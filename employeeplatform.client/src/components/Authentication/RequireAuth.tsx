import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore, State } from '../../store/AuthStore'


type RequireAuthPropTypes = {
    children: ReactNode,
    allowedRoles:string
}
const RequireAuth = (props: RequireAuthPropTypes) => {
    const IsAuthenticated = useAuthStore((state: State) => state.isAuthenticated);
    const Role = useAuthStore((state: State) => state.role);
    const location = useLocation();

    return (IsAuthenticated && Role.includes(props.allowedRoles)) ? props.children : <Navigate to="/" replace state={{ path: location.pathname }} />;
  }

export default RequireAuth