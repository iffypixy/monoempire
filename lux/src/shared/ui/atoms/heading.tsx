import {cva, cx} from "class-variance-authority";

const styles = cva("text-paper-contrast", {
    variants: {
        level: {
            1: "text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold",
            2: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold",
            3: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold",
            4: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold",
            5: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold",
            6: "text-base sm:text-lg md:text-xl lg:text-2xl font-semibold",
        },
    },
});

type HProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
>;

export const H1: React.FC<HProps> = (props) => (
    <h1 {...props} className={cx(styles({level: 1}), props.className)}>
        {props.children}
    </h1>
);

export const H2: React.FC<HProps> = (props) => (
    <h1 {...props} className={cx(styles({level: 2}), props.className)}>
        {props.children}
    </h1>
);

export const H3: React.FC<HProps> = (props) => (
    <h1 {...props} className={cx(styles({level: 3}), props.className)}>
        {props.children}
    </h1>
);

export const H4: React.FC<HProps> = (props) => (
    <h1 {...props} className={cx(styles({level: 4}), props.className)}>
        {props.children}
    </h1>
);

export const H5: React.FC<HProps> = (props) => (
    <h1 {...props} className={cx(styles({level: 5}), props.className)}>
        {props.children}
    </h1>
);

export const H6: React.FC<HProps> = (props) => (
    <h6 {...props} className={cx(styles({level: 6}), props.className)}>
        {props.children}
    </h6>
);
