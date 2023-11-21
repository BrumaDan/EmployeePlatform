import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
type RequireAuthPropTypes = {
    children: ReactNode,
    allowedRoles:string
}
const RequireAuth = (props: RequireAuthPropTypes) => {
    const  authed  = true
    const location = useLocation();
    const userRole = 'admin'
  
    return authed === true && props.allowedRoles === userRole ? props.children : <Navigate to="/" replace state={{ path: location.pathname }}/>;
  }

export default RequireAuth