import React from "react";
import {cx, cva, VariantProps} from "class-variance-authority";

const styles = cva(
    "w-full text-lg bg-paper-secondary rounded-lg px-6 py-6 outline-none transition-shadow duration-200 focus:shadow-[0_0_0_2px_var(--primary-color),inset_0_0_0_2px_var(--primary-color)] hover:shadow-[0_0_0_1px_var(--primary-color),inset_0_0_0_1px_var(--primary-color)]",
    {
        variants: {
            disabled: {
                true: "opacity-40 cursor-not-allowed",
                false: "",
            },
        },
        defaultVariants: {
            disabled: false,
        },
    },
);

interface InputProps
    extends Omit<React.ComponentProps<"input">, "disabled">,
        VariantProps<typeof styles> {
    label?: string;
    error?: string;
    raw?: boolean;
    suffix?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({label, error, raw, className, suffix, ...props}, ref) => {
        const withLabel = !!label;
        const withError = !!error;

        if (raw) return <RawInput {...props} ref={ref} className={className} />;

        return (
            <div className={cx("flex flex-col text-left space-y-3", className)}>
                {withLabel && (
                    <label className="text-primary text-xl uppercase font-bold">
                        {label}
                    </label>
                )}

                <div className="relative">
                    <RawInput {...props} ref={ref} />

                    <div className="absolute right-5 top-1/2 -translate-y-1/2">
                        {suffix}
                    </div>
                </div>

                {withError && (
                    <span className="text-error font-semibold uppercase text-sm">
                        *{error}
                    </span>
                )}
            </div>
        );
    },
);

type RawInputProps = Omit<React.ComponentProps<"input">, "disabled"> &
    VariantProps<typeof styles>;

const RawInput = React.forwardRef<HTMLInputElement, RawInputProps>(
    ({disabled, ...props}, ref) => (
        <input
            {...props}
            ref={ref}
            disabled={!!disabled}
            className={cx(styles({disabled}))}
        />
    ),
);
