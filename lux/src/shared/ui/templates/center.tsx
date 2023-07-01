type CenterProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export const Center: React.FC<CenterProps> = ({
    children,
    className,
    ...rest
}) => (
    <div
        {...rest}
        className={`${"w-full h-full flex justify-center items-center"} ${className}`}
    >
        {children}
    </div>
);
