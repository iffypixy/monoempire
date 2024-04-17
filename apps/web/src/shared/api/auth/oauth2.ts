import {Credentials} from "@features/auth";
import {Dto, request} from "@shared/lib/request";

export type OAuth2Provider = "google" | "github" | "steam";

export type GetInterimCredentialsDto = Dto<
    void,
    {
        id: string;
        email?: string;
        provider: OAuth2Provider;
    }
>;

export const getInterimCredentials = () =>
    request<GetInterimCredentialsDto["res"]>({
        url: "/api/auth/oauth2/interim",
        method: "GET",
    });

export type OAuth2SignUpDto = Dto<
    {
        email?: string;
        username: string;
    },
    {
        credentials: Credentials;
    }
>;

export const signUp = (req: OAuth2SignUpDto["req"]) =>
    request<OAuth2SignUpDto["res"]>({
        url: "/api/auth/oauth2/register",
        method: "POST",
        data: req,
    });
