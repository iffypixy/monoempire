import {cx} from "class-variance-authority";

const styles = {
    letter: cx(
        "sm:min-w-[0.6rem] text-transparent cursor-pointer",
        "transition-transform duration-300 ease-in-out",
        "bg-clip-text bg-gradient-to-tr from-primary via-accent to-secondary from-0% via-50% to-100% bg-[500%_auto] animate-text-shine",
    ),
    letters: cx(
        "text-9xl md:text-8xl sm:text-7xl uppercase",
        "flex items-center",
    ),
};

interface FancyTextProps extends React.ComponentProps<"div"> {
    children: string;
}

export const FancyText: React.FC<FancyTextProps> = ({
    children,
    className,
    ...props
}) => {
    const letters = children.split("");

    return (
        <div
            {...props}
            className={cx(
                "w-fit cursor-pointer",
                "group transition-transform duration-300 ease-in-out hover:scale-110",
            )}
        >
            <div className={cx(styles.letters, "relative")}>
                {letters.map((letter, i) => (
                    <div
                        key={i}
                        className={cx(
                            styles.letter,
                            "origin-top group-hover:scale-y-0",
                            className,
                        )}
                        style={{transitionDelay: `${i * 35}ms`}}
                    >
                        {letter}
                    </div>
                ))}

                <div className={cx(styles.letters, "absolute bottom-0 left-0")}>
                    {letters.map((letter, i) => (
                        <div
                            key={i}
                            className={cx(
                                styles.letter,
                                "origin-bottom scale-y-0 group-hover:scale-y-100",
                                className,
                            )}
                            style={{
                                transitionDelay: `${i * 35}ms`,
                            }}
                        >
                            {letter}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
