import {Credentials} from "@features/auth";
import {request, Dto} from "@shared/lib/request";

export type SignUpDto = Dto<
    {
        email: string;
        username: string;
        password: string;
    },
    {
        credentials: Credentials;
    }
>;

export const signUp = (req: SignUpDto["req"]) =>
    request<SignUpDto["res"]>({
        url: "/api/local/auth/register",
        method: "POST",
        data: req,
    });

export type SignInDto = Dto<
    {
        emailOrUsername: string;
        password: string;
    },
    {
        credentials: Credentials;
    }
>;

export const signIn = (req: SignInDto["req"]) =>
    request<SignInDto["res"]>({
        url: "/api/local/auth/login",
        method: "POST",
        data: req,
    });

export type GetCredentialsDto = Dto<
    void,
    {
        credentials: Credentials;
    }
>;

export const getCredentials = () =>
    request<GetCredentialsDto["res"]>({
        url: "/api/local/auth/credentials",
        method: "GET",
    });

export type VerifyUsernameDto = Dto<
    {
        username: string;
    },
    {
        ok: boolean;
    }
>;

export type VerifyEmailDto = Dto<
    {
        email: string;
    },
    {
        ok: boolean;
    }
>;

export const verifyUsername = (req: VerifyUsernameDto["req"]) =>
    request<VerifyUsernameDto["res"]>({
        url: "/api/local/auth/verify/username",
        method: "POST",
        data: req,
    });

export const verifyEmail = (req: VerifyEmailDto["req"]) =>
    request<VerifyUsernameDto["res"]>({
        url: "/api/local/auth/verify/email",
        method: "POST",
        data: req,
    });

export const logout = () =>
    request<void>({
        url: "/api/local/auth/logout",
        method: "POST",
    });
