import {Redirect, Route, RouteProps} from "wouter";

import {useAuthStore} from "@features/auth";

type PublicOnlyRouteProps = RouteProps;

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = (props) => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (isAuthenticated) return <Redirect to="/" />;

    return <Route {...props} />;
};

type PrivateRouteProps = RouteProps;

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (isAuthenticated) return <Route {...props} />;

    return <Redirect to="/" />;
};
