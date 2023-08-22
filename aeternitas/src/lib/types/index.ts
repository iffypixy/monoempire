export type Callback = (...args: any[]) => void;

export type Nullish = null | undefined;

export type Nullable<T> = T | null;

export type Maybe<T> = T | Nullish;
