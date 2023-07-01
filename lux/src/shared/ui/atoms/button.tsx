import {cva, cx} from "class-variance-authority";

interface CustomButtonProps {
    size?: "small" | "large";
    color?: "primary" | "secondary";
    variant?: "outlined" | "contained";
}

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> &
    CustomButtonProps;

const styles = cva(
    "font-bold uppercase rounded-md cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition duration-300",
    {
        variants: {
            size: {
                small: "2xl:px-4 2xl:py-2 text-sm",
                medium: "2xl:px-8 2xl:py-3 text-base",
                large: "px-4 py-2 text-base sm:px-7 sm:py-3 sm:text-md md:px-10 md:py-4 md:text-xl 2xl:px-12 2xl:py-4 2xl:text-3xl",
            },
            color: {
                primary: "hover:shadow-primary",
                secondary: "hover:shadow-secondary",
            },
            variant: {
                contained: null,
                outlined: "bg-paper-primary",
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
                className: `text-primary border-2 border-primary hover:bg-primary hover:text-primary-contrast`,
            },
            {
                color: "secondary",
                variant: "contained",
                className: `bg-secondary text-secondary-contrast`,
            },
            {
                color: "secondary",
                variant: "outlined",
                className: `text-secondary border-2 border-secondary hover:bg-secondary hover:text-secondary-contrast`,
            },
        ],
        defaultVariants: {
            color: "primary",
            variant: "contained",
            size: "medium",
        },
    },
);

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    size,
    color,
    variant,
    ...props
}) => (
    <button
        {...props}
        className={cx(
            styles({
                size,
                color,
                variant,
            }),
            className,
        )}
    >
        {children}
    </button>
);
