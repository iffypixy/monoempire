import {useSelector} from "react-redux";

import {authModel} from "@features/auth";

import {AuthenticatedHomePage} from "./authenticated";
import {GuestHomePage} from "./guest";

export const HomePage: React.FC = () => {
    const isAuthenticated = useSelector(authModel.selectors.isAuthenticated);

    if (isAuthenticated) return <AuthenticatedHomePage />;

    return <GuestHomePage />;
};
