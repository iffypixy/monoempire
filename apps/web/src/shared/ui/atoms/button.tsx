import {cva, cx, VariantProps} from "class-variance-authority";
import {twMerge} from "tailwind-merge";

import {Icons} from "../icons";

const styles = cva(
    "inline-flex items-center justify-center font-bold uppercase rounded-md cursor-pointer transition duration-300",
    {
        variants: {
            size: {
                small: "2xl:px-4 2xl:py-2 text-sm",
                medium: "2xl:px-8 2xl:py-3 text-base",
                large: cx(
                    "text-4xl md:text-xl sm:text-base",

                    "px-16 py-6 md:px-10",
                ),
            },
            color: {
                primary: "hover:shadow-primary",
                secondary: "hover:shadow-secondary",
                accent: "hover:shadow-accent",
            },
            variant: {
                contained: null,
                outlined: "bg-paper-primary",
            },
            loading: {
                true: "opacity-40 cursor-default",
                false: "",
            },
            disabled: {
                true: "opacity-40 cursor-not-allowed",
                false: "",
            },
        },
        compoundVariants: [
            {
                color: "primary",
                variant: "contained",
                className: `bg-primary text-primary-contrast`,
            },
            {
                color: "primary",
                variant: "outlined",
                className: `text-primary border-4 border-primary hover:bg-primary hover:text-primary-contrast`,
            },
            {
                color: "secondary",
                variant: "contained",
                className: `bg-secondary text-secondary-contrast`,
            },
            {
                color: "secondary",
                variant: "outlined",
                className: `text-secondary border-4 border-secondary hover:bg-secondary hover:text-secondary-contrast`,
            },
            {
                color: "accent",
                variant: "contained",
                className: `bg-accent text-accent-contrast`,
            },
            {
                color: "accent",
                variant: "outlined",
                className: `text-accent border-4 border-accent hover:bg-accent hover:text-accent-contrast`,
            },
            {
                loading: false,
                disabled: false,
                className: "hover:-translate-y-1 hover:shadow-2xl",
            },
        ],
        defaultVariants: {
            color: "primary",
            variant: "contained",
            size: "medium",
            disabled: false,
            loading: false,
        },
    },
);

type ButtonProps = VariantProps<typeof styles> & React.ComponentProps<"button">;

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    size,
    color,
    variant,
    disabled,
    loading,
    ...props
}) => (
    <button
        {...props}
        disabled={disabled || !!loading}
        className={twMerge(
            cx(
                styles({
                    size,
                    color,
                    variant,
                    disabled,
                    loading,
                }),
                className,
            ),
        )}
    >
        {loading && <Icons.Loader className="w-12 h-12 mr-4" />}

        {children}
    </button>
);
