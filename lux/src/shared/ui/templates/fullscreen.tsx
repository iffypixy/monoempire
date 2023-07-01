import {cx} from "class-variance-authority";

type FullscreenProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export const Fullscreen: React.FC<FullscreenProps> = ({
    children,
    className,
    ...rest
}) => (
    <div {...rest} className={cx("w-screen h-screen flex flex-col", className)}>
        {children}
    </div>
);
