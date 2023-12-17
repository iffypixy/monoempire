import {cx} from "class-variance-authority";

type FullscreenProps = React.ComponentProps<"div">;

export const Fullscreen: React.FC<FullscreenProps> = (props) => (
    <div {...props} className={cx("w-screen h-screen", props.className)}>
        {props.children}
    </div>
);
