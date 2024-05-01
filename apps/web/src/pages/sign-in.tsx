import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {Trans, useTranslation} from "react-i18next";
import {Link} from "wouter";

import {
    Button,
    Center,
    FullscreenWithNavbar,
    H1,
    Input,
    Icons,
} from "@shared/ui";
import {oauth2} from "@features/auth";
import {useSignIn} from "@shared/queries/auth";

interface SignInForm {
    emailOrUsername: string;
    password: string;
}

export const SignInPage: React.FC = () => {
    const {t} = useTranslation("signin");

    const {signIn, isPending: isSignInPending} = useSignIn();

    const schema = z.object({
        emailOrUsername: z.string().min(1, t("error.emailOrUsername.required")),
        password: z.string().min(1, t("error.password.required")),
    });

    const {
        formState: {errors, isValid},
        handleSubmit,
        register,
    } = useForm<SignInForm>({
        defaultValues: {
            emailOrUsername: "",
            password: "",
        },
        resolver: zodResolver(schema),
    });

    const handleFormSubmit = handleSubmit((form) => {
        signIn(form);
    });

    return (
        <FullscreenWithNavbar className="flex">
            <div className="w-1/2 h-full bg-home bg-paper-primary">
                <Center>
                    <H1 className="leading-normal whitespace-pre-line text-[4rem]">
                        <Trans
                            i18nKey="title"
                            ns="signin"
                            components={[
                                <span className="bg-secondary text-secondary-contrast italic px-3 py-1 rounded" />,
                            ]}
                        />
                    </H1>
                </Center>
            </div>

            <div className="w-1/2 h-full bg-paper-primary">
                <Center>
                    <div className="flex flex-col w-2/3 space-y-10">
                        <form
                            onSubmit={handleFormSubmit}
                            className="text-center space-y-12 pb-10 border-b-4 border-b-primary"
                        >
                            <div className="flex flex-col space-y-8">
                                <Input
                                    label={t("field.email-or-username")}
                                    error={errors.emailOrUsername?.message}
                                    type="text"
                                    placeholder="example@domain.com / cobratate"
                                    {...register("emailOrUsername")}
                                />

                                <Input
                                    label={t("field.password")}
                                    type="password"
                                    placeholder="********"
                                    error={errors.password?.message}
                                    {...register("password")}
                                />
                            </div>

                            <Button
                                className="w-full"
                                color="accent"
                                size="large"
                                variant="contained"
                                loading={isSignInPending}
                                disabled={!isValid}
                            >
                                {t("signin")}
                            </Button>
                        </form>

                        <div className="flex flex-col space-y-8 text-center">
                            <div className="flex space-x-6 justify-center">
                                <a href={oauth2.authorization.google}>
                                    <div className="bg-[#EEEEEE] px-8 py-4 cursor-pointer rounded">
                                        <Icons.Social.Google className="w-8 h-8" />
                                    </div>
                                </a>

                                <a href={oauth2.authorization.github}>
                                    <div className="bg-[#101010] px-8 py-4 cursor-pointer rounded">
                                        <Icons.Social.Github className="w-8 h-8 fill-[#FFFFFF]" />
                                    </div>
                                </a>

                                <a href={oauth2.authorization.steam}>
                                    <div className="bg-[#2B6C9A] px-8 py-4 cursor-pointer rounded">
                                        <Icons.Social.Steam className="w-8 h-8 fill-[#FFFFFF]" />
                                    </div>
                                </a>
                            </div>

                            <span>
                                <Trans
                                    i18nKey="reference.signup"
                                    ns="signin"
                                    components={[
                                        <Link
                                            to="/signup"
                                            className="font-semibold text-lg underline text-accent"
                                        />,
                                    ]}
                                />
                            </span>
                        </div>
                    </div>
                </Center>
            </div>
        </FullscreenWithNavbar>
    );
};
