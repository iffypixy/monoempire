import {useAuthStore} from "@features/auth";

import {AuthenticatedHomePage} from "./authenticated";
import {GuestHomePage} from "./guest";

export const HomePage: React.FC = () => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (isAuthenticated) return <AuthenticatedHomePage />;

    return <GuestHomePage />;
};
