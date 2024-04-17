import {useMutation, useQuery} from "@tanstack/react-query";
import {createQueryKeys} from "@lukemorales/query-key-factory";

import {api} from "@shared/api";
import {
    SignInDto,
    SignUpDto,
    VerifyEmailDto,
    VerifyUsernameDto,
} from "@shared/api/auth/local";
import {OAuth2SignUpDto} from "@shared/api/auth/oauth2";

const keys = {
    local: createQueryKeys("auth/local", {
        signUp: ["sign-up"],
        signIn: ["sign-in"],
        logout: ["logout"],
        getCredentials: ["credentials"],
        verifyUsername: ["verify-username"],
        verifyEmail: ["verify-email"],
    }),
    oauth2: createQueryKeys("auth/oauth2", {
        getInterimCredentials: ["interim-credentials"],
        signUp: ["sign-up"],
    }),
};

export const useSignUp = () => {
    const {mutateAsync, ...mutation} = useMutation({
        mutationKey: keys.local.signUp.queryKey,
        mutationFn: async (req: SignUpDto["req"]) => {
            const res = await api.auth.local.signUp(req);

            return res.data;
        },
    });

    return {signUp: mutateAsync, ...mutation};
};

export const useSignIn = () => {
    const {mutateAsync, ...mutation} = useMutation({
        mutationKey: keys.local.signIn.queryKey,
        mutationFn: async (req: SignInDto["req"]) => {
            const res = await api.auth.local.signIn(req);

            return res.data;
        },
    });

    return {signIn: mutateAsync, ...mutation};
};

export const useLogout = () => {
    const {mutateAsync, ...mutation} = useMutation({
        mutationKey: keys.local.logout.queryKey,
        mutationFn: async () => {
            const res = await api.auth.local.logout();

            return res.data;
        },
    });

    return {logout: mutateAsync, ...mutation};
};

export const useCredentials = () => {
    const {data, ...query} = useQuery({
        queryKey: keys.local.getCredentials.queryKey,
        queryFn: async () => {
            const res = await api.auth.local.getCredentials();

            return res.data;
        },
    });

    return {credentials: data, ...query};
};

export const useVerifyUsername = () => {
    const {mutateAsync, ...mutation} = useMutation({
        mutationKey: keys.local.verifyUsername.queryKey,
        mutationFn: async (req: VerifyUsernameDto["req"]) => {
            const res = await api.auth.local.verifyUsername(req);

            return res.data;
        },
    });

    return {verifyUsername: mutateAsync, ...mutation};
};

export const useVerifyEmail = () => {
    const {mutateAsync, ...mutation} = useMutation({
        mutationKey: keys.local.verifyEmail.queryKey,
        mutationFn: async (req: VerifyEmailDto["req"]) => {
            const res = await api.auth.local.verifyEmail(req);

            return res.data;
        },
    });

    return {verifyEmail: mutateAsync, ...mutation};
};

export const useOAuth2SignUp = () => {
    const {mutateAsync, ...mutation} = useMutation({
        mutationKey: keys.oauth2.signUp.queryKey,
        mutationFn: async (req: OAuth2SignUpDto["req"]) => {
            const res = await api.auth.oauth2.signUp(req);

            return res.data;
        },
    });

    return {signUp: mutateAsync, ...mutation};
};

export const useInterimCredentials = () => {
    const {data, ...query} = useQuery({
        queryKey: keys.oauth2.signUp.queryKey,
        queryFn: async () => {
            const res = await api.auth.oauth2.getInterimCredentials();

            return res.data;
        },
    });

    return {interimCredentials: data, ...query};
};
