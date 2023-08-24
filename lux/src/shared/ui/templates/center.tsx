import {cx} from "class-variance-authority";

type CenterProps = React.ComponentProps<"div">;

export const Center: React.FC<CenterProps> = (props) => (
    <div
        {...props}
        className={cx(
            "w-full h-full flex justify-center items-center",
            props.className,
        )}
    >
        {props.children}
    </div>
);
