import {Center, Fullscreen, H1} from "@shared/ui";
import {useCredentials} from "@shared/queries/auth";

interface CredentialsLoaderProps {
    children: React.ReactNode;
}

export const CredentialsLoader: React.FC<CredentialsLoaderProps> = ({
    children,
}) => {
    const {isLoading} = useCredentials();

    if (isLoading)
        return (
            <Fullscreen>
                <Center>
                    <H1>Loading :)</H1>
                </Center>
            </Fullscreen>
        );

    return <>{children}</>;
};
