import {useSelector} from "react-redux";
import {Redirect, Route, RouteProps} from "wouter";

import {authModel} from "@features/auth";

type PublicOnlyRouteProps = RouteProps;

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = (props) => {
    const isAuthenticated = useSelector(authModel.selectors.isAuthenticated);

    if (isAuthenticated) return <Redirect to="/" />;

    return <Route {...props} />;
};

type PrivateRouteProps = RouteProps;

export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const isAuthenticated = useSelector(authModel.selectors.isAuthenticated);

    if (isAuthenticated) return <Route {...props} />;

    return <Redirect to="/" />;
};
