import { Navigate } from "react-router-dom";
import { TUser } from "../../Types/TUser";

type TrouteGuardProps = {
    children: React.ReactNode;
    user: TUser
}

const RouteGuard = (props: TrouteGuardProps) => {
    return props.user ? <>{props.children}</> : <Navigate to={"/"} />
}

export default RouteGuard;