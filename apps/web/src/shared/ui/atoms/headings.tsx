import {VariantProps, cva, cx} from "class-variance-authority";

const styles = cva("text-paper-contrast");

type HProps = VariantProps<typeof styles> & React.ComponentProps<"h1">;

export const H1: React.FC<HProps> = (props) => (
    <h1
        {...props}
        className={cx(
            "text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold",
            styles(),
            props.className,
        )}
    >
        {props.children}
    </h1>
);

export const H2: React.FC<HProps> = (props) => (
    <h2
        {...props}
        className={cx(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold",
            styles(),
            props.className,
        )}
    >
        {props.children}
    </h2>
);

export const H3: React.FC<HProps> = (props) => (
    <h3
        {...props}
        className={cx(
            "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold",
            styles(),
            props.className,
        )}
    >
        {props.children}
    </h3>
);

export const H4: React.FC<HProps> = (props) => (
    <h4
        {...props}
        className={cx(
            "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold",
            styles(),
            props.className,
        )}
    >
        {props.children}
    </h4>
);

export const H5: React.FC<HProps> = (props) => (
    <h5
        {...props}
        className={cx(
            "text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold",
            styles(),
            props.className,
        )}
    >
        {props.children}
    </h5>
);

export const H6: React.FC<HProps> = (props) => (
    <h6
        {...props}
        className={cx(
            "text-base sm:text-lg md:text-xl lg:text-2xl font-semibold",
            styles(),
            props.className,
        )}
    >
        {props.children}
    </h6>
);
