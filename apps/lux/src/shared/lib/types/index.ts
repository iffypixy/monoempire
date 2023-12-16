import {IconType} from "react-icons";

export type Icon = React.FC<React.ComponentProps<"svg">> | IconType;
export type Nullable<T> = T | null;
export type Callback = (...args: any[]) => void;
