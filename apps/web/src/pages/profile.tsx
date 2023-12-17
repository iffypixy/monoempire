import {useRoute} from "wouter";

import {HomeTemplate} from "@shared/ui";

export const ProfilePage: React.FC = () => {
    const [, params] = useRoute("/@/:username");

    return (
        <HomeTemplate>
            <div>Profile page, {params?.username}</div>
        </HomeTemplate>
    );
};
