import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {Trans, useTranslation} from "react-i18next";
import {FcGoogle} from "react-icons/fc";
import {BsCheckLg, BsGithub, BsSteam} from "react-icons/bs";
import {BiSolidError} from "react-icons/bi";
import {Link} from "wouter";

import {oauth2} from "@features/auth";
import {
    Button,
    Center,
    FullscreenWithNavbar,
    H1,
    Icons,
    Input,
} from "@shared/ui";
import {authApi} from "@shared/api/auth";
import {regex} from "@shared/lib/regex";
import {debounce, TYPING_DEBOUCE_DELAY} from "@shared/lib/debounce";

interface SignUpForm {
    email: string;
    username: string;
    password: string;
}

export const SignUpPage: React.FC = () => {
    const {t} = useTranslation("signup");

    const [
        verifyEmail,
        {data: emailVerification, isLoading: isEmailVerificationLoading},
    ] = authApi.local.useVerifyEmailMutation();

    const [
        verifyUsername,
        {data: usernameVerification, isLoading: isUsernameVerificationLoading},
    ] = authApi.local.useVerifyUsernameMutation();

    const [signUp, {isLoading: isSignUpLoading}] =
        authApi.local.useSignUpMutation();

    const schema = z.object({
        email: z.string().email(t("error.email.validity")),
        username: z
            .string()
            .min(4, {
                message: t("error.username.min-length"),
            })
            .max(16, {
                message: t("error.username.max-length"),
            })
            .regex(regex.username, {
                message: t("error.username.validity"),
            }),
        password: z
            .string()
            .min(8, {
                message: t("error.password.min-length"),
            })
            .max(50, {
                message: t("error.password.max-length"),
            }),
    });

    const {
        formState: {errors: formErrors, dirtyFields, isValid},
        handleSubmit,
        register,
    } = useForm<SignUpForm>({
        defaultValues: {
            email: "",
            username: "",
            password: "",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const isAvailable = {
        email: emailVerification ? emailVerification.ok : null,
        username: usernameVerification ? usernameVerification.ok : null,
    };

    const icons = {
        loader: <Icons.Loader className="w-6 h-6 text-primary" />,
        error: <BiSolidError className="w-6 h-6 fill-error" />,
        success: <BsCheckLg className="w-6 h-6 fill-primary" />,
    };

    const isFieldValid = {
        email: isAvailable.email && !formErrors.email && dirtyFields.email,
        username:
            isAvailable.username &&
            !formErrors.username &&
            dirtyFields.username,
        password: !formErrors.password && dirtyFields.password,
    };

    const suffix = {
        email: isEmailVerificationLoading
            ? icons.loader
            : isAvailable.email === false
            ? icons.error
            : isFieldValid.email
            ? icons.success
            : null,
        username: isUsernameVerificationLoading
            ? icons.loader
            : isAvailable.username === false
            ? icons.error
            : isFieldValid.username
            ? icons.success
            : null,
        password: isFieldValid.password ? icons.success : null,
    };

    const errors = {
        email:
            isAvailable.email === false
                ? t("error.email.taken")
                : formErrors.email?.message,
        username:
            isAvailable.username === false
                ? t("error.username.taken")
                : formErrors.username?.message,
    };

    const handleFormSubmit = handleSubmit((form) => {
        signUp(form);
    });

    const handleEmailChange = React.useMemo(
        () =>
            debounce((event: React.ChangeEvent<HTMLInputElement>) => {
                verifyEmail({
                    email: event.target.value,
                });
            }, TYPING_DEBOUCE_DELAY),
        [verifyEmail],
    );

    const handleUsernameChange = React.useMemo(
        () =>
            debounce((event: React.ChangeEvent<HTMLInputElement>) => {
                verifyUsername({
                    username: event.target.value,
                });
            }, TYPING_DEBOUCE_DELAY),
        [verifyUsername],
    );

    const isSubmissionDisabled =
        !isValid || !isFieldValid.username || !isFieldValid.email;

    return (
        <FullscreenWithNavbar className="flex">
            <div className="w-1/2 h-full bg-home bg-paper-primary">
                <Center>
                    <H1 className="leading-normal whitespace-pre-line text-[4rem]">
                        <Trans
                            i18nKey="title"
                            ns="signup"
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
                                    suffix={suffix.email}
                                    label={t("field.email")}
                                    error={errors.email}
                                    type="email"
                                    placeholder="example@domain.com"
                                    {...register("email", {
                                        onChange: handleEmailChange,
                                    })}
                                />
                                <Input
                                    suffix={suffix.username}
                                    label={t("field.username")}
                                    error={errors.username}
                                    type="text"
                                    placeholder="cobratate"
                                    {...register("username", {
                                        onChange: handleUsernameChange,
                                    })}
                                />

                                <Input
                                    suffix={suffix.password}
                                    label={t("field.password")}
                                    error={formErrors.password?.message}
                                    type="password"
                                    placeholder="********"
                                    {...register("password")}
                                />
                            </div>

                            <Button
                                className="w-full"
                                color="accent"
                                size="large"
                                variant="contained"
                                loading={isSignUpLoading}
                                disabled={isSubmissionDisabled}
                            >
                                {t("signup")}
                            </Button>
                        </form>

                        <div className="flex flex-col space-y-8 text-center">
                            <div className="flex space-x-6 justify-center">
                                <a href={oauth2.authorization.google}>
                                    <div className="bg-[#EEEEEE] px-8 py-4 cursor-pointer rounded">
                                        <FcGoogle className="w-8 h-8" />
                                    </div>
                                </a>

                                <a href={oauth2.authorization.github}>
                                    <div className="bg-[#101010] px-8 py-4 cursor-pointer rounded">
                                        <BsGithub className="w-8 h-8" />
                                    </div>
                                </a>

                                <a href={oauth2.authorization.steam}>
                                    <div className="bg-[#2B6C9A] px-8 py-4 cursor-pointer rounded">
                                        <BsSteam className="w-8 h-8" />
                                    </div>
                                </a>
                            </div>

                            <span>
                                <Trans
                                    i18nKey="reference.signin"
                                    ns="signup"
                                    components={[
                                        <Link
                                            to="/signin"
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
