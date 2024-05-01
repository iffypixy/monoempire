import React from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {Trans, useTranslation} from "react-i18next";

import {regex} from "@shared/lib/regex";
import {Button, Center, Fullscreen, H1, Input, Icons} from "@shared/ui";
import {useDebouncedCallback} from "@shared/lib/debounce";
import {
    useInterimCredentials,
    useOAuth2SignUp,
    useVerifyEmail,
    useVerifyUsername,
} from "@shared/queries/auth";

interface OAuth2SignUpForm {
    email: string;
    username: string;
}

export const OAuth2SignUpPage: React.FC = () => {
    const {t} = useTranslation("signup");

    const {interimCredentials: credentials, isLoading} =
        useInterimCredentials();

    const {signUp, isPending: isSignUpPending} = useOAuth2SignUp();

    const {
        verifyEmail,
        isPending: isVerifyEmailPending,
        data: emailVerification,
    } = useVerifyEmail();

    const {
        verifyUsername,
        isPending: isVerifyUsernamePending,
        data: usernameVerification,
    } = useVerifyUsername();

    const schema = z.object({
        email: z.string().email(t("error.email.validity")),
        username: z
            .string()
            .min(4, {message: t("error.username.min-length")})
            .max(16, {message: t("error.username.max-length")})
            .regex(regex.username, {message: t("error.username.validity")}),
    });

    const {
        formState: {errors: formErrors, isValid, dirtyFields},
        register,
        handleSubmit,
    } = useForm<OAuth2SignUpForm>({
        values: {
            email: credentials?.email || "",
            username: "",
        },
        mode: "onChange",
        resolver: zodResolver(schema),
    });

    const isEmailProvided = !!credentials?.email;

    const isAvailable = {
        email: emailVerification ? emailVerification.ok : null,
        username: usernameVerification ? usernameVerification.ok : null,
    };

    const icons = {
        loader: <Icons.Loader className="w-6 h-6 text-primary" />,
        error: <Icons.Error className="w-6 h-6 fill-error" />,
        success: <Icons.Check className="w-6 h-6 fill-primary" />,
    };

    const isFieldValid = {
        email:
            isEmailProvided ||
            (isAvailable.email && !formErrors.email && dirtyFields.email),
        username:
            isAvailable.username &&
            !formErrors.username &&
            dirtyFields.username,
    };

    const suffix = {
        email: isVerifyEmailPending
            ? icons.loader
            : isAvailable.email === false
            ? icons.error
            : isFieldValid.email
            ? icons.success
            : null,
        username: isVerifyUsernamePending
            ? icons.loader
            : isAvailable.username === false
            ? icons.error
            : isFieldValid.username
            ? icons.success
            : null,
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

    const [handleEmailChange] = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            verifyEmail({
                email: event.target.value,
            });
        },
        300,
    );

    const [handleUsernameChange] = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            verifyUsername({
                username: event.target.value,
            });
        },
        300,
    );

    const isSubmissionDisabled =
        !isValid || !isFieldValid.username || !isFieldValid.email;

    if (isLoading) return null;

    return (
        <Fullscreen>
            <Center>
                <div className="flex flex-col space-y-14">
                    <H1>
                        <Trans
                            i18nKey="oauth2.title"
                            ns="signup"
                            values={{provider: credentials?.provider}}
                            components={[
                                <span className="text-accent underline italic capitalize" />,
                            ]}
                        />
                    </H1>

                    <form
                        onSubmit={handleSubmit((form) => {
                            signUp(form);
                        })}
                        className="flex flex-col space-y-6"
                    >
                        <Input
                            type="email"
                            placeholder="example@domain.com"
                            label={t("field.email")}
                            disabled={isEmailProvided}
                            error={errors.email}
                            suffix={suffix.email}
                            {...register("email", {
                                onChange: handleEmailChange,
                            })}
                        />

                        <Input
                            type="text"
                            placeholder="cobratate"
                            label={t("field.username")}
                            error={errors.username}
                            suffix={suffix.username}
                            {...register("username", {
                                onChange: handleUsernameChange,
                            })}
                        />

                        <Button
                            size="large"
                            loading={isSignUpPending}
                            disabled={isSubmissionDisabled}
                        >
                            {isSignUpPending
                                ? t("oauth2.loading")
                                : t("oauth2.signup")}
                        </Button>
                    </form>
                </div>
            </Center>
        </Fullscreen>
    );
};
